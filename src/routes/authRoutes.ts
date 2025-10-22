import { loginUser, registerUser } from "@/controllers/authController";
import { Router } from "express";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;