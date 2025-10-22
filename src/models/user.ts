import config from "@/config";
import jwt from "jsonwebtoken";
import { z } from "zod";

export const UserSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required"),
  email: z
    .email("Invalid email address"),
  role: z
    .enum(["user", "employeer"])
    .default("user"),
  password: z
    .string()
    .min(8, "Password must be at least 6 characters long"),
  createdAt: z
    .date()
    .default(() => new Date()),
  resetPasswordToken: z
    .string()
    .optional(),
  resetPasswordExpires: z
    .date()
    .optional(),
});

export const getJwtToken = (userId: string) => {
  return jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn: "1h",
  });
};

export const comparePassword = async (enteredPassword: string, hashedPassword: string) => {
  const bcrypt = await import('bcrypt');
  return bcrypt.compare(enteredPassword, hashedPassword);
}

export type User = z.infer<typeof UserSchema>;