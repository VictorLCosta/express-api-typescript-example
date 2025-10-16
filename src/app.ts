import express from "express";
import jobsRoutes from "./routes/jobsRoutes";

const app = express();

app.use(express.json());

app.use("/api/jobs", jobsRoutes);

export default app;