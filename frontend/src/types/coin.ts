export type Coin = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  image: string;
  market_cap_rank: number;
price_change_percentage_24h: number;
};

export type CoinDetails = {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;

  image: {
    large: string;
  };

  links: {
    homepage: string[];
  };

  description: {
    en: string;
  };

  market_data: {
    current_price: {
      usd: number;
    };

    market_cap: {
      usd: number;
    };

    high_24h: {
      usd: number;
    };

    low_24h: {
      usd: number;
    };

    price_change_percentage_24h: number;
    

    circulating_supply: number;

    total_supply: number | null;
  };
};