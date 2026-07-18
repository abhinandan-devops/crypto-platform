import { useQuery } from "@tanstack/react-query";
import { getChartData } from "../services/chartService";

export function useChartData(
  coinId: string,
  days: number
) {
  return useQuery({
    queryKey: ["coinChart", coinId, days],
    queryFn: () => getChartData(coinId, days),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}