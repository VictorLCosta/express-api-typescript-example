import jwt from 'jsonwebtoken';
import { asyncMiddleware } from './asyncHandler';
import ErrorHandler from '@/utils/errorHandler';
import config from '@/config';

export const isAutheticated = asyncMiddleware(async (req, _, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorHandler('Not authorized to access this route', 401));
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded as { id: string; role: string };
    
    next();
  } catch (err) {
    return next(new ErrorHandler('Invalid or expired token', 401));
  }

  next();
});