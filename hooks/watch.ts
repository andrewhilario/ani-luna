import { API_URL } from "@/constant/api";
import { useQuery } from "@tanstack/react-query";

export default function useAnimeWatchInfo(id: string) {
  const { data: watchAnime, isLoading: watchAnimeLoading } = useQuery({
    queryKey: ["watch", id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/servers/${id}`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      } else {
        return data;
      }
    }
  });

  return {
    watchAnime,
    watchAnimeLoading
  };
}
