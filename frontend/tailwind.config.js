export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0B1120",
        surface: "#111827",
        card: "#1F2937",
        primary: "#3B82F6",
        accent: "#22D3EE",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      boxShadow: {
        glow: "0 0 20px rgba(59,130,246,0.4)",
      },
    },
  },
  plugins: [],
};