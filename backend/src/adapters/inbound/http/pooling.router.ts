import express from "express";
import { pool } from "../../outbound/postgres/db";

const router = express.Router();

// ✅ POST /api/pools
router.post("/", async (req, res) => {
  const { year, members } = req.body; // members: [{shipId, cb}]
  try {
    const sumCB = members.reduce((acc, m) => acc + Number(m.cb), 0);
    if (sumCB < 0)
      return res
        .status(400)
        .json({ message: "Total CB sum must be ≥ 0 for pooling" });

    // Create pool
    const poolRes = await pool.query(
      "INSERT INTO pools (year) VALUES ($1) RETURNING id",
      [year]
    );
    const poolId = poolRes.rows[0].id;

    // For simplicity: divide CB evenly
    const adjusted = members.map((m) => ({
      ...m,
      cb_after: Number(m.cb) + sumCB / members.length,
    }));

    for (const m of adjusted) {
      await pool.query(
        "INSERT INTO pool_members (pool_id, ship_id, cb_before, cb_after) VALUES ($1, $2, $3, $4)",
        [poolId, m.shipId, m.cb, m.cb_after]
      );
    }

    res.json({ pool_id: poolId, members: adjusted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating pool" });
  }
});

export default router;
