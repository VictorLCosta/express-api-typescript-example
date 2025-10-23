import { loginUser, logout, registerUser } from "@/controllers/authController";
import { Router } from "express";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/logout", logout);

export default router;