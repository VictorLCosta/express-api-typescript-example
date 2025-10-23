import { User } from '@/models';
import { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  export interface Request {
    user: User | JwtPayload | null;
  }
}