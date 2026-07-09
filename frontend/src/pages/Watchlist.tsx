import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { getCoinsByIds } from "../services/coinService";
import CoinTable from "../components/CoinTable";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  image: string;
};

function Watchlist() {
  const { favorites } = useFavorites();

  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      try {
        if (favorites.length === 0) {
          setCoins([]);
          return;
        }

        const data = await getCoinsByIds(favorites);
        setCoins(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, [favorites]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          ⭐ Watchlist
        </h1>

        <p className="text-slate-400">
          Loading favorite coins...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold mb-8">
        ⭐ Watchlist
      </h1>

      {coins.length === 0 ? (
        <div className="bg-slate-800 rounded-xl p-8">
          <p className="text-slate-400 text-lg">
            No favorite coins added yet.
          </p>
        </div>
      ) : (
        <CoinTable coins={coins} />
      )}

    </div>
  );
}

export default Watchlist;