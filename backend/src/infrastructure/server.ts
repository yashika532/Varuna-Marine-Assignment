import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routesRouter from "../adapters/inbound/http/routes.router";
import complianceRouter from "../adapters/inbound/http/compliance.router";
import bankingRouter from "../adapters/inbound/http/banking.router";

dotenv.config();


const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/routes", routesRouter);
app.use("/api/compliance", complianceRouter);
app.use("/api/banking", bankingRouter);

app.listen(4000,()=>console.log("✅ Backend running on http://localhost:4000"));
