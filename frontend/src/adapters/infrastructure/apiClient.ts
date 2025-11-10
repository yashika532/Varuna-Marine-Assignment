const BASE = "http://localhost:4000/api";

export async function fetchRoutes() {
  const r = await fetch(`${BASE}/routes`);
  return r.json();
}

export async function postSetBaseline(routeId: string) {
  const r = await fetch(`${BASE}/routes/${routeId}/baseline`, { method: "POST" });
  return r.json();
}

export async function fetchComparison() {
  const r = await fetch(`${BASE}/routes/comparison`);
  return r.json();
}

// ✅ Fetch Compliance Balance
export async function fetchComplianceCB(shipId: string, year: number) {
  const r = await fetch(`${BASE}/compliance/cb?shipId=${shipId}&year=${year}`);
  if (!r.ok) throw new Error("Failed to compute compliance balance");
  return r.json();
}

// ✅ Bank Surplus
export async function postBankCB(shipId: string, year: number) {
  const r = await fetch(`${BASE}/banking/bank`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ shipId, year }),
  });
  return r.json();
}

// ✅ Apply Banked CB
export async function postApplyBankedCB(shipId: string, year: number, amount: number) {
  const r = await fetch(`${BASE}/banking/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ shipId, year, amount }),
  });
  return r.json();
}

// ✅ Fetch CBs (for ships)
export async function fetchAdjustedCBs(year: number) {
  const r = await fetch(`${BASE}/compliance/adjusted-cb?year=${year}`);
  return r.json();
}

// ✅ Create Pool
export async function createPool(year: number, members: any[]) {
  const r = await fetch(`${BASE}/pools`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ year, members }),
  });
  return r.json();
}
