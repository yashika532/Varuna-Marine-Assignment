import React, { useState } from "react";
import {
  fetchComplianceCB,
  postBankCB
} from "../../infrastructure/apiClient"; // ✅ import from your updated apiClient.ts

export default function BankingPage() {
  const [shipId, setShipId] = useState("R001");
  const [year, setYear] = useState(2024);
  const [cb, setCb] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Compute Compliance Balance
  const getCB = async () => {
    setLoading(true);
    setMessage("");
    try {
      const data = await fetchComplianceCB(shipId, year);
      setCb(Number(data.cb_before));
      setStatus(data.status || "Computed");
      setMessage("✅ Compliance Balance computed successfully!");
    } catch (err: any) {
      console.error(err);
      setMessage("❌ Failed to compute Compliance Balance.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Bank the Surplus CB
  const handleBank = async () => {
    if (cb === null) {
      setMessage("⚠️ Please compute CB first.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const data = await postBankCB(shipId, year);
      setMessage(data.message || "✅ Banked successfully!");
    } catch (err: any) {
      console.error(err);
      setMessage("❌ Failed to bank CB.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Banking</h1>

      <div className="flex gap-3 mb-4">
        <input
          className="border p-2"
          value={shipId}
          onChange={(e) => setShipId(e.target.value)}
          placeholder="Enter Ship ID"
        />
        <input
          type="number"
          className="border p-2"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          placeholder="Enter Year"
        />
        <button
          disabled={loading}
          className={`${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white px-4 py-2 rounded`}
          onClick={getCB}
        >
          {loading ? "Calculating..." : "Get CB"}
        </button>
      </div>

      {cb !== null && (
        <div className="mb-3 text-sm">
          <p>
            <strong>Compliance Balance:</strong> {cb.toFixed(2)} gCO₂eq
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {cb > 0 ? (
              <span className="text-green-600">Surplus ✅</span>
            ) : (
              <span className="text-red-600">Deficit ❌</span>
            )}
          </p>
        </div>
      )}

      <button
        disabled={loading}
        onClick={handleBank}
        className={`${
          loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
        } text-white px-4 py-2 rounded`}
      >
        {loading ? "Processing..." : "Bank Surplus"}
      </button>

      {message && <p className="mt-3 text-blue-600 font-medium">{message}</p>}
    </div>
  );
}
