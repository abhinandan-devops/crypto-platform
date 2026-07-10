import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCoinDetails } from "../services/coinService";
import PriceChart from "../components/PriceChart";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import type { CoinDetails } from "../types/coin";



function CoinDetails() {
  const { id } = useParams();

  const [coin, setCoin] = useState<CoinDetails | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCoin() {
      if (!id) return;

      try {
        const data = await getCoinDetails(id);
        setCoin(data);
      } catch (error) {
  console.error(error);
  setError("Unable to load coin details.");
}
    }

    loadCoin();
  }, [id]);

 if (error) {
  return (
    <div className="max-w-6xl mx-auto">
      <ErrorMessage message={error} />
    </div>
  );
}

if (!coin) {
  return (
    <div className="max-w-5xl mx-auto">
      <Loader />
    </div>
  );
}
  return (
    <div className="max-w-6xl mx-auto">

      <div className="bg-slate-800 rounded-xl p-8">

        <div className="flex items-center gap-6 mb-10">
          <img
            src={coin.image.large}
            alt={coin.name}
            className="w-20 h-20"
          />

          <div>
            <h1 className="text-4xl font-bold">
              {coin.name} ({coin.symbol.toUpperCase()})
            </h1>

            <p className="text-slate-400 mt-2">
              Live data from CoinGecko
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-slate-700 rounded-lg p-5">
            <p className="text-slate-400">Current Price</p>

            <h2 className="text-2xl font-bold mt-2">
              ${coin.market_data.current_price.usd.toLocaleString()}
            </h2>
          </div>

          <div className="bg-slate-700 rounded-lg p-5">
            <p className="text-slate-400">Market Cap</p>

            <h2 className="text-2xl font-bold mt-2">
              ${coin.market_data.market_cap.usd.toLocaleString()}
            </h2>
          </div>

          <div className="bg-slate-700 rounded-lg p-5">
            <p className="text-slate-400">Rank</p>

            <h2 className="text-2xl font-bold mt-2">
              #{coin.market_cap_rank}
            </h2>
          </div>

          <div className="bg-slate-700 rounded-lg p-5">
            <p className="text-slate-400">24H Change</p>

            <h2
              className={`text-2xl font-bold mt-2 ${
                coin.market_data.price_change_percentage_24h >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {coin.market_data.price_change_percentage_24h.toFixed(2)}%
            </h2>
          </div>

          <div className="bg-slate-700 rounded-lg p-5">
            <p className="text-slate-400">24H High</p>

            <h2 className="text-2xl font-bold mt-2">
              ${coin.market_data.high_24h.usd.toLocaleString()}
            </h2>
          </div>

          <div className="bg-slate-700 rounded-lg p-5">
            <p className="text-slate-400">24H Low</p>

            <h2 className="text-2xl font-bold mt-2">
              ${coin.market_data.low_24h.usd.toLocaleString()}
            </h2>
          </div>

          <div className="bg-slate-700 rounded-lg p-5">
            <p className="text-slate-400">Circulating Supply</p>

            <h2 className="text-xl font-bold mt-2">
              {coin.market_data.circulating_supply.toLocaleString()}
            </h2>
          </div>

          <div className="bg-slate-700 rounded-lg p-5">
            <p className="text-slate-400">Total Supply</p>

            <h2 className="text-xl font-bold mt-2">
              {coin.market_data.total_supply
                ? coin.market_data.total_supply.toLocaleString()
                : "N/A"}
            </h2>
          </div>

        </div>

        <div className="bg-slate-700 rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Description
          </h2>

          <div
            className="text-slate-300 leading-7"
            dangerouslySetInnerHTML={{
              __html: coin.description.en.slice(0, 1200),
            }}
          />
        </div>

        <div className="mt-8">
          <a
            href={coin.links.homepage[0]}
            target="_blank"
            rel="noreferrer"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg inline-block"
          >
            Visit Official Website
          </a>
        </div>
        <div className="mt-8">
         <PriceChart coinId={coin.id} />
        </div>

      </div>

    </div>
  );
}

export default CoinDetails;
