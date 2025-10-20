import express from "express";
import jobsRoutes from "./routes/jobsRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.use("/api/jobs", jobsRoutes);

app.use(errorHandler);

export default app;