import { Router } from "express";

import { deleteUser, getAppliedJobs, getCurrentUser, updatePassword, updateUser } from "@/controllers/usersController";
import { isAutheticated } from "@/middlewares/auth";

const router = Router();

router.get("/me", getCurrentUser);
router.put("/me/password", isAutheticated, updatePassword);
router.put("/me/update", isAutheticated, updateUser);
router.delete("/me/delete", isAutheticated, deleteUser);
router.get("/me/appliedjobs", isAutheticated, getAppliedJobs);

export default router;