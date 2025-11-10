import express from "express";
import { pool } from "../../outbound/postgres/db";

const router = express.Router();

// ✅ POST /api/pools — Create a new pool
router.post("/", async (req, res) => {
  const { year, members } = req.body; // members = [{ shipId, cb }]
  try {
    if (!members || members.length < 2)
      return res.status(400).json({ message: "At least 2 members required" });

    const total = members.reduce((sum: number, m: any) => sum + Number(m.cb), 0);

    if (total < 0)
      return res.status(400).json({ message: "❌ Pool total must be >= 0" });

    // ✅ Create pool entry
    const poolRes = await pool.query(
      "INSERT INTO pools (year) VALUES ($1) RETURNING id",
      [year]
    );
    const poolId = poolRes.rows[0].id;

    // ✅ Sort members (surplus first, deficit last)
    const sorted = [...members].sort((a, b) => b.cb - a.cb);

    // ✅ Greedy redistribution
    let surplus = sorted.filter((m) => m.cb > 0);
    let deficit = sorted.filter((m) => m.cb < 0);

    for (const s of surplus) {
      let available = s.cb;
      for (const d of deficit) {
        if (d.cb >= 0) continue;
        const transfer = Math.min(available, Math.abs(d.cb));
        d.cb += transfer;
        available -= transfer;
        if (available <= 0) break;
      }
    }

    // ✅ Save results in pool_members + update ship_compliance
    for (const m of sorted) {
      await pool.query(
        "INSERT INTO pool_members (pool_id, ship_id, cb_before, cb_after) VALUES ($1, $2, $3, $4)",
        [poolId, m.shipId, m.originalCb, m.cb]
      );
      await pool.query(
        "UPDATE ship_compliance SET cb_gco2eq = $1 WHERE ship_id = $2 AND year = $3",
        [m.cb, m.shipId, year]
      );
    }

    res.json({ message: "✅ Pool created successfully", poolId });
  } catch (err) {
    console.error("Error in /pools:", err);
    res.status(500).json({ error: "Error creating pool" });
  }
});

export default router;
