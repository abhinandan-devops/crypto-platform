import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { getCoinsByIds } from "../services/coinService";
import CoinTable from "../components/CoinTable";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Card from "../components/Card";

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
  const [error, setError] = useState("");

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
      <h1 className="text-4xl font-bold mb-8">
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

      <h1 className="text-4xl font-bold mb-8">
        ⭐ Watchlist
      </h1>

      {coins.length === 0 ? (
        <Card className="p-8">
  <p className="text-slate-400 text-lg">
    No favorite coins added yet.
  </p>
</Card>
      ) : (
        <CoinTable coins={coins} />
      )}

    </div>
  );
}

export default Watchlist;