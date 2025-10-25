import { Router } from "express";

import { getCurrentUser } from "@/controllers/usersController";

const router = Router();

router.get("/me", getCurrentUser);

export default router;