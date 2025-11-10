import express from "express";
import { pool } from "../../outbound/postgres/db";

const router = express.Router();

// ✅ POST /api/banking/bank
router.post("/bank", async (req, res) => {
  const { shipId, year } = req.body;
  try {
    const cbRes = await pool.query(
      "SELECT cb_gco2eq FROM ship_compliance WHERE ship_id = $1 AND year = $2",
      [shipId, year]
    );

    if (cbRes.rows.length === 0)
      return res.status(400).json({ message: "No CB found" });

    const cb = Number(cbRes.rows[0].cb_gco2eq);
    if (cb <= 0)
      return res
        .status(400)
        .json({ message: "Cannot bank negative or zero CB" });

    await pool.query(
      "INSERT INTO bank_entries (ship_id, year, amount_gco2eq) VALUES ($1, $2, $3)",
      [shipId, year, cb]
    );

    res.json({ message: "Banked successfully", cb });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error banking CB" });
  }
});

// ✅ POST /api/banking/apply
router.post("/apply", async (req, res) => {
  const { shipId, year, amount } = req.body;
  try {
    const bankRes = await pool.query(
      "SELECT SUM(amount_gco2eq) as total FROM bank_entries WHERE ship_id = $1 AND year = $2",
      [shipId, year]
    );
    const totalBanked = Number(bankRes.rows[0].total) || 0;

    if (amount > totalBanked)
      return res.status(400).json({ message: "Insufficient banked CB" });

    const cbRes = await pool.query(
      "SELECT cb_gco2eq FROM ship_compliance WHERE ship_id = $1 AND year = $2",
      [shipId, year]
    );
    const cbBefore = Number(cbRes.rows[0].cb_gco2eq);
    const cbAfter = cbBefore + amount;

    await pool.query(
      "UPDATE ship_compliance SET cb_gco2eq = $1 WHERE ship_id = $2 AND year = $3",
      [cbAfter, shipId, year]
    );

    res.json({ cb_before: cbBefore, applied: amount, cb_after: cbAfter });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error applying banked CB" });
  }
});

export default router;
