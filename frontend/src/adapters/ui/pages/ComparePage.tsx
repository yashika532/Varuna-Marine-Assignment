import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { fetchComparison } from "../../infrastructure/apiClient";

export default function ComparePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComparison()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 text-blue-600 gap-2">
        <Loader2 className="animate-spin w-5 h-5" />
        <span className="font-medium">Loading comparison data…</span>
      </div>
    );

  if (!data)
    return (
      <div className="text-center text-gray-500 p-6">
        ⚠️ No comparison data available.
      </div>
    );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <motion.h2
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-gray-800 tracking-tight"
      >
        📊 Compliance Comparison
      </motion.h2>

      <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs uppercase">
            <tr>
              <th className="p-3 text-left">Route ID</th>
              <th className="p-3 text-left">GHG Intensity</th>
              <th className="p-3 text-left">% Difference</th>
              <th className="p-3 text-left">Compliant</th>
            </tr>
          </thead>
          <tbody>
            {data.comparisons.map((c: any, i: number) => (
              <motion.tr
                key={c.routeId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium">{c.routeId}</td>
                <td className="p-3">{c.ghgIntensity}</td>
                <td
                  className={`p-3 font-semibold ${
                    c.percentDiff < 0
                      ? "text-green-600"
                      : c.percentDiff < 5
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {c.percentDiff.toFixed(2)}%
                </td>
                <td className="p-3">
                  {c.compliant ? (
                    <span className="flex items-center gap-1 text-green-600 font-medium">
                      <CheckCircle className="w-4 h-4" /> Yes
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-500 font-medium">
                      <XCircle className="w-4 h-4" /> No
                    </span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

    
    </div>
  );
}
