import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTrendingCoins } from "../services/dashboardService";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import SkeletonCard from "./SkeletonCard";
import Card from "./Card";

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

function TrendingCoins() {
  const [coins, setCoins] = useState<TrendingCoin[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTrending() {
      try {
        const data = await getTrendingCoins();
        setCoins(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load trending coins.");
      }
    }

    loadTrending();
  }, []);
if (error) {
  return (
    <Card>
      <ErrorMessage message={error} />
    </Card>
  );
}
  
  if (coins.length === 0) {
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
      <h2 className="text-2xl font-bold mb-6">
        🔥 Trending Coins
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {coins.map((coin) => (
          <Link
            key={coin.item.id}
            to={`/coin/${coin.item.id}`}
            className="bg-slate-700 rounded-lg p-4 hover:bg-slate-600 transition"
          >
            <div className="flex items-center gap-4">

              <img
                src={coin.item.small}
                alt={coin.item.name}
                className="w-12 h-12"
              />

              <div className="flex-1">
                <h3 className="text-lg font-bold">
                  {coin.item.name}
                </h3>

                <p className="text-slate-400 uppercase">
                  {coin.item.symbol}
                </p>

                <p className="text-sm text-yellow-400 mt-1">
                  Rank #{coin.item.market_cap_rank}
                </p>
              </div>

            </div>

            <div className="mt-4 pt-4 border-t border-slate-600">
              <p className="text-slate-400 text-sm">
                Price (BTC)
              </p>

              <p className="font-semibold">
                {coin.item.price_btc.toFixed(8)} BTC
              </p>
            </div>

          </Link>
        ))}

      </div>
    </Card>
  );
}

export default TrendingCoins;