import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCoinDetails } from "../services/coinService";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: {
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
  };
};

function CoinDetails() {
  const { id } = useParams();

  const [coin, setCoin] = useState<Coin | null>(null);

  useEffect(() => {
    async function loadCoin() {
      if (!id) return;

      try {
        const data = await getCoinDetails(id);
        setCoin(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadCoin();
  }, [id]);

  if (!coin) {
    return (
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-slate-800 rounded-xl p-8">
        <div className="flex items-center gap-6">
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

        <div className="grid grid-cols-2 gap-6 mt-10">
          <div className="bg-slate-700 rounded-lg p-5">
            <p className="text-slate-400">Current Price</p>

            <h2 className="text-2xl font-bold mt-2">
              $
              {coin.market_data.current_price.usd.toLocaleString()}
            </h2>
          </div>

          <div className="bg-slate-700 rounded-lg p-5">
            <p className="text-slate-400">Market Cap</p>

            <h2 className="text-2xl font-bold mt-2">
              $
              {coin.market_data.market_cap.usd.toLocaleString()}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoinDetails;