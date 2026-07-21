import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function ShipmentChart({ data }) {
  const chartData = {
    labels: data.map((item) => item.month),

    datasets: [
      {
        label: "Shipments",

        data: data.map((item) => item.count),

        borderColor: "#0891b2",

        backgroundColor: "rgba(8,145,178,.2)",

        tension: 0.4,

        fill: true,
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-5">
        Monthly Shipments
      </h2>

      <Line data={chartData} />
    </div>
  );
}