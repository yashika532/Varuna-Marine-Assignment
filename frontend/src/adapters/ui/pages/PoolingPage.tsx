import React, { useEffect, useState } from "react";

interface Member {
  shipId: string;
  adjustedCB: number;
  newCB?: number;
}

export default function PoolingPage() {
  const [year, setYear] = useState(2024);
  const [members, setMembers] = useState<Member[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAdjustedCB = async () => {
    try {
      const res = await fetch(`/compliance/adjusted-cb?year=${year}`);
      const data = await res.json();
      setMembers(data.members || []);
    } catch {
      setMessage("❌ Failed to fetch adjusted CBs.");
    }
  };

  useEffect(() => {
    fetchAdjustedCB();
  }, [year]);

  const poolSum = members.reduce((sum, m) => sum + m.adjustedCB, 0);
  const validPool = poolSum >= 0;

  const handleCreatePool = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/pools", { method: "POST" });
      if (res.ok) {
        setMessage("✅ Pool created successfully.");
        fetchAdjustedCB();
      } else {
        setMessage("❌ Pool creation failed.");
      }
    } catch {
      setMessage("❌ Error creating pool.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow border text-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">🤝 Pooling — Article 21</h2>

      <div className="flex items-center gap-4 mb-4">
        <label className="font-medium">Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded px-3 py-1 w-24 text-center"
        />
        <button
          onClick={fetchAdjustedCB}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      {message && <p className="mb-4 text-sm font-medium text-blue-700">{message}</p>}

      <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Ship ID</th>
            <th className="text-left">Adjusted CB</th>
            <th className="text-left">New CB</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.shipId} className="border-t hover:bg-gray-50">
              <td className="p-2 font-medium">{m.shipId}</td>
              <td className={`${m.adjustedCB >= 0 ? "text-green-600" : "text-red-600"} p-2`}>
                {m.adjustedCB}
              </td>
              <td className="p-2">{m.newCB ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex items-center justify-between">
        <div className="font-medium">
          Pool Sum:{" "}
          <span className={`${validPool ? "text-green-600" : "text-red-600"} font-semibold`}>
            {poolSum}
          </span>
        </div>
        <button
          onClick={handleCreatePool}
          disabled={!validPool || loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Create Pool
        </button>
      </div>
    </div>
  );
}
