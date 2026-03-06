import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

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

export default function Analytics() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [chartData, setChartData] = useState(null);
  const [avgScore, setAvgScore] = useState(0);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get(`/analytics/${carId}/last7days`);

        const labels = res.data.map((item) => item.date);
        const values = res.data.map((item) => item.avg_health);

        const average =
          values.reduce((a, b) => a + b, 0) / (values.length || 1);

        setAvgScore(average.toFixed(1));

        setChartData({
          labels,
          datasets: [
            {
              label: "Average Health",
              data: values,
              borderColor: "#22D3EE",
              backgroundColor: "rgba(34,211,238,0.15)",
              tension: 0.4,
              fill: true,
            },
          ],
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchAnalytics();
  }, [carId]);

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-white">
          Vehicle Analytics
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-primary px-6 py-3 rounded-xl hover:bg-blue-600 transition shadow-lg"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-glow transition">
          <h3 className="text-gray-400 text-sm mb-2">
            7-Day Average Health
          </h3>
          <p className="text-3xl font-bold text-success">
            {avgScore}%
          </p>
        </div>

        <div className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-glow transition">
          <h3 className="text-gray-400 text-sm mb-2">
            Monitoring Period
          </h3>
          <p className="text-3xl font-bold text-accent">
            Last 7 Days
          </p>
        </div>

      </div>

      {/* Chart Section */}
      {/* Chart Section */}
<div className="flex justify-center mt-12">
  <div className="bg-card p-8 rounded-2xl shadow-xl w-full max-w-4xl">
    <h2 className="text-xl font-semibold text-white mb-6 text-center">
      Health Trend Overview
    </h2>

    {chartData ? (
      <div className="h-[400px]">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: "#fff"
                }
              }
            },
            scales: {
              x: {
                ticks: { color: "#9CA3AF" },
                grid: { color: "rgba(255,255,255,0.05)" }
              },
              y: {
                ticks: { color: "#9CA3AF" },
                grid: { color: "rgba(255,255,255,0.05)" }
              }
            }
          }}
        />
      </div>
    ) : (
      <p className="text-gray-400 text-center">Loading analytics...</p>
    )}
  </div>
</div>

    </div>
  );
}