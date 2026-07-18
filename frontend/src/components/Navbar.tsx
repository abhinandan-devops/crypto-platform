import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-cyan-400 font-semibold"
      : "text-slate-200 hover:text-cyan-400 transition";

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-5">
          <Link
            to="/"
            onClick={closeMenu}
            className="text-xl sm:text-2xl font-bold text-cyan-400"
          >
            🚀 Crypto Platform
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-lg">
            <NavLink to="/" className={navLinkClass}>
              Dashboard
            </NavLink>

            <NavLink to="/markets" className={navLinkClass}>
              Markets
            </NavLink>

            <NavLink 
                 to="/compare"
                  className={navLinkClass}>
                ⚖️ Compare
              </NavLink>

            <NavLink to="/watchlist" className={navLinkClass}>
              ⭐ Watchlist
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            className="md:hidden text-2xl text-slate-200 hover:text-cyan-400 transition"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-5">
            <div className="flex flex-col gap-4 border-t border-slate-700 pt-5">
              <NavLink
                to="/"
                onClick={closeMenu}
                className={navLinkClass}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/markets"
                onClick={closeMenu}
                className={navLinkClass}
              >
                Markets
              </NavLink>

              
              <NavLink
                  to="/compare"
                  onClick={closeMenu}
                  className={navLinkClass}>
                   ⚖️ Compare
                </NavLink>

              <NavLink
                to="/watchlist"
                onClick={closeMenu}
                className={navLinkClass}
              >
                ⭐ Watchlist
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;