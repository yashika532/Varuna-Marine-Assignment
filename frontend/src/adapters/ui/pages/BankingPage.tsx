import React, { useState } from "react";
import {
  fetchComplianceCB,
  postBankCB,
  postApplyBankedCB,
} from "../../infrastructure/apiClient";

export default function BankingPage() {
  const [shipId, setShipId] = useState("R001");
  const [year, setYear] = useState(2024);
  const [cb, setCb] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const getCB = async () => {
    try {
      const data = await fetchComplianceCB(shipId, year);
      setCb(data.cb_before || data.cb_gco2eq);
      setStatus(data.cb_before > 0 ? "Surplus" : "Deficit");
      setMessage("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to compute CB.");
    }
  };

  const handleBank = async () => {
    try {
      const res = await postBankCB(shipId, year);
      if (res.error || res.message?.includes("Cannot bank"))
        setMessage("❌ Failed to bank CB.");
      else setMessage("✅ Banked successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to bank CB.");
    }
  };

  const handleApply = async () => {
    try {
      const res = await postApplyBankedCB(shipId, year, amount);
      if (res.error) setMessage("❌ Failed to apply banked CB.");
      else
        setMessage(
          `✅ Applied ${amount} gCO₂eq successfully. New CB: ${res.cb_after}`
        );
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to apply banked CB.");
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
        />
        <input
          type="number"
          className="border p-2"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={getCB}
        >
          Get CB
        </button>
      </div>

      {cb !== null && (
        <div className="mb-3">
          <p>
            <strong>Compliance Balance:</strong> {cb.toFixed(2)} gCO₂eq
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={status === "Surplus" ? "text-green-600" : "text-red-600"}
            >
              {status} {status === "Surplus" ? "✅" : "❌"}
            </span>
          </p>
        </div>
      )}

      {/* Bank Button */}
      <button
        onClick={handleBank}
        className="bg-green-600 text-white px-4 py-2 rounded mr-2"
      >
        Bank Surplus
      </button>

      {/* Apply Banked CB Section */}
      <div className="mt-6 border-t pt-4">
        <h2 className="font-semibold mb-2">Apply Banked CB</h2>
        <div className="flex gap-3 mb-3">
          <input
            type="number"
            placeholder="Amount (gCO₂eq)"
            className="border p-2"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <button
            onClick={handleApply}
            className="bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Apply Banked CB
          </button>
        </div>
      </div>

      {message && <p className="mt-3 text-blue-600">{message}</p>}
    </div>
  );
}
