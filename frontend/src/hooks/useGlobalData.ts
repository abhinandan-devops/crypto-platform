import { useQuery } from "@tanstack/react-query";
import { getGlobalData } from "../services/dashboardService";

type GlobalData = {
  active_cryptocurrencies: number;
  markets: number;

  total_market_cap: {
    usd: number;
  };

  total_volume: {
    usd: number;
  };

  market_cap_percentage: {
    btc: number;
    eth: number;
  };
};

export function useGlobalData() {
  return useQuery<GlobalData>({
    queryKey: ["globalData"],
    queryFn: getGlobalData,
  });
}