import TrendingCoins from "../components/TrendingCoins";
import MarketSummary from "../components/MarketSummary";
import TopGainers from "../components/TopGainers";
import TopLosers from "../components/TopLosers";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">

      {/* Dashboard Header */}
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold">
          🚀 Crypto Dashboard
        </h1>

        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Track the latest cryptocurrency trends, prices and market activity.
        </p>
      </div>
      {/* Dashboard Statistics */}



      {/* First Row: Trending Coins + Market Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        <div className="lg:col-span-2">
          <TrendingCoins />
        </div>

        <div>
          <MarketSummary />
        </div>

      </div>

      {/* Second Row: Top Gainers + Top Losers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <TopGainers />

        <TopLosers />

      </div>
      {/* Quick Actions */}

<div className="mt-8">

  <h2 className="text-2xl font-bold mb-4">
    ⚡ Quick Actions
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

    <Link
      to="/markets"
      className="bg-slate-800 hover:bg-slate-700 rounded-xl p-6 transition"
    >
      <h3 className="text-lg font-semibold">
        📈 Markets
      </h3>

      <p className="text-slate-400 mt-2">
        Browse all cryptocurrencies.
      </p>
    </Link>

    <Link
      to="/watchlist"
      className="bg-slate-800 hover:bg-slate-700 rounded-xl p-6 transition"
    >
      <h3 className="text-lg font-semibold">
        ⭐ Watchlist
      </h3>

      <p className="text-slate-400 mt-2">
        View your favorite coins.
      </p>
    </Link>

    <Link
      to="/compare"
      className="bg-slate-800 hover:bg-slate-700 rounded-xl p-6 transition"
    >
      <h3 className="text-lg font-semibold">
        ⚖️ Compare
      </h3>

      <p className="text-slate-400 mt-2">
        Compare two cryptocurrencies.
      </p>
    </Link>

  </div>

</div>

    </div>
  );
}

export default Dashboard;