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