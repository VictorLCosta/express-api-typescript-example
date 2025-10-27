import express from "express";
import fileUpload from "express-fileupload";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { xss } from "express-xss-sanitizer";
import hpp from "hpp";

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

app.use(helmet());

app.use(cookieParser());

app.use(express.json());

app.use(fileUpload());

app.use(xss())

app.use(hpp());

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

app.use("/api/jobs", jobsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes)

app.all("/{*any}", (req, _, next) => {
    next(new ErrorHandler(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;