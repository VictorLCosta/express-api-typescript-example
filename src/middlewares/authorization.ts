import ErrorHandler from "@/utils/errorHandler";
import { asyncMiddleware } from "./asyncHandler";

export const authorizationMiddleware = (...roles: string[]) => asyncMiddleware(async (req, _, next) => {
  if (req.user) {
    roles.includes(req.user.role) ? next() : next(new ErrorHandler('Not authorized to access this route', 403));
  }

  next(new ErrorHandler('Not authorized to access this route', 401));
});