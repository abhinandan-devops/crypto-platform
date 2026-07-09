import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  image: string;
};

type Props = {
  coins: Coin[];
};

function CoinTable({ coins }: Props) {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700">
      <table className="w-full bg-slate-800 rounded-xl overflow-hidden">
        <thead className="bg-slate-700">
          <tr>
            <th className="p-4 text-left">Fav</th>
            <th className="p-4 text-left">Coin</th>
            <th className="p-4 text-left">Symbol</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Market Cap</th>
          </tr>
        </thead>

        <tbody>
          {coins.map((coin) => (
            <tr
              key={coin.id}
              className="border-b border-slate-700 hover:bg-slate-700 transition"
            >
              <td className="p-4">
                <button
                  onClick={() => toggleFavorite(coin.id)}
                  className="text-2xl"
                >
                  {favorites.includes(coin.id) ? "⭐" : "☆"}
                </button>
              </td>

              <td className="p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-8 h-8"
                  />

                  <Link
                    to={`/coin/${coin.id}`}
                    className="font-semibold text-cyan-400 hover:text-cyan-300 hover:underline"
                  >
                    {coin.name}
                  </Link>
                </div>
              </td>

              <td className="p-4 uppercase">
                {coin.symbol}
              </td>

              <td className="p-4">
                ${coin.current_price.toLocaleString()}
              </td>

              <td className="p-4">
                ${coin.market_cap.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CoinTable;