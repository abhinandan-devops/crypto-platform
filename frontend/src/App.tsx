import { Routes, Route } from "react-router-dom";
import Compare from "./pages/Compare";
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
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </MainLayout>
  );
}

export default App;