import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function QuoteChart({ data }) {
  const chartData = {
    labels: data.map((item) => item.month),

    datasets: [
      {
        label: "Quotes",

        data: data.map((item) => item.count),

        backgroundColor: "#f97316",
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-5">
        Monthly Quotes
      </h2>

      <Bar data={chartData} />
    </div>
  );
}