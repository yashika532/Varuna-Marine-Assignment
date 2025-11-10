import express from "express";
import { getAllRoutes, setBaseline } from "../../outbound/postgres/routes.repo"; 

const router = express.Router();

// 🧩 GET /api/routes
router.get("/", async (_req, res) => {
  try {
    const data = await getAllRoutes();
    res.json(data);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch routes" });
  }
});

// 🧩 POST /api/routes/:routeId/baseline
router.post("/:routeId/baseline", async (req, res) => {
  try {
    const route = await setBaseline(req.params.routeId);
    res.json(route);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to set baseline" });
  }
});

// 🧩 GET /api/routes/comparison
router.get("/comparison", async (_req, res) => {
  try {
    const all = await getAllRoutes();
    const base = all.find((r) => r.is_baseline);
    if (!base) return res.status(400).json({ message: "No baseline set" });

    const comps = all
      .filter((r) => r.route_id !== base.route_id)
      .map((r) => {
        const diff = ((r.ghg_intensity / base.ghg_intensity) - 1) * 100;
        return {
          routeId: r.route_id,
          ghgIntensity: r.ghg_intensity,
          percentDiff: Number(diff.toFixed(4)),
          compliant: r.ghg_intensity <= 89.3368,
        };
      });

    res.json({
      baseline: { routeId: base.route_id, ghgIntensity: base.ghg_intensity },
      comparisons: comps,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to compare routes" });
  }
});

export default router;
