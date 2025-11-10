import React, { useState } from "react";
import RoutesPage from "./adapters/ui/pages/RoutesPage";
import ComparePage from "./adapters/ui/pages/ComparePage";

export default function App() {
  const [tab, setTab] = useState("routes");
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 text-white p-4 flex gap-6">
        {["routes","compare","banking","pooling"].map(t => (
          <button key={t} onClick={()=>setTab(t)} className={tab===t?"font-bold":""}>
            {t.toUpperCase()}
          </button>
        ))}
      </nav>
      {tab==="routes" && <RoutesPage/>}
      {tab==="compare" && <ComparePage/>}
      {tab==="banking" && <div className="p-6">Banking coming soon</div>}
      {tab==="pooling" && <div className="p-6">Pooling coming soon</div>}
    </div>
  );
}
