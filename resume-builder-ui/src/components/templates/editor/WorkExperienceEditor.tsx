import { useFormContext, useWatch } from "react-hook-form";

import { Stack, TextField, Typography } from "@mui/material";

import type { ResumeData } from "@/types/resume.types";
import { useEffect, useState } from "react";

export const WorkExperienceEditor = () => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeData>();

  const [techStackInput, setTechStackInput] = useState("");

  const techStack = useWatch({
    control,
    name: "workExperience.0.techstack",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTechStackInput((techStack || []).join(", "));
  }, [techStack]);

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Work Experience</Typography>

      <TextField
        label="Position"
        fullWidth
        {...register("workExperience.0.position", {
          required: "Professional title is required",
        })}
        error={!!errors.workExperience?.[0]?.position}
        helperText={errors.workExperience?.[0]?.position?.message}
      />

      <TextField
        label="Company"
        fullWidth
        {...register("workExperience.0.company")}
      />

      <TextField
        label="Project Name"
        fullWidth
        {...register("workExperience.0.description.0.projectName")}
      />

      <TextField
        label="Project Description"
        fullWidth
        {...register("workExperience.0.description.0.projectDescription")}
      />

      <TextField
        label="Work Duration"
        fullWidth
        {...register("workExperience.0.years", {
          required: "Duration is required",
        })}
        error={!!errors.workExperience?.[0]?.years}
        helperText={errors.workExperience?.[0]?.years?.message}
      />

      <TextField
        label="Tech Stack"
        fullWidth
        value={techStackInput}
        onChange={(event) => {
          const value = event.target.value;

          setTechStackInput(value);

          const techStackArray = value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);

          setValue("workExperience.0.techstack", techStackArray);
        }}
        helperText="Separate technologies with commas (e.g. React, TypeScript, Next.js)"
      />
    </Stack>
  );
};
