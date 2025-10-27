import { Router } from "express";

import { 
  deleteUser, 
  getAllUsers, 
  getAppliedJobs, 
  getCurrentUser, 
  updatePassword, 
  updateUser 
} from "@/controllers/usersController";

import { isAutheticated } from "@/middlewares/auth";
import { authorizationMiddleware } from "@/middlewares/authorization";

const router = Router();

router.get("/me", getCurrentUser);
router.put("/me/password", isAutheticated, updatePassword);
router.put("/me/update", isAutheticated, updateUser);
router.delete("/me/delete", isAutheticated, deleteUser);
router.get("/me/appliedjobs", isAutheticated, getAppliedJobs);
router.get("/", isAutheticated, authorizationMiddleware("admin"), getAllUsers);

export default router;