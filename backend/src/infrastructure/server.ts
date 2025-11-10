import express from "express";
import cors from "cors";
import routesRouter from "../adapters/inbound/http/routes.router";
import complianceRouter from "../adapters/inbound/http/compliance.router";



const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/routes", routesRouter);
app.use("/api/compliance", complianceRouter);

app.listen(4000,()=>console.log("✅ Backend running on http://localhost:4000"));
