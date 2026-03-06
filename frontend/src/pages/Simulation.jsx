import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

export default function Simulation() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runML = async () => {
      try {
        const res = await api.post(`/simulation/${carId}`);
        setResult(res.data);
      } catch (err) {
        alert("Error running ML analysis");
      } finally {
        setLoading(false);
      }
    };

    runML();
  }, [carId]);

  if (loading) {
    return (
      <div className="text-center text-gray-400 text-lg">
        Running ML analysis...
      </div>
    );
  }

  if (!result) return null;

  const riskColor =
    result.risk_level === "Healthy"
      ? "text-green-400"
      : result.risk_level === "Warning"
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="max-w-3xl mx-auto">

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-primary mb-8 text-center"
      >
        Vehicle Health Analysis
      </motion.h2>

      {/* Health Score Card */}
      <motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  className="bg-card p-8 rounded-2xl mb-8 text-center shadow-lg"
>
  <p className="text-gray-400 mb-2">Health Score</p>

  <div className="relative w-full bg-gray-700 rounded-full h-4 mb-6">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${result.health_score}%` }}
      transition={{ duration: 1 }}
      className={`h-4 rounded-full ${
        result.health_score >= 70
          ? "bg-green-500"
          : result.health_score >= 40
          ? "bg-yellow-500"
          : "bg-red-500"
      }`}
    />
  </div>

  <p className="text-5xl font-bold text-primary">
    {result.health_score}
  </p>

  <p
    className={`mt-4 text-xl font-semibold ${
      result.risk_level === "Healthy"
        ? "text-green-400"
        : result.risk_level === "Warning"
        ? "text-yellow-400"
        : "text-red-400"
    }`}
  >
    {result.risk_level}
  </p>

  {result.anomaly_detected && (
    <p className="text-red-500 mt-3">
      ⚠ Anomaly Detected
    </p>
  )}

  <button
    onClick={() => window.location.reload()}
    className="glow-btn bg-accent mt-6 px-6 py-2 rounded-lg"
  >
    Re-run Analysis
  </button>
</motion.div>

      {/* Top Issues */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-card p-6 rounded-xl mb-6"
      >
        <h3 className="text-lg font-semibold mb-4">
          Top Issues
        </h3>

        <ul className="list-disc pl-5 space-y-2">
          {result.top_issues.map((issue, i) => (
            <li key={i} className="text-gray-300">
              {issue}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-card p-6 rounded-xl mb-6"
      >
        <h3 className="text-lg font-semibold mb-4">
          Recommendations
        </h3>

        <ul className="list-disc pl-5 space-y-2">
          {result.recommendations.map((rec, i) => (
            <li key={i} className="text-gray-300">
              {rec}
            </li>
          ))}
        </ul>
      </motion.div>

      <div className="text-center">
        <button
          onClick={() => navigate("/dashboard")}
          className="glow-btn bg-primary px-6 py-2 rounded-lg"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}