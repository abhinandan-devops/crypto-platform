import { fetchCoins } from "./api";

export async function getMarketData(currency = "usd") {
  return await fetchCoins(currency);
}