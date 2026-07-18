import { useState } from "react";
import { useMarkets } from "../hooks/useMarkets";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function Compare() {
    const [coinOne, setCoinOne] = useState("bitcoin");
  const [coinTwo, setCoinTwo] = useState("ethereum");
  const {
  data: coins = [],
  isLoading,
  error,
} = useMarkets();

  const selectedCoinOne = coins.find(
  (coin) => coin.id === coinOne
);

const selectedCoinTwo = coins.find(
  (coin) => coin.id === coinTwo
);

const higherMarketCapCoin =
  selectedCoinOne && selectedCoinTwo
    ? selectedCoinOne.market_cap >= selectedCoinTwo.market_cap
      ? selectedCoinOne.id
      : selectedCoinTwo.id
    : null;

const higherPriceCoin =
  selectedCoinOne && selectedCoinTwo
    ? selectedCoinOne.current_price >= selectedCoinTwo.current_price
      ? selectedCoinOne.id
      : selectedCoinTwo.id
    : null;

const betterRankCoin =
  selectedCoinOne && selectedCoinTwo
    ? selectedCoinOne.market_cap_rank <= selectedCoinTwo.market_cap_rank
      ? selectedCoinOne.id
      : selectedCoinTwo.id
    : null;

const better24hCoin =
  selectedCoinOne && selectedCoinTwo
    ? selectedCoinOne.price_change_percentage_24h >=
      selectedCoinTwo.price_change_percentage_24h
      ? selectedCoinOne.id
      : selectedCoinTwo.id
    : null;

if (error) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-slate-800 rounded-xl p-6">
        <ErrorMessage message="Unable to load coins for comparison." />
      </div>
    </div>
  );
}

if (isLoading) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-slate-800 rounded-xl p-6">
        <Loader />
      </div>
    </div>
  );
}
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">
          ⚖️ Compare Cryptocurrencies
        </h1>

        <p className="text-slate-400 mt-2">
          Select cryptocurrencies and compare their market data side by side.
        </p>
      </div>

      <div className="bg-slate-800 rounded-xl p-6">
  <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-end">

    <div>
      <label className="block text-slate-400 mb-2">
        First Coin
      </label>

      <select
        value={coinOne}
        onChange={(event) => setCoinOne(event.target.value)}
        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 outline-none focus:border-cyan-500"
      >
        {coins.map((coin) => (
          <option 
              key={coin.id}
    value={coin.id}
    disabled={coin.id === coinTwo}
  >
    {coin.name} ({coin.symbol.toUpperCase()})
          </option>
        ))}
      </select>
    </div>

    <div className="text-2xl font-bold text-cyan-400 text-center">
      VS
    </div>

    <div>
      <label className="block text-slate-400 mb-2">
        Second Coin
      </label>

      <select
        value={coinTwo}
        onChange={(event) => setCoinTwo(event.target.value)}
        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 outline-none focus:border-cyan-500"
      >
        {coins.map((coin) => (
          <option 
                 key={coin.id}
    value={coin.id}
    disabled={coin.id === coinOne}
  >
    {coin.name} ({coin.symbol.toUpperCase()})
          </option>
        ))}
      </select>
    </div>

  </div>

     {selectedCoinOne && selectedCoinTwo && (
  <div className="grid md:grid-cols-2 gap-6 mt-8">

    {/* First Coin */}
    <div className="bg-slate-800 rounded-xl p-6">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={selectedCoinOne.image}
          alt={selectedCoinOne.name}
          className="w-14 h-14"
        />
        

        <div>
          <h2 className="text-2xl font-bold">
            {selectedCoinOne.name}
          </h2>

          <p className="text-slate-400 uppercase">
            {selectedCoinOne.symbol}
          </p>
        </div>
      </div>

      {higherMarketCapCoin === selectedCoinOne.id && (
  <div className="mb-4 inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
    🏆 Higher Market Cap
  </div>
)}

      <div className="space-y-4">
        <p>
          <span className="text-slate-400">Price: </span>
          <span
    className={
      higherPriceCoin === selectedCoinOne.id
        ? "text-green-400 font-semibold"
        : ""
    }
  >
    ${selectedCoinOne.current_price.toLocaleString()}
    {higherPriceCoin === selectedCoinOne.id && " 🏆"}
  </span>
        </p>

        <p>
          <span className="text-slate-400">Market Cap: </span>
          ${selectedCoinOne.market_cap.toLocaleString()}
        </p>
        <p>
  <span className="text-slate-400">
    Market Cap Rank:{" "}
  </span>

  <span
    className={
      betterRankCoin === selectedCoinOne.id
        ? "text-green-400 font-semibold"
        : ""
    }
  >
    #{selectedCoinOne.market_cap_rank}
    {betterRankCoin === selectedCoinOne.id && " 🏆"}
  </span>
</p>

<p>
  <span className="text-slate-400">
    24h Change:{" "}
  </span>

  <span
    className={`font-semibold ${
      selectedCoinOne.price_change_percentage_24h >= 0
        ? "text-green-400"
        : "text-red-400"
    }`}
  >
    {selectedCoinOne.price_change_percentage_24h?.toFixed(2)}%
    {better24hCoin === selectedCoinOne.id && " 🏆"}
  </span>
</p>
      </div>
    </div>

    {/* Second Coin */}
    <div className="bg-slate-800 rounded-xl p-6">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={selectedCoinTwo.image}
          alt={selectedCoinTwo.name}
          className="w-14 h-14"
        />
        

        <div>
          <h2 className="text-2xl font-bold">
            {selectedCoinTwo.name}
          </h2>

          <p className="text-slate-400 uppercase">
            {selectedCoinTwo.symbol}
          </p>
        </div>
      </div>

      {higherMarketCapCoin === selectedCoinTwo.id && (
  <div className="mb-4 inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
    🏆 Higher Market Cap
  </div>
)}

      <div className="space-y-4">
        <p>
          <span className="text-slate-400">Price: </span>
          <span
    className={
      higherPriceCoin === selectedCoinTwo.id
        ? "text-green-400 font-semibold"
        : ""
    }
  >
    ${selectedCoinTwo.current_price.toLocaleString()}
    {higherPriceCoin === selectedCoinTwo.id && " 🏆"}
  </span>
        </p>

        <p>
          <span className="text-slate-400">Market Cap: </span>
          ${selectedCoinTwo.market_cap.toLocaleString()}
        </p>
        <p>
  <span className="text-slate-400">
    Market Cap Rank:{" "}
  </span>

  <span
    className={
      betterRankCoin === selectedCoinTwo.id
        ? "text-green-400 font-semibold"
        : ""
    }
  >
    #{selectedCoinTwo.market_cap_rank}
    {betterRankCoin === selectedCoinTwo.id && " 🏆"}
  </span>
</p>

<p>
  <span className="text-slate-400">
    24h Change:{" "}
  </span>

  <span
    className={`font-semibold ${
      selectedCoinTwo.price_change_percentage_24h >= 0
        ? "text-green-400"
        : "text-red-400"
    }`}
  >
    {selectedCoinTwo.price_change_percentage_24h?.toFixed(2)}%
    {better24hCoin === selectedCoinTwo.id && " 🏆"}
  </span>
</p>
      </div>
    </div>

  </div>
)}
</div>
    </div>
  );
}

export default Compare;