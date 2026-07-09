import axios from "axios";

const API_URL = "https://api.coingecko.com/api/v3";

export async function getChartData(
  id: string,
  days: number
) {
  const response = await axios.get(
    `${API_URL}/coins/${id}/market_chart`,
    {
      params: {
        vs_currency: "usd",
        days,
      },
    }
  );

  return response.data;
}