import { API_URL } from "@/constant/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";

export default function useSpotlight() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const { data: spotlight, isLoading: spotlightLoading } = useQuery({
    queryKey: ["new-releases", tab],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/top-airing`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      } else {
        return data;
      }
    },
    staleTime: 60 * 600 // 1 hour
  });

  return {
    spotlight,
    spotlightLoading
  };
}
