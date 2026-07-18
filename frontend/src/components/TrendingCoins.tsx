
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTrendingCoins } from "../hooks/useTrendingCoins";
import ErrorMessage from "./ErrorMessage";
import SkeletonCard from "./SkeletonCard";
import Card from "./Card";



function TrendingCoins() {
  
 const {
  data,
  isLoading,
  error,
  refetch,
  isFetching,
} = useTrendingCoins();
const coins = data ?? [];

const [lastUpdated, setLastUpdated] = useState("");
useEffect(() => {
  if (data) {
    setLastUpdated(
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
  }
}, [data]);






if (error) {
  return (
    <Card>
      <ErrorMessage message="Unable to load trending coins." />
    </Card>
  );
}
  
  if (isLoading) {
  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">
        🔥 Trending Coins
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <SkeletonCard key={item} />
        ))}
      </div>
    </Card>
  );
}

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
  <h2 className="text-2xl font-bold">
    🔥 Trending Coins
  </h2>

  <div className="text-right">
    <button
      onClick={() => refetch()}
      disabled={isFetching}
      className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-medium transition"
    >
      <>
  {isFetching ? (
    <span className="animate-pulse">
      🔄 Refreshing...
    </span>
  ) : (
    "🔄 Refresh"
  )}
</>
    </button>

    <p className="text-xs text-slate-400 mt-2">
      Updated: {lastUpdated || "--"}
    </p>
  </div>
</div>

      <div className="grid md:grid-cols-2 gap-4">

        {coins.map((coin) => (
          <Link
            key={coin.item.id}
            to={`/coin/${coin.item.id}`}
            className="bg-slate-700 rounded-xl p-4 hover:bg-slate-600 hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-4">

              <img
                src={coin.item.small}
                alt={coin.item.name}
                className="w-14 h-14 rounded-full bg-slate-800 p-1"
              />

              <div className="flex-1">
                <h3 className="text-lg font-bold">
                  {coin.item.name}
                </h3>

                <p className="text-slate-400 uppercase">
                  {coin.item.symbol}
                </p>

                <div className="mt-2 inline-flex items-center bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
  🏆 Rank #{coin.item.market_cap_rank}
</div>
              </div>

            </div>

            <div className="mt-4 pt-4 border-t border-slate-600">
              <div className="flex justify-between items-center">
  <span className="text-slate-400 text-sm">
    BTC Price
  </span>

  <span className="font-bold text-cyan-400">
    {coin.item.price_btc.toFixed(8)} BTC
  </span>
</div>
            </div>

          </Link>
        ))}

        <div className="mt-6 pt-4 border-t border-slate-700 flex justify-end">
  <Link
    to="/markets"
    className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
  >
    View All Markets →
  </Link>
</div>

      </div>
    </Card>
  );
}

export default TrendingCoins;