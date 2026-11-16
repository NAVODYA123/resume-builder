import { useEffect, useState } from "react";

import { useFormContext, useWatch, useFieldArray } from "react-hook-form";

import type {
  Control,
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";

import {
  Stack,
  TextField,
  Typography,
  Button,
  IconButton,
  Divider,
  Box,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import type { ResumeData } from "@/types/resume.types";
import { generateId } from "@/utils/generateId";

// Type-safe props
interface WorkExperienceFieldsProps {
  index: number;
  control: Control<ResumeData>;
  register: UseFormRegister<ResumeData>;
  setValue: UseFormSetValue<ResumeData>;
  errors: FieldErrors<ResumeData>;
  onRemove: () => void;
  canRemove: boolean;
}

export const WorkExperienceEditor = () => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "workExperience",
  });

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Work Experience</Typography>

      {fields.map((field, index) => (
        <Box key={field.id}>
          <WorkExperienceFields
            index={index}
            register={register}
            control={control}
            setValue={setValue}
            errors={errors}
            onRemove={() => remove(index)}
            canRemove={fields.length > 1}
          />

          {index !== fields.length - 1 && <Divider sx={{ my: 3 }} />}
        </Box>
      ))}

      <Button
        variant="outlined"
        onClick={() =>
          append({
            id: generateId(),
            position: "",
            company: "",
            description: [
              {
                projectName: "",
                projectDescription: "",
              },
            ],
            years: "",
            techstack: [],
          })
        }
      >
        + Add Work Experience
      </Button>
    </Stack>
  );
};

// Individual work experience fields
const WorkExperienceFields = ({
  index,
  register,
  control,
  setValue,
  errors,
  onRemove,
  canRemove,
}: WorkExperienceFieldsProps) => {
  const [techStackInput, setTechStackInput] = useState("");

  const techStack = useWatch({
    control,
    name: `workExperience.${index}.techstack` as const,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTechStackInput((techStack || []).join(", "));
  }, [techStack]);

  const workExperienceErrors = errors.workExperience?.[index];

  return (
    <Stack spacing={2}>
      {canRemove && (
        <Stack>
          <IconButton
            color="error"
            onClick={onRemove}
            aria-label="Remove work experience"
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      )}

      <TextField
        label="Position"
        fullWidth
        {...register(`workExperience.${index}.position`, {
          required: "Professional title is required",
        })}
        error={!!workExperienceErrors?.position}
        helperText={workExperienceErrors?.position?.message}
      />

      <TextField
        label="Company"
        fullWidth
        {...register(`workExperience.${index}.company`)}
      />

      <TextField
        label="Project Name"
        fullWidth
        {...register(`workExperience.${index}.description.0.projectName`)}
      />

      <TextField
        label="Project Description"
        fullWidth
        {...register(
          `workExperience.${index}.description.0.projectDescription`,
        )}
      />

      <TextField
        label="Work Duration"
        fullWidth
        {...register(`workExperience.${index}.years`, {
          required: "Duration is required",
        })}
        error={!!workExperienceErrors?.years}
        helperText={workExperienceErrors?.years?.message}
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

          setValue(`workExperience.${index}.techstack`, techStackArray);
        }}
        helperText="Separate technologies with commas (e.g. React, TypeScript, Next.js)"
      />
    </Stack>
  );
};
