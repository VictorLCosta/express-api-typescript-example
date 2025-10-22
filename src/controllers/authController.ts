import { db } from "@/lib/db";
import { asyncMiddleware } from "@/middlewares/asyncHandler";
import { comparePassword, getJwtToken, User } from "@/models";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "@/utils/errorHandler";
import { sendToken } from "@/utils/jwtToken";
import bcrypt from 'bcrypt';

export const registerUser = asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await db<User>("users")
    .insert({
      name,
      email,
      password: hashedPassword,
    })
    .returning("*")
    .first();

  return sendToken(newUser!, 200, res, req);
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

  return sendToken(user, 200, res, req);
});