import { Link, NavLink } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function Navbar() {
  const { favorites } = useFavorites();

  return (
    <nav className="bg-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
        <Link
          to="/"
          className="text-2xl font-bold text-cyan-400"
        >
          🚀 Crypto Platform
        </Link>

        <div className="flex gap-8 text-lg">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-cyan-400 font-semibold"
                : "hover:text-cyan-400 transition"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/markets"
            className={({ isActive }) =>
              isActive
                ? "text-cyan-400 font-semibold"
                : "hover:text-cyan-400 transition"
            }
          >
            Markets
          </NavLink>

          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              isActive
                ? "text-cyan-400 font-semibold"
                : "hover:text-cyan-400 transition"
            }
          >
            ⭐ Watchlist ({favorites.length})
          </NavLink>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;