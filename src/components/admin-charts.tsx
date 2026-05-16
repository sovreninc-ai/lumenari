"use client";

import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

/**
 * Founder-dashboard charts. All charts render via chart.js + react-chartjs-2.
 *
 * Mobile-friendly: parent containers control height. We disable animation
 * to keep the dashboard snappy on hot reload.
 */

interface LinePoint {
  x: string;
  y: number;
}

interface BarRow {
  label: string;
  value: number;
  sublabel?: string;
}

const ACCENT = "#0f172a";
const ACCENT_FILL = "rgba(15, 23, 42, 0.06)";
const GRID = "rgba(15, 23, 42, 0.06)";
const TICK = "#64748b";

function lineOptions(yLabel?: string): ChartOptions<"line"> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#0f172a",
        bodyColor: "#0f172a",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      x: {
        ticks: { color: TICK, font: { size: 11 }, maxRotation: 0 },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { color: TICK, font: { size: 11 } },
        grid: { color: GRID },
        title: yLabel
          ? { display: true, text: yLabel, color: TICK, font: { size: 11 } }
          : undefined,
      },
    },
  };
}

export function AdminLineChart({
  data,
  yLabel,
}: {
  data: LinePoint[];
  yLabel?: string;
}) {
  const chartData = useMemo<ChartData<"line">>(
    () => ({
      labels: data.map((d) => d.x),
      datasets: [
        {
          data: data.map((d) => d.y),
          borderColor: ACCENT,
          backgroundColor: ACCENT_FILL,
          borderWidth: 2,
          tension: 0.25,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: ACCENT,
        },
      ],
    }),
    [data],
  );

  if (data.length === 0) return <Empty />;
  return (
    <div style={{ position: "relative", height: 220, width: "100%" }}>
      <Line data={chartData} options={lineOptions(yLabel)} />
    </div>
  );
}

export function AdminBarChart({ data }: { data: BarRow[] }) {
  const chartData = useMemo<ChartData<"bar">>(
    () => ({
      labels: data.map((d) => d.label),
      datasets: [
        {
          data: data.map((d) => d.value),
          backgroundColor: ACCENT,
          borderRadius: 6,
          maxBarThickness: 36,
        },
      ],
    }),
    [data],
  );

  const barOpts: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    indexAxis: "y" as const,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#0f172a",
        bodyColor: "#0f172a",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { color: TICK, font: { size: 11 } },
        grid: { color: GRID },
      },
      y: {
        ticks: { color: TICK, font: { size: 11 } },
        grid: { display: false },
      },
    },
  };

  if (data.length === 0) return <Empty />;
  return (
    <div style={{ position: "relative", height: 240, width: "100%" }}>
      <Bar data={chartData} options={barOpts} />
    </div>
  );
}

function Empty() {
  return (
    <div className="h-[180px] flex items-center justify-center text-[var(--muted)] text-sm">
      No data yet.
    </div>
  );
}
