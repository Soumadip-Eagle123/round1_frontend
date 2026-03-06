import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddCar from "./pages/AddCar";
import Simulation from "./pages/Simulation";
import Analytics from "./pages/Analytics";
import Layout from "./components/Layout";
function App() {
  return (
    <BrowserRouter>
<Routes>
  {/* Public Routes */}
  <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* Protected Layout Wrapper */}
  <Route element={<Layout />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/add-car" element={<AddCar />} />
    <Route path="/simulation/:carId" element={<Simulation />} />
    <Route path="/analytics/:carId" element={<Analytics />} />
  </Route>
</Routes> 
    </BrowserRouter>
  );
}

export default App;
