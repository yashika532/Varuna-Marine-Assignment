import React, { useState } from "react";
import RoutesPage from "./adapters/ui/pages/RoutesPage";
import ComparePage from "./adapters/ui/pages/ComparePage";
import BookingPage from "./adapters/ui/pages/BankingPage"
import PoolingPage from "./adapters/ui/pages/PoolingPage"
import { Ship, BarChart2, Banknote, Users } from "lucide-react";

export default function App() {
  const [tab, setTab] = useState("routes");

  const tabs = [
    { id: "routes", label: "Routes", icon: <Ship className="w-4 h-4" /> },
    { id: "compare", label: "Compare", icon: <BarChart2 className="w-4 h-4" /> },
    { id: "banking", label: "Banking", icon: <Banknote className="w-4 h-4" /> },
    { id: "pooling", label: "Pooling", icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col font-sans">
      {/* Navbar */}
      <header className="bg-blue-700 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <span className="text-2xl">⚓</span> FuelEU Maritime
          </h1>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-10">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-6 text-base font-medium transition-colors ${
                  tab === t.id
                    ? "text-white border-b-2 border-white pb-1"
                    : "text-blue-100 hover:text-white"
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 text-sm text-blue-100">
            Welcome, <span className="font-semibold text-white">Admin</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        {tab === "routes" && <RoutesPage />}
        {tab === "compare" && <ComparePage />}
        {tab === "banking" && <BookingPage />}
        {tab === "pooling" && <PoolingPage />}
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 py-4 border-t mt-auto bg-gray-100">
        © {new Date().getFullYear()} FuelEU Maritime Platform · Built By Yashika Jain
      </footer>
    </div>
  );
}
