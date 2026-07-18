import { useQuery } from "@tanstack/react-query";
import { getCoinDetails } from "../services/coinService";
import type { CoinDetails } from "../types/coin";

export function useCoinDetails(id: string | undefined) {
  return useQuery<CoinDetails>({
    queryKey: ["coinDetails", id],
    queryFn: () => getCoinDetails(id!),
    enabled: !!id,

    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}