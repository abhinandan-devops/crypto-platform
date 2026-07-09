import axios from "axios";

const API_URL = "https://api.coingecko.com/api/v3";

export async function getTrendingCoins() {
  const response = await axios.get(
    `${API_URL}/search/trending`
  );

  return response.data.coins;
}

export async function getGlobalData() {
  const response = await axios.get(
    `${API_URL}/global`
  );

  return response.data.data;
}

export async function getMarketCoins() {
  const response = await axios.get(
    `${API_URL}/coins/markets`,
    {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
        sparkline: false,
        price_change_percentage: "24h",
      },
    }
  );

  return response.data;
}