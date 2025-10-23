import { Router } from "express";
import { createJob, getJobById, getJobs } from "@/controllers/jobsController";

import { isAutheticated } from "@/middlewares/auth";
import { authorizationMiddleware } from "@/middlewares/authorization";

const router = Router();

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/", isAutheticated, authorizationMiddleware("employer"), createJob);

export default router;