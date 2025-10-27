import { db } from "@/lib/db";
import { asyncMiddleware } from "@/middlewares/asyncHandler";
import { comparePassword, User } from "@/models";
import { sendToken } from "@/utils/jwtToken";

export const getCurrentUser = asyncMiddleware(async (req, res, next) => {
  const user = req.user;

  if (!user)
    return res.status(404).json({ message: "User not found" });

  res.status(200).json({ user });
});

export const updatePassword = asyncMiddleware(async (req, res, next) => {
  if (!req.user)
    return res.status(404).json({ message: "User not found" });

  const result = await db<User>("users")
    .where({ email: req.user.email })
    .select("password")
    .first();

  const isMatched = comparePassword(result!.password, req.user.password);

  if (!isMatched) {
    return res.status(401).json({ message: "Old password is incorrect" });
  }

  await db<User>("users")
    .where({ email: req.user.email })
    .update({ password: req.body.newPassword });

  return sendToken(req.user as User, 200, res, req);
});

export const updateUser = asyncMiddleware(async (req, res, next) => {
  const user: User = { ...req.body };

  await db<User>("users")
    .where({ email: req.user?.email })
    .update(user);

  res
    .status(200)
    .json({ success: true, message: "User updated successfully" });
});