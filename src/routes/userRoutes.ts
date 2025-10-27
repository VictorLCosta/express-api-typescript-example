import { Router } from "express";

import { getCurrentUser, updatePassword } from "@/controllers/usersController";

const router = Router();

router.get("/me", getCurrentUser);
router.put("/me/password", updatePassword);

export default router;