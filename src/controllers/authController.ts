import { db } from "@/lib/db";
import { asyncMiddleware } from "@/middlewares/asyncHandler";
import { comparePassword, getJwtToken, getResetPasswordToken, User } from "@/models";
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

  return sendToken(user, 200, res, req);
});

export const forgotPassword = asyncMiddleware(async (req, _, next) => {
  const { email } = req.body;

  const user = await db<User>("users").where({ email }).first();

  if (!user)
    return next(new ErrorHandler("User not found with this email", 404));

  const resetToken = await getResetPasswordToken(user);
});

export const logout = asyncMiddleware( async(_, res, __) => {
    res.cookie('token', 'none', {
        expires : new Date(Date.now()),
        httpOnly : true 
    });

    res.status(200).json({
        success : true,
        message : 'Logged out successfully.'
    });
});
