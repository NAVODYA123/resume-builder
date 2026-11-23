import { z } from "zod";
import { isValidPhoneNumber, type CountryCode } from "libphonenumber-js";

const countrySchema = z.object({
  code: z.string(),
  name: z.string(),
  dialCode: z.string(),
});

const phoneSchema = z
  .object({
    country: countrySchema.nullable(),
    number: z.string(),
  })
  .superRefine((phone, ctx) => {
    if (!phone.number.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Phone number is required",
      });
      return;
    }

    if (!phone.country) {
      ctx.addIssue({
        code: "custom",
        message: "Please select a country",
      });
      return;
    }

    if (!isValidPhoneNumber(phone.number, phone.country.code as CountryCode)) {
      ctx.addIssue({
        code: "custom",
        message: "Please enter a valid phone number",
      });
    }
  });

const personalInformationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .regex(
      /^[\p{L}\p{M}\s.'’-]+$/u,
      "Name cannot contain numbers or invalid characters",
    ),

  jobTitle: z.string(),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  phone: phoneSchema,

  address: z.string(),

  summary: z.string(),

  profilePicture: z.instanceof(File).nullable(),

  linkedin: z.string(),
});

export const resumeSchema = z.object({
  personalInformation: personalInformationSchema,

  workExperience: z.array(
    z.object({
      id: z.string(),
      years: z.string(),
      company: z.string(),
      position: z.string(),
      description: z.array(
        z.object({
          projectName: z.string(),
          projectDescription: z.string(),
          duration: z.string().optional(),
        }),
      ),
      techstack: z.array(z.string()),
    }),
  ),

  education: z.array(
    z.object({
      id: z.string(),
      years: z.string(),
      qualification: z.string(),
      institution: z.string(),
    }),
  ),

  customLeftPanelItem: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        items: z.array(z.string()),
      }),
    )
    .optional(),

  customRightPanelItem: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        subtitle: z.string().optional(),
        years: z.string().optional(),
        content: z.union([z.string(), z.array(z.string())]),
      }),
    )
    .optional(),

  sectionOrder: z.array(
    z.object({
      id: z.string(),
      type: z.enum([
        "workExperience",
        "education",
        "customRightPanelItem",
        "customLeftPanelItem",
        "profileSummary",
        "contactInfo",
      ]),
    }),
  ),

  leftSectionOrder: z.array(
    z.object({
      id: z.string(),
      type: z.enum([
        "workExperience",
        "education",
        "customRightPanelItem",
        "customLeftPanelItem",
        "profileSummary",
        "contactInfo",
      ]),
    }),
  ),
});
