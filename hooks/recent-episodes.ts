import { API_URL } from "@/constant/api";
import { useQuery } from "@tanstack/react-query";

export default function useRecentEpisodes() {
  const { data: recentEpisodes, isLoading: recentEpisodesLoading } = useQuery({
    queryKey: ["recent-added"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/recent-episodes`);

      const data = await response.json();

      if (!response.ok) {
        console.log(" RECENT ADDED ERROR", data);
        throw new Error(data.message);
      } else {
        console.log(" RECENT ADDED ", data);
        return data;
      }
    }
  });

  return {
    recentEpisodes,
    recentEpisodesLoading
  };
}
