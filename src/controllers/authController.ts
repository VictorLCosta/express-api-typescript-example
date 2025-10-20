import { db } from "@/lib/db";
import { asyncMiddleware } from "@/middlewares/asyncHandler";
import { User } from "@/models";
import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';

export const registerUser = asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await db<User>("users")
    .insert({
      name,
      email,
      password: hashedPassword,
      role,
    })
    .returning("*");

  return newUser;
});