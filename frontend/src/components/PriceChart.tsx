import { useState } from "react";
import { useChartData } from "../hooks/useChartData";

import { Line } from "react-chartjs-2";
import ErrorMessage from "./ErrorMessage";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type Props = {
  coinId: string;
};

type ChartDataType = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
    fill: boolean;
  }[];
};

function PriceChart({ coinId }: Props) {
  const [days, setDays] = useState(7);
  
  const {
  data,
  isLoading,
  error,
} = useChartData(coinId, days);

const prices =
  data?.prices.map(
    (price: [number, number]) => price[1]
  ) ?? [];

const labels =
  data?.prices.map((price: [number, number]) => {
    const date = new Date(price[0]);

    if (days === 1) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return date.toLocaleDateString();
  }) ?? [];

const firstPrice = prices[0] ?? 0;
const lastPrice = prices[prices.length - 1] ?? 0;

const priceChange =
  firstPrice > 0
    ? ((lastPrice - firstPrice) / firstPrice) * 100
    : null;

const priceStats = {
  startPrice: firstPrice,
  endPrice: lastPrice,
  highPrice: prices.length > 0 ? Math.max(...prices) : 0,
  lowPrice: prices.length > 0 ? Math.min(...prices) : 0,
};

const chartData: ChartDataType = {
  labels,
  datasets: [
    {
      label: `${coinId.toUpperCase()} Price`,
      data: prices,
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59,130,246,0.25)",
      tension: 0.4,
      fill: true,
    },
  ],
};

  

  
  
  
  const rangeLabel =
  days === 365 ? "1Y" : `${days}D`;

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
  callbacks: {
    title: (tooltipItems: any[]) => {
      return tooltipItems[0]?.label || "";
    },

    label: (context: any) => {
      const price = context.parsed.y;

      return `Price: $${price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    },
  },
},
    },

    scales: {
      x: {
        ticks: {
          color: "#cbd5e1",
        },
        grid: {
          color: "#334155",
        },
      },

      y: {
        ticks: {
          color: "#cbd5e1",
          callback: (value: any) =>
  `$${Number(value).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })}`,
        },
        grid: {
          color: "#334155",
        },
      },
    },
  };

  

  return (
    <div className="bg-slate-700 rounded-xl p-6">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

        <h2 className="text-2xl font-bold">
          📈 Price Chart
        </h2>

        <div className="flex flex-wrap gap-2">

          {[1, 7, 30, 90, 365].map((value) => (
            <button
              key={value}
              onClick={() => setDays(value)}
              className={`px-3 sm:px-4 py-2 rounded transition text-sm sm:text-base ${
  days === value
    ? "bg-blue-600"
    : "bg-slate-600 hover:bg-slate-500"
}`}
            >
              {value === 365 ? "1Y" : `${value}D`}
            </button>
          ))}

        </div>

      </div>
      {priceChange !== null && (
  <div className="mb-6">
    <p className="text-slate-400 text-sm">
      {rangeLabel} Change
    </p>

    <p
      className={`text-2xl font-bold ${
        priceChange >= 0
          ? "text-green-400"
          : "text-red-400"
      }`}
    >
      {priceChange >= 0 ? "+" : ""}
      {priceChange.toFixed(2)}%
    </p>
  </div>
)}

<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
  <div className="bg-slate-800 rounded-lg p-4">
    <p className="text-slate-400 text-sm">
      Start Price
    </p>

    <p className="font-bold mt-1">
      ${priceStats.startPrice.toLocaleString()}
    </p>
  </div>

  <div className="bg-slate-800 rounded-lg p-4">
    <p className="text-slate-400 text-sm">
      End Price
    </p>

    <p className="font-bold mt-1">
      ${priceStats.endPrice.toLocaleString()}
    </p>
  </div>

  <div className="bg-slate-800 rounded-lg p-4">
    <p className="text-slate-400 text-sm">
      Period High
    </p>

    <p className="font-bold mt-1 text-green-400">
      ${priceStats.highPrice.toLocaleString()}
    </p>
  </div>

  <div className="bg-slate-800 rounded-lg p-4">
    <p className="text-slate-400 text-sm">
      Period Low
    </p>

    <p className="font-bold mt-1 text-red-400">
      ${priceStats.lowPrice.toLocaleString()}
    </p>
  </div>
</div>

     {isLoading ? (
  <div className="h-80 flex items-center justify-center">
    <p className="text-slate-400">
      Loading chart data...
    </p>
  </div>
) : error ? (
  <ErrorMessage message="Unable to load chart data." />
) : (
  <div className="h-[300px] sm:h-[400px]">
  <Line
    data={chartData}
    options={options}
  />
</div>
)}

    </div>
  );
}

export default PriceChart;