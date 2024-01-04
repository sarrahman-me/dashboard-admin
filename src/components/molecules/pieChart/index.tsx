"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart(props: {
  title: string;
  labels: any[];
  data: any;
}) {
  const { title, labels, data } = props;

  const optionsData = {
    title,
    labels: labels,
    datasets: [
      {
        label: "views",
        data: data,
        backgroundColor: [
          "#20B2AA",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#8A2BE2",
          "#7FFFD4",
          "#FFD700",
          "#FFA07A",
          "#FF6384",
        ],
        hoverBackgroundColor: [
          "#20B2AA",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#8A2BE2",
          "#7FFFD4",
          "#FFD700",
          "#FFA07A",
          "#FF6384",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-full border rounded bg-white dark:bg-slate-700">
      <Pie data={optionsData} />
    </div>
  );
}
