import React, { useEffect, useState } from "react";
import { fetchRoutes, postSetBaseline } from "../../infrastructure/apiClient";

export default function RoutesPage(){
  const [rows,setRows]=useState<any[]>([]);
  useEffect(()=>{ fetchRoutes().then(setRows) },[]);

  const handleBaseline=async(id:string)=>{
    await postSetBaseline(id);
    const d=await fetchRoutes();
    setRows(d);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-2 font-semibold">Routes</h1>
      <table className="min-w-full bg-white shadow rounded">
        <thead><tr>
          <th className="p-2">routeId</th><th>vesselType</th><th>fuelType</th><th>year</th>
          <th>ghgIntensity</th><th>fuelConsumption</th><th>distance</th><th>totalEmissions</th><th>Baseline</th>
        </tr></thead>
        <tbody>
        {rows.map(r=>(
          <tr key={r.routeId} className="border-t">
            <td className="p-2">{r.routeId}</td>
            <td>{r.vesselType}</td><td>{r.fuelType}</td><td>{r.year}</td>
            <td>{r.ghgIntensity}</td><td>{r.fuelConsumption}</td>
            <td>{r.distance}</td><td>{r.totalEmissions}</td>
            <td><button onClick={()=>handleBaseline(r.routeId)} className="bg-blue-500 text-white px-2 py-1 rounded">Set</button></td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
