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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

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
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

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
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
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

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction="row" spacing={2}>
          <DatePicker
            label="Start Date"
            views={["month", "year"]}
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);

              if (newValue?.isValid()) {
                const start = newValue.format("MMMM YYYY");

                const end = endDate?.isValid()
                  ? endDate.format("MMMM YYYY")
                  : "Present";

                setValue(`workExperience.${index}.years`, `${start} - ${end}`, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }
            }}
            slotProps={{
              textField: { fullWidth: true },
            }}
          />

          <DatePicker
            label="End Date"
            views={["month", "year"]}
            value={endDate}
            minDate={startDate ?? undefined}
            onChange={(newValue) => {
              setEndDate(newValue);

              if (startDate?.isValid()) {
                const start = startDate.format("MMMM YYYY");

                const end = newValue?.isValid()
                  ? newValue.format("MMMM YYYY")
                  : "Present";

                setValue(`workExperience.${index}.years`, `${start} - ${end}`, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }
            }}
            slotProps={{
              textField: { fullWidth: true },
            }}
          />
        </Stack>
      </LocalizationProvider>

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
