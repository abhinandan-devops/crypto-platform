import { useState } from "react";
import { useMarkets } from "../hooks/useMarkets";
import CoinTable from "../components/CoinTable";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Card from "../components/Card";

function Markets() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [filterBy, setFilterBy] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10;
  const [currency, setCurrency] = useState("usd");

  const {
  data: coins = [],
  isLoading,
  error,
} = useMarkets(currency);

  const searchTerm = search.trim().toLowerCase();

  const searchedCoins = coins.filter((coin) => {
  const name = coin.name.toLowerCase();
  const symbol = coin.symbol.toLowerCase();

  return (
    name.includes(searchTerm) ||
    symbol.includes(searchTerm)
  );
});

const filteredCoins = searchedCoins.filter((coin) => {
  switch (filterBy) {
    case "price-under-1":
      return coin.current_price < 1;

    case "price-1-100":
      return (
        coin.current_price >= 1 &&
        coin.current_price <= 100
      );

    case "price-above-100":
      return coin.current_price > 100;

    case "market-cap-above-1b":
      return coin.market_cap > 1_000_000_000;

    case "market-cap-above-10b":
      return coin.market_cap > 10_000_000_000;

    default:
      return true;
  }
});



const sortedCoins = [...filteredCoins].sort((a, b) => {
  switch (sortBy) {
    case "name-asc":
      return a.name.localeCompare(b.name);

    case "price-asc":
      return a.current_price - b.current_price;

    case "price-desc":
      return b.current_price - a.current_price;

    case "market-cap-desc":
      return b.market_cap - a.market_cap;

    case "market-cap-asc":
      return a.market_cap - b.market_cap;

    default:
      return 0;
  }
});

 const totalPages = Math.ceil(sortedCoins.length / coinsPerPage);

const startIndex = (currentPage - 1) * coinsPerPage;

const paginatedCoins = sortedCoins.slice(
  startIndex,
  startIndex + coinsPerPage
);

 

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <Card>
          <ErrorMessage message="Unable to load market data." />
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto">
        <Card>
          <Loader />
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">
          📊 Crypto Markets
        </h1>

        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Search and explore cryptocurrency market data.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
  <div className="lg:col-span-6">
    <SearchBar
  value={search}
  onChange={(value) => {
    setSearch(value);
    setCurrentPage(1);
  }}
/>
  </div>
<div className="lg:col-span-2">
  <select
  value={currency}
  onChange={(event) => {
    setCurrency(event.target.value);
    setCurrentPage(1);
  }}
  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 outline-none focus:border-cyan-500"
>
  <option value="usd">USD ($)</option>
  <option value="inr">INR (₹)</option>
  <option value="eur">EUR (€)</option>
</select>
</div>


<div className="lg:col-span-2">
<select
  value={filterBy}
  onChange={(event) => {
  setFilterBy(event.target.value);
  setCurrentPage(1);
}}
  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 outline-none focus:border-cyan-500"
>
  <option value="all">
    All Coins
  </option>

  <option value="price-under-1">
    Price: Under $1
  </option>

  <option value="price-1-100">
    Price: $1 – $100
  </option>

  <option value="price-above-100">
    Price: Above $100
  </option>

  <option value="market-cap-above-1b">
    Market Cap: Above $1B
  </option>

  <option value="market-cap-above-10b">
    Market Cap: Above $10B
  </option>
</select>
</div>

<div className="lg:col-span-2">
  <select
    value={sortBy}
    onChange={(event) => {
  setSortBy(event.target.value);
  setCurrentPage(1);
}}
    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 outline-none focus:border-cyan-500"
  >
    <option value="default">
      Default Sort
    </option>

    <option value="name-asc">
      Name: A → Z
    </option>

    <option value="price-asc">
      Price: Low → High
    </option>

    <option value="price-desc">
      Price: High → Low
    </option>

    <option value="market-cap-desc">
      Market Cap: High → Low
    </option>

    <option value="market-cap-asc">
      Market Cap: Low → High
    </option>
  </select>
  </div>
</div>

    {filteredCoins.length === 0 ? (
  <Card className="text-center">
    <div className="text-5xl mb-4">
      🔍
    </div>

    <h2 className="text-xl sm:text-2xl font-bold">
      No coins found
    </h2>

    <p className="text-slate-400 mt-2 text-sm sm:text-base">
      Try changing your search or filter options.
    </p>
  </Card>
) : (
  <>
    <CoinTable
  coins={paginatedCoins}
  currency={currency}
/>

    <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
  <button
    type="button"
    onClick={() =>
      setCurrentPage((page) => Math.max(page - 1, 1))
    }
    disabled={currentPage === 1}
    className="bg-slate-800 border border-slate-700 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition"
  >
    Previous
  </button>

  <span className="text-slate-300">
    Page {currentPage} of {totalPages}
  </span>

  <div className="flex items-center gap-2">
  <span className="text-slate-400 whitespace-nowrap">
    Go to Page
  </span>

  <select
    value={currentPage}
    onChange={(event) =>
      setCurrentPage(Number(event.target.value))
    }
    className="w-16 bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 text-center text-slate-200 outline-none focus:border-cyan-500"
    aria-label="Go to page"
  >
    {Array.from(
      { length: totalPages },
      (_, index) => index + 1
    ).map((page) => (
      <option key={page} value={page}>
        {page}
      </option>
    ))}
  </select>
</div>

  <button
    type="button"
    onClick={() =>
      setCurrentPage((page) =>
        Math.min(page + 1, totalPages)
      )
    }
    disabled={currentPage === totalPages}
    className="bg-slate-800 border border-slate-700 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition"
  >
    Next
  </button>
</div>
  </>
)}
    </div>
  );
}

export default Markets;