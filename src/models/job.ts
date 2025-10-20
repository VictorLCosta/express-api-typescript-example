import { z } from "zod";

export const jobSchema = z.object({
  title: z
    .string({
      error: "Please enter Job title.",
    })
    .trim()
    .max(100, "Job title can not exceed 100 characters."),
  
  slug: z.string().optional(),

  description: z
    .string({
      error: "Please enter Job description.",
    })
    .max(1000, "Job description can not exceed 1000 characters."),

  email: z
    .string()
    .email("Please add a valid email address.")
    .optional(),

  address: z
    .string({
      error: "Please add an address.",
    }),

  location: z
    .object({
      type: z.literal("Point"),
      coordinates: z
        .array(z.number())
        .length(2, "Coordinates must contain [longitude, latitude]."),
      formattedAddress: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zipcode: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),

  company: z
    .string({
      error: "Please add Company name.",
    }).nonempty("Please add Company name."),

  industry: z
    .array(
      z.enum([
        "Business",
        "Information Technology",
        "Banking",
        "Education/Training",
        "Telecommunication",
        "Others",
      ])
    )
    .nonempty("Please enter industry for this job."),

  jobType: z.enum(["Permanent", "Temporary", "Internship"], {
    error: "Please select correct options for job type.",
  }),

  minEducation: z.enum(["Bachelors", "Masters", "Phd"], {
    error: "Please enter minimum education for this job.",
  }),

  positions: z.number().default(1),

  experience: z.enum(
    ["No Experience", "1 Year - 2 Years", "2 Year - 5 Years", "5 Years+"],
    {
      error: "Please enter experience required for this job.",
    }
  ),

  salary: z
    .number({
      error: "Please enter expected salary for this job.",
    }),

  postingDate: z.date().default(() => new Date()),

  lastDate: z.date().default(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  }),

  applicantsApplied: z.array(z.object()).optional(),

  user: z
    .string({
      error: "User ID is required.",
    })
});

export type Job = z.infer<typeof jobSchema>;
