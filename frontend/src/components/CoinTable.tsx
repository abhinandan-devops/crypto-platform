import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import type { Coin } from "../types/coin";

type Props = {
  coins: Coin[];
  currency?: string;
};

 function CoinTable({
  coins,
  currency = "usd",
}: Props) {
  const { favorites, toggleFavorite } = useFavorites();
  const currencySymbols: Record<string, string> = {
  usd: "$",
  inr: "₹",
  eur: "€",
};

const currencySymbol =
  currencySymbols[currency] ?? "$";

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-700">
      <table className="w-full min-w-[750px] bg-slate-800">
        <thead className="bg-slate-700">
          <tr>
            <th className="p-3 sm:p-4 text-left">Fav</th>
            <th className="p-3 sm:p-4 text-left">Coin</th>
            <th className="p-3 sm:p-4 text-left">Symbol</th>
            <th className="p-3 sm:p-4 text-left">Price</th>
            <th className="p-3 sm:p-4 text-left">Market Cap</th>
          </tr>
        </thead>

        <tbody>
          {coins.map((coin) => (
            <tr
              key={coin.id}
              className="border-b border-slate-700 hover:bg-slate-700 transition"
            >
              {/* Favorite */}
              <td className="p-3 sm:p-4">
                <button
                  type="button"
                  onClick={() => toggleFavorite(coin.id)}
                  className="text-2xl hover:scale-110 transition-transform"
                  aria-label={
                    favorites.includes(coin.id)
                      ? `Remove ${coin.name} from favorites`
                      : `Add ${coin.name} to favorites`
                  }
                >
                  {favorites.includes(coin.id) ? "⭐" : "☆"}
                </button>
              </td>

              {/* Coin */}
              <td className="p-3 sm:p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-8 h-8 shrink-0"
                  />

                  <Link
                    to={`/coin/${coin.id}`}
                    className="font-semibold text-cyan-400 hover:text-cyan-300 hover:underline whitespace-nowrap"
                  >
                    {coin.name}
                  </Link>
                </div>
              </td>

              {/* Symbol */}
              <td className="p-3 sm:p-4 uppercase whitespace-nowrap">
                {coin.symbol}
              </td>

              {/* Price */}
              <td className="p-3 sm:p-4 whitespace-nowrap">
                {currencySymbol}
                {coin.current_price.toLocaleString()}
              </td>

              {/* Market Cap */}
              <td className="p-3 sm:p-4 whitespace-nowrap">
                {currencySymbol}
                {coin.market_cap.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CoinTable;