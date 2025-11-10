import React, { useEffect, useState } from "react";
import { fetchComparison } from "../../infrastructure/apiClient";

export default function ComparePage(){
  const [data,setData]=useState<any>(null);
  useEffect(()=>{ fetchComparison().then(setData) },[]);
  if(!data) return <div className="p-4">Loading…</div>;
  return (
    <div className="p-4">
      <h2 className="text-xl mb-2 font-semibold">Comparison</h2>
      <table className="min-w-full bg-white shadow rounded">
        <thead><tr><th>routeId</th><th>ghgIntensity</th><th>% diff</th><th>Compliant</th></tr></thead>
        <tbody>
        {data.comparisons.map((c:any)=>(
          <tr key={c.routeId} className="border-t">
            <td className="p-2">{c.routeId}</td>
            <td>{c.ghgIntensity}</td>
            <td>{c.percentDiff.toFixed(2)}%</td>
            <td>{c.compliant?"✅":"❌"}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
