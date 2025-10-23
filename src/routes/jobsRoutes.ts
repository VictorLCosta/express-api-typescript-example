import { Router } from "express";
import { createJob, deleteJob, getJobById, getJobs } from "@/controllers/jobsController";

import { isAutheticated } from "@/middlewares/auth";
import { authorizationMiddleware } from "@/middlewares/authorization";

const router = Router();

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/", isAutheticated, authorizationMiddleware("employer"), createJob);
router.delete("/:id", isAutheticated, authorizationMiddleware("employer"), deleteJob);

export default router;