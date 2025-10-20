import { Request, Response, NextFunction } from "express"
import { Job } from "@/models";
import { db } from "@/lib/db";

export const getJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobs = (await db<Job>("jobs").select("*")).sort();

    res.status(200).json(jobs)
  } catch (error) {
    next(error)
  }
};

export const getJobById = async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const job = await db<Job>("jobs").where("id", req.params.id).first();

    res.status(200).json(job)
  } catch (error) {
    next(error)
  }
};

export const createJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await db<Job>("jobs").insert(req.body);

    res.status(201).json({ message: "Job created successfully" });
  } catch (error) {
    next(error);
  }
};