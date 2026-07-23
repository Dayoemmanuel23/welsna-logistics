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

export default function QuoteChart({ data = [] }) {
  const chartData = {
    labels: data.map((item) => MONTHS[item._id]),

    datasets: [
      {
        label: "Quotes",

        data: data.map((item) => item.total),

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