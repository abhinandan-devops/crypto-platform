import { useParams } from "react-router-dom";
import { useCoinDetails } from "../hooks/useCoinDetails";
import PriceChart from "../components/PriceChart";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function CoinDetails() {
  const { id } = useParams();

  const {
    data: coin,
    isLoading,
    error,
  } = useCoinDetails(id);

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <ErrorMessage message="Unable to load coin details." />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto">
        <Loader />
      </div>
    );
  }

  if (!coin) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-slate-800 rounded-xl p-4 sm:p-6 lg:p-8">

        {/* Coin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
          <img
            src={coin.image.large}
            alt={coin.name}
            className="w-16 h-16 sm:w-20 sm:h-20 shrink-0"
          />

          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold break-words">
              {coin.name} ({coin.symbol.toUpperCase()})
            </h1>

            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              Live data from CoinGecko
            </p>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

          <div className="bg-slate-700 rounded-lg p-4 sm:p-5">
            <p className="text-slate-400">Current Price</p>

            <h2 className="text-xl sm:text-2xl font-bold mt-2 break-words">
              ${coin.market_data.current_price.usd.toLocaleString()}
            </h2>
          </div>

          <div className="bg-slate-700 rounded-lg p-4 sm:p-5">
            <p className="text-slate-400">Market Cap</p>

            <h2 className="text-xl sm:text-2xl font-bold mt-2 break-words">
              ${coin.market_data.market_cap.usd.toLocaleString()}
            </h2>
          </div>

          <div className="bg-slate-700 rounded-lg p-4 sm:p-5">
            <p className="text-slate-400">Rank</p>

            <h2 className="text-xl sm:text-2xl font-bold mt-2">
              #{coin.market_cap_rank}
            </h2>
          </div>

          <div className="bg-slate-700 rounded-lg p-4 sm:p-5">
            <p className="text-slate-400">24H Change</p>

            <h2
              className={`text-xl sm:text-2xl font-bold mt-2 ${
                coin.market_data.price_change_percentage_24h >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {coin.market_data.price_change_percentage_24h.toFixed(2)}%
            </h2>
          </div>

          <div className="bg-slate-700 rounded-lg p-4 sm:p-5">
            <p className="text-slate-400">24H High</p>

            <h2 className="text-xl sm:text-2xl font-bold mt-2 break-words">
              ${coin.market_data.high_24h.usd.toLocaleString()}
            </h2>
          </div>

          <div className="bg-slate-700 rounded-lg p-4 sm:p-5">
            <p className="text-slate-400">24H Low</p>

            <h2 className="text-xl sm:text-2xl font-bold mt-2 break-words">
              ${coin.market_data.low_24h.usd.toLocaleString()}
            </h2>
          </div>

          <div className="bg-slate-700 rounded-lg p-4 sm:p-5">
            <p className="text-slate-400">Circulating Supply</p>

            <h2 className="text-lg sm:text-xl font-bold mt-2 break-words">
              {coin.market_data.circulating_supply.toLocaleString()}
            </h2>
          </div>

          <div className="bg-slate-700 rounded-lg p-4 sm:p-5">
            <p className="text-slate-400">Total Supply</p>

            <h2 className="text-lg sm:text-xl font-bold mt-2 break-words">
              {coin.market_data.total_supply
                ? coin.market_data.total_supply.toLocaleString()
                : "N/A"}
            </h2>
          </div>

        </div>

        {/* Description */}
        <div className="bg-slate-700 rounded-lg p-4 sm:p-6 mt-6 sm:mt-8 overflow-hidden">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            Description
          </h2>

          <div
            className="text-slate-300 leading-7 text-sm sm:text-base break-words"
            dangerouslySetInnerHTML={{
              __html: coin.description.en.slice(0, 1200),
            }}
          />
        </div>

        {/* Official Website */}
        <div className="mt-6 sm:mt-8">
          <a
            href={coin.links.homepage[0]}
            target="_blank"
            rel="noreferrer"
            className="bg-blue-600 hover:bg-blue-700 px-5 sm:px-6 py-3 rounded-lg inline-block text-center w-full sm:w-auto transition"
          >
            Visit Official Website
          </a>
        </div>

        {/* Price Chart */}
        <div className="mt-6 sm:mt-8 min-w-0 overflow-hidden">
          <PriceChart coinId={coin.id} />
        </div>

      </div>
    </div>
  );
}

export default CoinDetails;