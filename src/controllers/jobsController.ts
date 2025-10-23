import { Request, Response, NextFunction } from "express";
import { Job } from "@/models";
import { db } from "@/lib/db";
import { asyncMiddleware } from "@/middlewares/asyncHandler";
import { ca } from "zod/v4/locales";

export const getJobs = asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobs = (await db<Job>("jobs").select("*")).sort();

    res.status(200).json(jobs)
  } catch (error) {
    next(error)
  }
});

export const getJobById = asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const job = await db<Job>("jobs").where("id", req.params.id).first();

    res.status(200).json(job)
  } catch (error) {
    next(error)
  }
});

export const createJob = asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
  try {
    await db<Job>("jobs").insert(req.body);

    res.status(201).json({ message: "Job created successfully" });
  } catch (error) {
    next(error);
  }
});

export const deleteJob = asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await db<Job>("jobs").where("id", req.params.id).del();

    if (result === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    next(error);
  }
});