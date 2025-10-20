import config from "@/config";
import ErrorHandler from "@/utils/errorHandler";
import { Request, Response, NextFunction } from "express";

export const errorsMiddleware = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  err.message = err.message || 'Internal Server Error';

  if (config.nodeEnv === 'development') {
    res.status(err.statusCode).json({
      success: false,
      error: err, 
      message: err.message, 
      stack: err.stack 
    });
  }

  if (config.nodeEnv === 'production') {
    let error = { ...err };

    error.message = err.message;

    res.status(error.statusCode).json({
      success: false,
      message: error.message || 'Internal Server Error'
    })
  }
}
