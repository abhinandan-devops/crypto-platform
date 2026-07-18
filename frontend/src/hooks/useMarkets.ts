import { useQuery } from "@tanstack/react-query";
import { getMarketData } from "../services/marketService";
import type { Coin } from "../types/coin";

export function useMarkets(currency = "usd") {
  return useQuery<Coin[]>({
    queryKey: ["markets", currency],
    queryFn: () => getMarketData(currency),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}