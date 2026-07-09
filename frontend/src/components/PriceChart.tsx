import { useEffect, useState } from "react";
import { getChartData } from "../services/chartService";

import { Line } from "react-chartjs-2";

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

  const [chartData, setChartData] =
    useState<ChartDataType | null>(null);

  useEffect(() => {
    async function loadChart() {
      try {
        const data = await getChartData(coinId, days);

        const labels = data.prices.map((price: [number, number]) =>
          new Date(price[0]).toLocaleDateString()
        );

        const prices = data.prices.map(
          (price: [number, number]) => price[1]
        );

        setChartData({
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
        });
      } catch (error) {
        console.error(error);
      }
    }

    loadChart();
  }, [coinId, days]);

  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: (context: any) =>
            "$" + context.parsed.y.toLocaleString(),
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
            "$" + Number(value).toLocaleString(),
        },
        grid: {
          color: "#334155",
        },
      },
    },
  };

  if (!chartData) {
    return (
      <div className="bg-slate-700 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          📈 Price Chart
        </h2>

        <p className="text-slate-400">
          Loading chart...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-700 rounded-xl p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          📈 Price Chart
        </h2>

        <div className="flex gap-2">

          {[7, 30, 90, 365].map((value) => (
            <button
              key={value}
              onClick={() => setDays(value)}
              className={`px-4 py-2 rounded transition ${
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

      <Line
        data={chartData}
        options={options}
      />

    </div>
  );
}

export default PriceChart;