import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AddCar() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const [form, setForm] = useState({
    car_model: "",
    manufacturing_year: "",
    total_mileage: "",
    fuel_type: "",
    service_history: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem("user_id");

      const payload = {
        car_model: form.car_model,
        manufacturing_year: parseInt(form.manufacturing_year),
        total_mileage: parseInt(form.total_mileage),
        fuel_type: parseInt(form.fuel_type),
        service_history: parseInt(form.service_history)
      };

      await api.post(`/cars/?user_id=${userId}`, payload);

      alert("Vehicle added successfully 🚀");
      navigate("/dashboard");

    } catch (err) {
      console.error(err.response?.data);
      alert("Error adding vehicle");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[75vh] px-6">

      <div className="bg-card p-10 rounded-2xl shadow-2xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
          Add New Car
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Car Model */}
          <input
            type="text"
            name="car_model"
            placeholder="Car Model"
            value={form.car_model}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={50}
            className="input-style"
          />

          {/* Manufacturing Year */}
          <input
            type="number"
            name="manufacturing_year"
            placeholder="Manufacturing Year"
            value={form.manufacturing_year}
            onChange={handleChange}
            required
            min="1990"
            max={currentYear}
            className="input-style"
          />

          {/* Total Mileage */}
          <input
            type="number"
            name="total_mileage"
            placeholder="Total Mileage (0 - 300000 km)"
            value={form.total_mileage}
            onChange={handleChange}
            required
            min="0"
            max="300000"
            className="input-style"
          />

          {/* Fuel Type */}
          <select
            name="fuel_type"
            value={form.fuel_type}
            onChange={handleChange}
            required
            className="input-style"
          >
            <option value="">Select Fuel Type</option>
            <option value="0">Petrol</option>
            <option value="1">Diesel</option>
            <option value="2">Electric</option>
          </select>

          {/* Service History */}
          <select
            name="service_history"
            value={form.service_history}
            onChange={handleChange}
            required
            className="input-style"
          >
            <option value="">Select Service History</option>
            <option value="0">Regular</option>
            <option value="1">Occasional</option>
            <option value="2">Poor</option>
          </select>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">

            <button
              type="submit"
              className="glow-btn bg-primary flex-1 py-3 rounded-xl font-semibold"
            >
              Add Vehicle
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="bg-gray-700 hover:bg-gray-600 flex-1 py-3 rounded-xl font-semibold transition"
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}