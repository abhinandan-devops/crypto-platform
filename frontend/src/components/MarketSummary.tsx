import { useGlobalData } from "../hooks/useGlobalData";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import Card from "./Card";
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
} from "../utils/formatters";


function MarketSummary() {
  const {
  data,
  isLoading,
  error,
} = useGlobalData();

  
if (error) {
  return (
    <Card>
      <ErrorMessage message="Unable to load market summary." />
    </Card>
    
  );
}
  if (isLoading) {
  return (
    <Card>
      <Card>
  <div className="space-y-4">
    <Loader />
    <p className="text-center text-slate-400">
      Loading global market statistics...
    </p>
  </div>
</Card>
    </Card>
      
    
  );
}

  return (
    <Card>

      <h2 className="text-2xl font-bold mb-6">
        🌍 Global Market
      </h2>

      <div className="space-y-4">

        <div className="bg-slate-700 rounded-xl p-4 hover:bg-slate-600 hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center justify-between">
  <div>
    <p className="text-slate-400">
      Active Coins
    </p>

    <h3 className="text-2xl font-bold">
      {formatNumber(data.active_cryptocurrencies)}
    </h3>
  </div>

  <span className="text-3xl">🪙</span>
</div>
        </div>

        <div className="bg-slate-700 rounded-xl p-4 hover:bg-slate-600 hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center justify-between">
  <div>
    <p className="text-slate-400">
      Exchanges
    </p>

    <h3 className="text-2xl font-bold">
      {formatNumber(data.markets)}
    </h3>
  </div>

  <span className="text-3xl">🏦</span>
</div>
        </div>

        <div className="bg-slate-700 rounded-xl p-4 hover:bg-slate-600 hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center justify-between">
  <div>
    <p className="text-slate-400">
      Total Market Cap
    </p>

    <h3 className="text-xl font-bold">
     {formatCurrency(data.total_market_cap.usd)}
    </h3>
  </div>

  <span className="text-3xl">🌍</span>
</div>
        </div>

        <div className="bg-slate-700 rounded-xl p-4 hover:bg-slate-600 hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center justify-between">
  <div>
    <p className="text-slate-400">
      24H Volume
    </p>

    <h3 className="text-xl font-bold">
      {formatCurrency(data.total_volume.usd)}
    </h3>
  </div>

  <span className="text-3xl">📈</span>
</div>
        </div>

        <div className="bg-slate-700 rounded-xl p-4 hover:bg-slate-600 hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center justify-between">
  <div>
    <p className="text-slate-400">
      BTC Dominance
    </p>

    <h3 className="text-xl font-bold text-yellow-400">
      {formatPercentage(data.market_cap_percentage.btc)}
    </h3>
  </div>

  <span className="text-3xl">₿</span>
</div>
        </div>

      </div>

    </Card>
  );
}

export default MarketSummary;