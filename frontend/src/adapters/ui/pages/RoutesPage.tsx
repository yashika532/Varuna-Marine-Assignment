import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

interface Route {
  route_id: string;
  vessel_type: string;
  fuel_type: string;
  year: number;
  ghg_intensity: number;
  fuel_consumption: number;
  distance: number;
  total_emissions: number;
  is_baseline: boolean;
}

export default function RoutesPage() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch routes from backend
  const fetchRoutes = async () => {
    try {
      const res = await fetch("/api/routes");
      const data = await res.json();
      setRoutes(data);
    } catch (err) {
      console.error("Error fetching routes:", err);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  // Handle setting baseline
  const handleSetBaseline = async (routeId: string) => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`/api/routes/${routeId}/baseline`, {
        method: "POST",
      });
      if (res.ok) {
        setMessage(`✅ Baseline updated successfully (Route ${routeId})`);
        fetchRoutes(); // refresh the table
      } else {
        setMessage("❌ Failed to update baseline");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error updating baseline");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-gray-800 tracking-tight"
      >
        🚢 FuelEU Maritime — Routes Dashboard
      </motion.h1>

      {message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mb-4 text-sm font-medium px-4 py-2 rounded-lg shadow-sm w-fit ${
            message.startsWith("✅")
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message}
        </motion.div>
      )}

      {loading && (
        <div className="flex items-center gap-2 mb-3 text-blue-600 font-medium">
          <Loader2 className="w-4 h-4 animate-spin" />
          Updating baseline...
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border border-gray-200">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white uppercase text-xs">
            <tr>
              <th className="p-3 text-left">Route ID</th>
              <th className="p-3 text-left">Vessel Type</th>
              <th className="p-3 text-left">Fuel Type</th>
              <th className="p-3 text-left">Year</th>
              <th className="p-3 text-left">GHG Intensity</th>
              <th className="p-3 text-left">Fuel (t)</th>
              <th className="p-3 text-left">Distance (km)</th>
              <th className="p-3 text-left">Emissions (t)</th>
              <th className="p-3 text-left">Baseline</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((r, i) => (
              <motion.tr
                key={r.route_id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`border-b ${
                  r.is_baseline
                    ? "bg-green-50 border-green-100"
                    : "hover:bg-gray-50"
                }`}
              >
                <td className="p-3 font-medium">{r.route_id}</td>
                <td className="p-3">{r.vessel_type}</td>
                <td className="p-3">{r.fuel_type}</td>
                <td className="p-3">{r.year}</td>
                <td className="p-3">{r.ghg_intensity}</td>
                <td className="p-3">{r.fuel_consumption}</td>
                <td className="p-3">{r.distance}</td>
                <td className="p-3">{r.total_emissions}</td>
                <td className="p-3">
                  {r.is_baseline ? (
                    <span className="flex items-center gap-1 text-green-600 font-medium">
                      <CheckCircle className="w-4 h-4" /> Yes
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-500 font-medium">
                      <XCircle className="w-4 h-4" /> No
                    </span>
                  )}
                </td>
                <td className="p-3 text-center">
                  {!r.is_baseline && (
                    <button
                      onClick={() => handleSetBaseline(r.route_id)}
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Set Baseline
                    </button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {routes.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No routes available.</p>
      )}
    </div>
  );
}
