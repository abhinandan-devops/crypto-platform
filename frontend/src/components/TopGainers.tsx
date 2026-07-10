import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMarketCoins } from "../services/dashboardService";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import Card from "./Card";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price_change_percentage_24h: number;
};

function TopGainers() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCoins() {
      try {
        const data = await getMarketCoins();

        const gainers = [...data]
          .sort(
            (a, b) =>
              b.price_change_percentage_24h -
              a.price_change_percentage_24h
          )
          .slice(0, 5);

        setCoins(gainers);
      } catch (error) {
        console.error(error);
        setError("Unable to load top gainers.");
      }
    }

    loadCoins();
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
      <Loader />
    </Card>
  );
}

  return (
    <Card>

      <h2 className="text-2xl font-bold mb-6 text-green-400">
        📈 Top Gainers
      </h2>

      <div className="space-y-4">

        {coins.map((coin) => (
          <Link
            key={coin.id}
            to={`/coin/${coin.id}`}
            className="flex items-center justify-between bg-slate-700 rounded-lg p-4 hover:bg-slate-600 transition"
          >
            <div className="flex items-center gap-3">

              <img
                src={coin.image}
                alt={coin.name}
                className="w-10 h-10"
              />

              <div>
                <h3 className="font-semibold">
                  {coin.name}
                </h3>

                <p className="text-slate-400 uppercase">
                  {coin.symbol}
                </p>
              </div>

            </div>

            <span className="text-green-400 font-bold">
              +{coin.price_change_percentage_24h.toFixed(2)}%
            </span>

          </Link>
        ))}

      </div>

    </Card>
  );
}

export default TopGainers;