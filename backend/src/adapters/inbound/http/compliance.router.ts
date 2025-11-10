import express from "express";
import {pool} from "../../outbound/postgres/db"; // your database connection

const router = express.Router();

/**
 * GET /api/compliance/cb?shipId=R001&year=2024
 * Computes Compliance Balance and saves it in DB
 */

router.get("/cb", async (req, res) => {
  try {
    const { shipId, year } = req.query;

    if (!shipId || !year) {
      return res.status(400).json({ message: "shipId and year are required" });
    }

    // find route
    const result = await pool.query(
      "SELECT * FROM routes WHERE route_id=$1 AND year=$2",
      [shipId, year]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No route found for this shipId/year" });
    }

    const route = result.rows[0];
    const target = 89.3368; // target intensity
    const energy = route.fuel_consumption * 41000;
    const cb = (target - route.ghg_intensity) * energy;

    // insert compliance record
    await pool.query(
      "INSERT INTO ship_compliance (ship_id, year, cb_gco2eq) VALUES ($1,$2,$3)",
      [shipId, year, cb]
    );

    res.json({
      shipId,
      year,
      ghg_intensity: route.ghg_intensity,
      target,
      cb_before: cb,
      status: cb > 0 ? "Surplus ✅" : "Deficit ❌",
    });
  } catch (err) {
    console.error("Error in /compliance/cb:", err);
    res.status(500).json({ message: "Failed to compute compliance balance" });
  }
});

export default router;
