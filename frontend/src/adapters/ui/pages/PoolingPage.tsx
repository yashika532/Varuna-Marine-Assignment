import React, { useEffect, useState } from "react";
import { fetchAdjustedCBs, createPool } from "../../infrastructure/apiClient";

export default function PoolingPage() {
  const [year, setYear] = useState(2024);
  const [members, setMembers] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      const data = await fetchAdjustedCBs(year);
      setMembers(data);
    };
    load();
  }, [year]);

  const handleCreatePool = async () => {
    const res = await createPool(year, members.map(m => ({
      shipId: m.ship_id,
      cb: m.cb_gco2eq,
      originalCb: m.cb_gco2eq
    })));
    if (res.error) setMessage("❌ Failed to create pool");
    else setMessage("✅ Pool created successfully!");
  };

  const total = members.reduce((sum, m) => sum + Number(m.cb_gco2eq || 0), 0);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Pooling</h1>

      <div className="flex gap-3 mb-4">
        <input
          type="number"
          className="border p-2"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </div>

      <table className="border-collapse border w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Ship ID</th>
            <th className="border p-2">CB (gCO₂eq)</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.ship_id}>
              <td className="border p-2">{m.ship_id}</td>
              <td
                className={`border p-2 ${
                  m.cb_gco2eq >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {m.cb_gco2eq.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className={`mt-3 ${total >= 0 ? "text-green-600" : "text-red-600"}`}>
        Total Pool CB: {total.toFixed(2)} gCO₂eq
      </p>

      <button
        onClick={handleCreatePool}
        disabled={total < 0}
        className={`mt-4 px-4 py-2 rounded ${
          total < 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 text-white"
        }`}
      >
        Create Pool
      </button>

      {message && <p className="mt-4 text-blue-600">{message}</p>}
    </div>
  );
}
