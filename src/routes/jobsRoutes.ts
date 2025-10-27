import { Router } from "express";
import { 
  applyJob, 
  createJob, 
  deleteJob, 
  getJobById, 
  getJobs 
} from "@/controllers/jobsController";

import { isAutheticated } from "@/middlewares/auth";
import { authorizationMiddleware } from "@/middlewares/authorization";

const router = Router();

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/", isAutheticated, authorizationMiddleware("employer"), createJob);
router.delete("/:id", isAutheticated, authorizationMiddleware("employer"), deleteJob);
router.put("/:id/apply", isAutheticated, authorizationMiddleware("candidate"), applyJob);

export default router;