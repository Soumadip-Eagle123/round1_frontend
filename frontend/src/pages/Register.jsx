import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/register", { name, email, password });
      navigate("/");
    } catch {
      if (err.response?.status === 400) {
    alert("Email already exists");
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
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            className="bg-surface p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/" className="text-accent hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}