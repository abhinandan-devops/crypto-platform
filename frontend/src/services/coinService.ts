import axios from "axios";

const API_URL = "https://api.coingecko.com/api/v3";

export async function getCoinDetails(id: string) {
  const response = await axios.get(`${API_URL}/coins/${id}`);

  return response.data;
}