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
