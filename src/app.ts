import express from "express";
import jobsRoutes from "./routes/jobsRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down due to uncaught exception.')
    process.exit(1);
});

app.use(express.json());

app.use("/api/jobs", jobsRoutes);

app.use(errorHandler);

export default app;