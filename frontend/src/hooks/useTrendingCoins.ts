import { useQuery } from "@tanstack/react-query";
import { getTrendingCoins } from "../services/dashboardService";

type TrendingCoin = {
  item: {
    id: string;
    name: string;
    symbol: string;
    small: string;
    market_cap_rank: number;
    price_btc: number;
  };
};

export function useTrendingCoins() {
  return useQuery<TrendingCoin[]>({
    queryKey: ["trendingCoins"],
    queryFn: getTrendingCoins,
  });
}