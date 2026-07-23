import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function StatusChart({ data = [] }) {
  const chartData = {
    labels: data.map((item) => item._id),

    datasets: [
      {
        data: data.map((item) => item.value),

        backgroundColor: [
          "#06b6d4",
          "#22c55e",
          "#f59e0b",
          "#ef4444",
          "#6366f1",
          "#8b5cf6",
        ],
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-5">
        Shipment Status
      </h2>

      <Pie data={chartData} />
    </div>
  );
}