import { db } from "@/lib/db";
import { asyncMiddleware } from "@/middlewares/asyncHandler";
import { comparePassword, getJwtToken, User } from "@/models";
import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import ErrorHandler from "@/utils/errorHandler";

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

export const loginUser = asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }

  const user = await db<User>("users").where({ email }).first();

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await comparePassword(password, user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const token = getJwtToken(user.email);

  return res.status(200).json({
    success: true,
    token,
  });
});