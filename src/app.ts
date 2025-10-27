import express from "express";
import fileUpload from "express-fileupload";

import jobsRoutes from "./routes/jobsRoutes";
import authRoutes from "./routes/authRoutes";
import usersRoutes from "./routes/userRoutes";
import { errorHandler } from "./middlewares/errorHandler";

import cookieParser from "cookie-parser";

import ErrorHandler from "./utils/errorHandler";

const app = express();

process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down due to uncaught exception.')
    process.exit(1);
});

app.use(cookieParser());

app.use(express.json());

app.use(fileUpload());

app.use("/api/jobs", jobsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes)

app.all("/{*any}", (req, _, next) => {
    next(new ErrorHandler(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;