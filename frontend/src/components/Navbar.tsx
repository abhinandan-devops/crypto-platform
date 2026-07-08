import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
        <h1 className="text-2xl font-bold text-cyan-400">
          🚀 Crypto Platform
        </h1>

        <div className="flex gap-8 text-lg">
          <Link
            to="/"
            className="hover:text-cyan-400 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/markets"
            className="hover:text-cyan-400 transition"
          >
            Markets
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;