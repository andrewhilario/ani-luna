import { useSession } from "next-auth/react";
import { useToast } from "./use-toast";
import { useQuery } from "@tanstack/react-query";
import { BACKEND_API_URL } from "@/constant/api";

export default function useProfile() {
  const { data: session } = useSession();
  const { toast } = useToast();

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_API_URL}/profile/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
        return response.json();
      }
    }
  });

  return {
    profile,
    profileLoading
  };
}
