import { Router } from "express";

import { getCurrentUser, updatePassword, updateUser } from "@/controllers/usersController";
import { isAutheticated } from "@/middlewares/auth";

const router = Router();

router.get("/me", getCurrentUser);
router.put("/me/password", isAutheticated, updatePassword);
router.put("/me/update", isAutheticated, updateUser);

export default router;