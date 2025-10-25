import { asyncMiddleware } from "@/middlewares/asyncHandler";

export const getCurrentUser = asyncMiddleware(async (req, res, next) => {
  const user = req.user;

  if (!user)
    return res.status(404).json({ message: "User not found" });

  res.status(200).json({ user });
});