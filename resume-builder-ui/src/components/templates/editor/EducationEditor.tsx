import { useFormContext } from "react-hook-form";

import { Stack, TextField, Typography } from "@mui/material";

import type { EducationData } from "@/types/resume.types";

export const EducationEditor = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<EducationData>();

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Education</Typography>

      <TextField
        label="study duration"
        fullWidth
        {...register("years", {
          required: "Duration is required",
        })}
        error={!!errors.years}
        helperText={errors.years?.message}
      />

      <TextField
        label="qualification"
        fullWidth
        {...register("qualification", {
          required: "Qualification is required",
        })}
        error={!!errors.qualification}
        helperText={errors.qualification?.message}
      />

      <TextField
        label="Institution"
        fullWidth
        {...register("institution", {
          required: "Institution is required",
        })}
        error={!!errors.institution}
        helperText={errors.institution?.message}
      />
    </Stack>
  );
};
