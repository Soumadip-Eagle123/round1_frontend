import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Dashboard() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }

    const fetchCars = async () => {
      try {
        const res = await api.get(`/cars?user_id=${userId}`);
        setCars(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCars();
  }, [userId, navigate]);
  const handleDelete = async (carId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this car?");
  if (!confirmDelete) return;

  try {
    await api.delete(`/cars/${carId}`);

    // Remove deleted car from state instantly (no refresh needed)
    setCars((prev) => prev.filter((car) => car.id !== carId));

  } catch (err) {
    console.log(err);
    alert("Error deleting car");
  }
};
  return (
    <div className="max-w-6xl mx-auto px-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-4xl font-bold text-primary">
          Your Cars
        </h2>

        <button
          onClick={() => navigate("/add-car")}
          className="glow-btn bg-primary px-6 py-3 rounded-xl shadow-lg"
        >
          Add Car
        </button>
      </div>

      {/* Empty State */}
      {cars.length === 0 && (
        <div className="text-center mt-20">
          <p className="text-gray-400 text-lg">
            No cars added yet.
          </p>
        </div>
      )}

      {/* Car Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-card p-8 rounded-2xl card-hover shadow-lg transition-all"
          >
            <h3 className="text-2xl font-semibold mb-3 text-white">
              {car.car_model}
            </h3>

            <p className="text-gray-400 mb-6">
              Year: {car.manufacturing_year}
            </p>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => navigate(`/simulation/${car.id}`)}
                className="glow-btn bg-primary px-5 py-2 rounded-lg"
              >
                Monitor
              </button>

              <button
                onClick={() => navigate(`/analytics/${car.id}`)}
                className="glow-btn bg-accent px-5 py-2 rounded-lg"
              >
                Analytics
              </button>
              <button
  onClick={() => handleDelete(car.id)}
  className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg transition"
>
  Delete
</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}