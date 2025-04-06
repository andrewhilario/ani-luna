import { API_URL } from "@/constant/api";
import { useQuery } from "@tanstack/react-query";

export default function useAnimeInfo(id: string) {
  const { data: anime, isLoading: animeLoading } = useQuery({
    queryKey: ["anime-info", id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/info?id=${id}`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      } else {
        return data;
      }
    }
  });

  return {
    anime,
    animeLoading
  };
}
