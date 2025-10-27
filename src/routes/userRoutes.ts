import { Router } from "express";

import { deleteUser, getCurrentUser, updatePassword, updateUser } from "@/controllers/usersController";
import { isAutheticated } from "@/middlewares/auth";

const router = Router();

router.get("/me", getCurrentUser);
router.put("/me/password", isAutheticated, updatePassword);
router.put("/me/update", isAutheticated, updateUser);
router.delete("/me/delete", isAutheticated, deleteUser);

export default router;