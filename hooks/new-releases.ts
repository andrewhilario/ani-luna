import { API_URL } from "@/constant/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";

export default function useNewReleases() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const { data: newReleases, isLoading: newReleasesLoading } = useQuery({
    queryKey: ["recent-added", tab],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/recent-added`);

      const data = await response.json();

      if (!response.ok) {
        console.log("NEW RELEASES ERROR", data);
        throw new Error(data.message);
      } else {
        console.log("NEW RELEASES", data);
        return data;
      }
    },
    staleTime: 60 * 600 // 1 hour
  });

  return {
    newReleases,
    newReleasesLoading
  };
}
