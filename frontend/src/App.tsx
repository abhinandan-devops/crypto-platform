import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Markets from "./pages/Markets";
import CoinDetails from "./pages/CoinDetails";
import Watchlist from "./pages/Watchlist";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </MainLayout>
  );
}

export default App;