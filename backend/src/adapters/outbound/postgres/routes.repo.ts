import { pool } from "./db";

export async function getAllRoutes(){
  const r = await pool.query("SELECT * FROM routes ORDER BY route_id");
  return r.rows;
}
export async function setBaseline(routeId:string){
  await pool.query("UPDATE routes SET is_baseline = FALSE");
  const r = await pool.query("UPDATE routes SET is_baseline = TRUE WHERE route_id=$1 RETURNING *",[routeId]);
  return r.rows[0];
}
