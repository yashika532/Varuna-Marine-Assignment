import React, { useEffect, useState } from "react";

export default function BankingPage() {
  const [year, setYear] = useState(2024);
  const [cb, setCb] = useState<number | null>(null);
  const [kpi, setKpi] = useState<{ cb_before: number; applied: number; cb_after: number } | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch current Compliance Balance (CB)
  const fetchCB = async () => {
    try {
      const res = await fetch(`/compliance/cb?year=${year}`);
      const data = await res.json();
      setCb(data.cb);
      setKpi(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to fetch compliance balance.");
    }
  };

  useEffect(() => {
    fetchCB();
  }, [year]);

  const handleBank = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/banking/bank", { method: "POST" });
      const data = await res.json();
      setKpi(data);
      setMessage("✅ CB successfully banked.");
      fetchCB();
    } catch {
      setMessage("❌ Error banking CB.");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/banking/apply", { method: "POST" });
      const data = await res.json();
      setKpi(data);
      setMessage("✅ Surplus applied successfully.");
      fetchCB();
    } catch {
      setMessage("❌ Error applying banked surplus.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow border text-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">🏦 Banking — Article 20</h2>

      <div className="flex items-center gap-4 mb-4">
        <label className="font-medium">Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded px-3 py-1 w-24 text-center"
        />
        <button
          onClick={fetchCB}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      {cb !== null && (
        <div className="mb-4 font-medium">
          Current Compliance Balance:{" "}
          <span className={`${cb > 0 ? "text-green-600" : "text-red-600"} font-semibold`}>
            {cb}
          </span>
        </div>
      )}

      {message && <p className="mb-4 text-sm font-medium text-blue-700">{message}</p>}

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleBank}
          disabled={loading || (cb !== null && cb <= 0)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Bank Surplus
        </button>
        <button
          onClick={handleApply}
          disabled={loading || (cb !== null && cb <= 0)}
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Apply to Deficit
        </button>
      </div>

      {kpi && (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-semibold text-gray-700 mb-2">KPIs</h3>
          <p>CB Before: <span className="font-medium">{kpi.cb_before}</span></p>
          <p>Applied: <span className="font-medium">{kpi.applied}</span></p>
          <p>CB After: <span className="font-medium">{kpi.cb_after}</span></p>
        </div>
      )}
    </div>
  );
}
