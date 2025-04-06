import { API_URL } from "@/constant/api";
import { useQuery } from "@tanstack/react-query";

export default function useLatestCompleted() {
  const { data: latestCompleted, isLoading: latestCompletedLoading } = useQuery(
    {
      queryKey: ["latest-completed"],
      queryFn: async () => {
        const response = await fetch(`${API_URL}/latest-completed`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        } else {
          return data;
        }
      }
    }
  );

  return {
    latestCompleted,
    latestCompletedLoading
  };
}
