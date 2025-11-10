import React, { useState } from "react";

export default function PoolingPage() {
  const [year, setYear] = useState(2024);
  const [members, setMembers] = useState([
    { shipId: "R001", cb: 1000 },
    { shipId: "R002", cb: -500 },
  ]);
  const [result, setResult] = useState<any>(null);

  const createPool = async () => {
    const res = await fetch("/api/pools", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year, members }),
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Pooling</h1>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={createPool}
      >
        Create Pool
      </button>

      {result && (
        <div className="mt-4">
          <p>
            <strong>Pool ID:</strong> {result.pool_id}
          </p>
          <table className="w-full mt-2 border">
            <thead className="bg-gray-100">
              <tr>
                <th>Ship ID</th>
                <th>CB Before</th>
                <th>CB After</th>
              </tr>
            </thead>
            <tbody>
              {result.members.map((m: any) => (
                <tr key={m.shipId}>
                  <td>{m.shipId}</td>
                  <td>{m.cb}</td>
                  <td>{m.cb_after.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
