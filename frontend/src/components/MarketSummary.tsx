import { useEffect, useState } from "react";
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

function MarketSummary() {
  const [data, setData] = useState<GlobalData | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getGlobalData();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    }

    loadData();
  }, []);

  if (!data) {
    return (
      <div className="bg-slate-800 rounded-xl p-6">
        Loading Market Summary...
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        🌍 Global Market
      </h2>

      <div className="space-y-4">

        <div className="bg-slate-700 rounded-lg p-4">
          <p className="text-slate-400">
            Active Coins
          </p>

          <h3 className="text-2xl font-bold">
            {data.active_cryptocurrencies.toLocaleString()}
          </h3>
        </div>

        <div className="bg-slate-700 rounded-lg p-4">
          <p className="text-slate-400">
            Exchanges
          </p>

          <h3 className="text-2xl font-bold">
            {data.markets.toLocaleString()}
          </h3>
        </div>

        <div className="bg-slate-700 rounded-lg p-4">
          <p className="text-slate-400">
            Total Market Cap
          </p>

          <h3 className="text-xl font-bold">
            $
            {(data.total_market_cap.usd / 1_000_000_000_000).toFixed(2)}
            T
          </h3>
        </div>

        <div className="bg-slate-700 rounded-lg p-4">
          <p className="text-slate-400">
            24H Volume
          </p>

          <h3 className="text-xl font-bold">
            $
            {(data.total_volume.usd / 1_000_000_000).toFixed(2)}
            B
          </h3>
        </div>

        <div className="bg-slate-700 rounded-lg p-4">
          <p className="text-slate-400">
            BTC Dominance
          </p>

          <h3 className="text-xl font-bold text-yellow-400">
            {data.market_cap_percentage.btc.toFixed(2)}%
          </h3>
        </div>

      </div>

    </div>
  );
}

export default MarketSummary;