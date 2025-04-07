import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { BookmarkAnime } from "@/types/bookmark-anime";
import { BACKEND_API_URL } from "@/constant/api";
import { useSession } from "next-auth/react";
import { queryClient } from "@/components/tanstack-provider/provider";
import { useState } from "react";

export default function useBookmark(id?: string) {
  const { toast } = useToast();
  const { data: session } = useSession();

  const { mutate: addBookMark } = useMutation({
    mutationKey: ["addBookmark"],
    mutationFn: async (anime_data: BookmarkAnime) => {
      const payload: BookmarkAnime = {
        anime: {
          anime_id: anime_data.anime.anime_id,
          title: anime_data.anime.title,
          description: anime_data.anime.description,
          release_date: anime_data.anime.release_date
        }
      };

      const response = await fetch(`${BACKEND_API_URL}/bookmarks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
        throw new Error(error.message);
      } else {
        const data = await response.json();
        toast({
          title: "Success",
          description: "Anime bookmarked successfully!",
          variant: "default"
        });
        return data;
      }
    },
    // invalidateQueries: ["bookmark-list"]
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["bookmark-list"]
      });

      queryClient.invalidateQueries({
        queryKey: ["bookmark-detail", id] // Invalidate the anime detail query to refresh the data
      });
    }
  });

  const { mutate: deleteBookmark } = useMutation({
    mutationKey: ["deleteBookmark"],
    mutationFn: async (id: string) => {
      const response = await fetch(`${BACKEND_API_URL}/bookmarks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.token}`
        }
      });

      if (!response.ok) {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
        throw new Error(error.message);
      } else {
        toast({
          title: "Success",
          description: "Anime removed from bookmarks!",
          variant: "default"
        });
      }
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["bookmark-list"]
      });
    }
  });

  const { data: bookmarkList, isLoading: isBookmarkLoading } = useQuery({
    queryKey: ["bookmark-list"],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_API_URL}/bookmarks/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.token}`
        }
      });

      if (!response.ok) {
        const error = await response.json();

        throw new Error(error.message);
      } else {
        const data = await response.json();
        return data;
      }
    },
    refetchOnWindowFocus: false,
    enabled: !!session?.token
  });

  const { data: bookmarkDetail, isLoading: bookmarkDetailLoading } = useQuery({
    queryKey: ["bookmark-detail", id],
    queryFn: async () => {
      if (!id) return null; // Prevent fetching if id is not set

      const response = await fetch(
        `${BACKEND_API_URL}/bookmarks/${id}/detail/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.token}`
          }
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      } else {
        const data = await response.json();
        return data;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!session?.token && !!id // Only run this query if the user is authenticated and id is set
  });

  return {
    addBookMark,
    deleteBookmark,
    bookmarkList,
    isBookmarkLoading,
    bookmarkDetail,
    bookmarkDetailLoading
  };
}
