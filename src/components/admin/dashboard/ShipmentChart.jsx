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

const MONTHS = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function ShipmentChart({ data = [] }) {
  const chartData = {
    labels: data.map((item) => MONTHS[item._id]),

    datasets: [
      {
        label: "Shipments",
        data: data.map((item) => item.total),

        borderColor: "#0891b2",

        backgroundColor: "rgba(8,145,178,.2)",

        fill: true,

        tension: 0.4,
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