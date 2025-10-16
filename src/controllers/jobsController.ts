import { Request, Response, NextFunction } from "express"
import { Job } from "../models";

export const getJobs = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobs: Job[] = [];

    res.status(200).json(jobs)
  } catch (error) {
    next(error)
  }
}