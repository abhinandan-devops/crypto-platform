const BASE_URL = "https://api.coingecko.com/api/v3";

export async function fetchCoins(currency = "usd") {
  const response = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=1`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch market data");
  }

  return response.json();
}