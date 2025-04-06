import { API_URL } from "@/constant/api";
import { useQuery } from "@tanstack/react-query";

export default function useNewReleases() {
  const { data: newReleases, isLoading: newReleasesLoading } = useQuery({
    queryKey: ["new-releases"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/new-releases`);

      const data = await response.json();

      if (!response.ok) {
        console.log("NEW RELEASES ERROR", data);
        throw new Error(data.message);
      } else {
        console.log("NEW RELEASES", data);
        return data;
      }
    }
  });

  return {
    newReleases,
    newReleasesLoading
  };
}
