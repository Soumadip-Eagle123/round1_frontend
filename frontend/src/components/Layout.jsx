import { useState, useEffect, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const lightRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    navigate("/");
  };
 useEffect(() => {
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  const SIZE = 600; 

  const handleMouseMove = (e) => {
    mouseX = e.clientX - SIZE / 2;
    mouseY = e.clientY - SIZE / 2;
  };

  const animate = () => {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    if (lightRef.current) {
      lightRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }

    requestAnimationFrame(animate);
  };

  window.addEventListener("mousemove", handleMouseMove);
  animate();

  return () => window.removeEventListener("mousemove", handleMouseMove);
}, []);

  return (
    <div className="min-h-screen relative text-white overflow-x-hidden">
      <div className="wave-bg"></div>
      <div ref={lightRef} className="water-light"></div>

      {/* Sidebar Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed top-6 z-50 glow-btn bg-blue-600 px-3 py-2 rounded-lg shadow-lg transition-all duration-300 ${
          open ? "left-72" : "left-6"
        }`}
      >
        ☰
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-0 h-full w-64 
                       bg-white/10 backdrop-blur-lg 
                       border-r border-white/20 
                       shadow-2xl z-40"
          >
            <div className="h-full flex flex-col justify-between p-8 pt-24">
              <div>
                <h1 className="text-2xl font-bold text-blue-400 mb-12">
                  VehicleX
                </h1>

                <nav className="flex flex-col gap-5">
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setOpen(false);
                    }}
                    className="glow-btn px-4 py-2 rounded-lg hover:bg-white/20 transition"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={() => {
                      navigate("/add-car");
                      setOpen(false);
                    }}
                    className="glow-btn px-4 py-2 rounded-lg hover:bg-white/20 transition"
                  >
                    Add Car
                  </button>
                </nav>
              </div>

              <button
                onClick={handleLogout}
                className="glow-btn bg-red-600 px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 pt-28 px-6 lg:px-16">
        <Outlet />
      </div>

    </div>
  );
}