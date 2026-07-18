import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { getCoinsByIds } from "../services/coinService";
import CoinTable from "../components/CoinTable";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Card from "../components/Card";
import type { Coin } from "../types/coin";

function Watchlist() {
  const { favorites } = useFavorites();

  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFavorites() {
      setLoading(true);
      setError("");

      try {
        if (favorites.length === 0) {
          setCoins([]);
          return;
        }

        const data = await getCoinsByIds(favorites);
        setCoins(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load favorite coins.");
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, [favorites]);

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <Card>
          <ErrorMessage message={error} />
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
          ⭐ Watchlist
        </h1>

        <Card>
          <Loader />
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">

      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">
          ⭐ Watchlist
        </h1>

        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Track your favorite cryptocurrencies in one place.
        </p>
      </div>

      {/* Empty State */}
      {coins.length === 0 ? (
  <Card className="p-6 sm:p-10">
    <div className="text-center">
      <div className="text-5xl mb-4">
        ⭐
      </div>

      <h2 className="text-xl sm:text-2xl font-bold">
        Your watchlist is empty
      </h2>

      <p className="text-slate-400 mt-2 text-sm sm:text-base">
        Add your favorite cryptocurrencies from the Markets page.
      </p>
    </div>
  </Card>
) : (
  <CoinTable coins={coins} />
)}

    </div>
  );
}

export default Watchlist;