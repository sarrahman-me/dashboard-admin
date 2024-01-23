"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart(props: {
  title: string;
  labels: any[];
  data: { label: string; data: any[]; color: string }[];
}) {
  // Konfigurasi data dan options untuk Line Chart
  const datasets = props.data.map((dataset) => ({
    label: dataset.label,
    data: dataset.data,
    fill: false,
    borderColor: dataset.color,
    tension: 0.1,
  }));

  const chartData = {
    labels: props.labels,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: props.title,
      },
    },
    scales: {
      x: {
        beginAtZero: true, // Mulai dari 0 pada sumbu x
      },
      y: {
        beginAtZero: true, // Mulai dari 0 pada sumbu y
        grace: "5%", // Menambahkan ruang pada akhir sumbu y
      },
    },
    elements: {
      line: {
        tension: 1, // Menentukan kelembutan garis
      },
    },
  };

  return (
    <div className="w-full h-full border rounded bg-white dark:bg-slate-700">
      <Line options={options} data={chartData} />
    </div>
  );
}
