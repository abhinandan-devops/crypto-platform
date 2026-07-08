import { useEffect, useState } from "react";

import { getMarketData } from "../services/marketService";
import CoinTable from "../components/CoinTable";
import SearchBar from "../components/SearchBar";

function Markets() {
  const [coins, setCoins] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getMarketData();
        setCoins(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadData();
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">
        📊 Crypto Markets
      </h1>

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      <CoinTable coins={filteredCoins} />
    </div>
  );
}

export default Markets;