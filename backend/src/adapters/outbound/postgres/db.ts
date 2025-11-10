import pkg from "pg";
import dotenv from "dotenv";
dotenv.config(); // loads .env into process.env in dev

const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.PG_USER || "postgres",
  host: process.env.PG_HOST || "localhost",
  database: process.env.PG_DATABASE || "fueleu",
  password: process.env.PG_PASSWORD,   // <-- from env, NOT in repo
  port: Number(process.env.PG_PORT || 5432),
});
