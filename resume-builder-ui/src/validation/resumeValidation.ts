import { z } from "zod";

export const personalInformationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),

  jobTitle: z.string().min(1, "Job title is required"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  phone: z.string().min(1, "Phone number is required"),

  address: z.string().min(1, "Address is required"),

  summary: z.string().min(1, "Professional summary is required"),

  linkedin: z
    .string()
    .url("Please enter a valid LinkedIn URL")
    .or(z.literal("")),
});
