import config from "@/config";
import ErrorHandler from "@/utils/errorHandler";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
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

    // Handling Wrong JWT token error
    if(err.name === 'JsonWebTokenError') {
      const message = 'JSON Web token is invalid. Try Again!';
      error = new ErrorHandler(message, 500);
    }

      // Handling Expired JWT token error
    if(err.name === 'TokenExpiredError') {
      const message = 'JSON Web token is expired. Try Again!';
      error = new ErrorHandler(message, 500);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || 'Internal Server Error'
    })
  }
}
