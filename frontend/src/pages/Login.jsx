import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", { email, password });
      localStorage.setItem("user_id", res.data.user_id);
      navigate("/dashboard");
    } catch (err) {
  if (err.response?.status === 401) {
    alert("Invalid credentials");
  } else if (err.response?.status === 422) {
    alert("Please enter a valid email address");
  } else {
    alert("Something went wrong");
  }
}
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg">
      <div className="bg-card p-10 rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-primary text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            className="bg-surface p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="bg-surface p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="bg-primary py-3 rounded-lg hover:bg-blue-600 transition">
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-accent hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}