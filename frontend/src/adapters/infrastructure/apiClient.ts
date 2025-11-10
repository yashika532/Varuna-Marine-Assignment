const BASE = "http://localhost:4000/api";

/* ---------------- ROUTES ---------------- */
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

/* ---------------- COMPLIANCE (CB) ---------------- */
export async function fetchComplianceCB(shipId: string, year: number) {
  const r = await fetch(`${BASE}/compliance/cb?shipId=${shipId}&year=${year}`);
  if (!r.ok) throw new Error("Failed to compute compliance balance");
  return r.json();
}

export async function fetchAdjustedCB(year: number) {
  const r = await fetch(`${BASE}/compliance/adjusted-cb?year=${year}`);
  if (!r.ok) throw new Error("Failed to fetch adjusted CB");
  return r.json();
}

/* ---------------- BANKING ---------------- */
export async function postBankCB(shipId: string, year: number) {
  const r = await fetch(`${BASE}/banking/bank`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ shipId, year }),
  });
  if (!r.ok) throw new Error("Failed to bank CB");
  return r.json();
}

export async function postApplyBanked(shipId: string, year: number, amount: number) {
  const r = await fetch(`${BASE}/banking/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ shipId, year, amount }),
  });
  if (!r.ok) throw new Error("Failed to apply banked CB");
  return r.json();
}

/* ---------------- POOLING ---------------- */
export async function postCreatePool(year: number, members: any[]) {
  const r = await fetch(`${BASE}/pools`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ year, members }),
  });
  if (!r.ok) throw new Error("Failed to create pool");
  return r.json();
}
