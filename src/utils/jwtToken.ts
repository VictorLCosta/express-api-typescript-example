import { getJwtToken, User } from "@/models";
import { CookieOptions, Request, Response } from "express";

export const sendToken = (user: User, statusCode: number, res: Response, req: Request) => {
  const token = getJwtToken(user.email);
  
  const options: CookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      user,
    });
};