import { Request, Response, NextFunction } from "express";
import { Job } from "@/models";
import { db } from "@/lib/db";
import { asyncMiddleware } from "@/middlewares/asyncHandler";
import path from "path";
import ErrorHandler from "@/utils/errorHandler";
import { UploadedFile } from "express-fileupload";

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

export const applyJob = asyncMiddleware(async (req, res, next) => {
  const jobId = req.params.id;

  if (!jobId) return res.status(400).json({ message: "Job ID is required" });

  let job = await db<Job>("jobs").where("title", jobId).first();

  if (!job) {
    return next({ status: 404, message: "Job not found" });
  }

  if (job.lastDate < new Date(Date.now())) {
    return next({ status: 400, message: "The application deadline has passed" });
  }

  const file = req.files?.file as UploadedFile;

  if (!file) {
    return next({ status: 400, message: "Resume file is required" });
  }

  const supportedFormats = ["pdf", "doc", "docx"];
  if (!supportedFormats.includes(path.extname(file.name))) {
    return next(new ErrorHandler("Unsupported file format. Please upload a PDF or Word document.", 400));
  }

  if (file.size > 2 * 1024 * 1024) {
    return next(new ErrorHandler("File size exceeds the 2MB limit.", 400));
  }

  file.mv(`./uploads/${file.name}`, async err => {
    if (err) {
      console.log(err);
      return next(new ErrorHandler("File upload failed. Please try again.", 500));
    }

    await db<Job>("jobs").where("id", req.params.id).update({
      applicantsApplied: db.raw("array_append(applicantsApplied, ?)", [req.body.applicantId]),
    });

    res.status(200).json({ message: "Application submitted successfully." });
  });
});