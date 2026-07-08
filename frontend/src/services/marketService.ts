import { fetchCoins } from "./api";

export async function getMarketData() {
  return await fetchCoins();
}