import { useEffect, useState } from "react";

import { getMarketData } from "../services/marketService";
import CoinTable from "../components/CoinTable";

function Markets() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getMarketData();
      setCoins(data);
    }

    load();
  }, []);

  return (
    <>
      <h1>Crypto Markets</h1>

      <CoinTable coins={coins} />
    </>
  );
}

export default Markets;