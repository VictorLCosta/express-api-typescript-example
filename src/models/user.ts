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

export type User = z.infer<typeof UserSchema>;