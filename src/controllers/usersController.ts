import { db } from "@/lib/db";
import { asyncMiddleware } from "@/middlewares/asyncHandler";
import { comparePassword, Job, User } from "@/models";
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
    .where({ email: req.body?.email })
    .update(user);

  res
    .status(200)
    .json({ success: true, message: "User updated successfully" });
});

export const deleteUser = asyncMiddleware(async (req, res, next) => {
  const user = await db<User>("users")
    .where({ email: req.body?.email })
    .first();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.cookie("token", "none", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  await db<User>("users")
    .where({ email: req.body?.email })
    .del();

  res
    .status(204)
    .json({ success: true, message: "User deleted successfully" });
});

export const getAppliedJobs = asyncMiddleware(async (req, res, next) => {
  const jobs = await db<Job>("jobs").where("applicantsApplied.id", req.user?.email);

  res.status(200).json({ success: true, jobs });
});

export const getAllUsers = asyncMiddleware(async (req, res, next) => {
  const users = await db<User>("users").select("*");

  res.status(200).json({ success: true, users });
});
