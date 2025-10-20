import { Router } from "express";
import { getJobs } from "@/controllers/jobsController";

const router = Router();

router.get("/", getJobs);

export default router;