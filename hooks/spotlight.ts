import { API_URL } from "@/constant/api";
import { useQuery } from "@tanstack/react-query";

export default function useSpotlight() {
  const { data: spotlight, isLoading: spotlightLoading } = useQuery({
    queryKey: ["new-releases"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/spotlight`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      } else {
        return data;
      }
    }
  });

  return {
    spotlight,
    spotlightLoading
  };
}
