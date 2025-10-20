import express from "express";
import jobsRoutes from "./routes/jobsRoutes";
import { errorsMiddleware } from "./middlewares/errorsMiddleware";

const app = express();

app.use(express.json());

app.use("/api/jobs", jobsRoutes);

app.use(errorsMiddleware);

export default app;