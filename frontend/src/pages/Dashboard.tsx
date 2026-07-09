import TrendingCoins from "../components/TrendingCoins";
import MarketSummary from "../components/MarketSummary";

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">

      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          🚀 Crypto Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Track the latest cryptocurrency trends, prices and market activity.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <TrendingCoins />
        </div>

        <div>
          <MarketSummary />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;