import { Router } from "express";
import { createJob, getJobById, getJobs } from "@/controllers/jobsController";

import { isAutheticated } from "@/middlewares/auth";

const router = Router();

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/", isAutheticated, createJob);

export default router;