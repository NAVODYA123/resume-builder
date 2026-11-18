import { useFormContext, useFieldArray } from "react-hook-form";

import type {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
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
import { useState } from "react";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import type { Dayjs } from "dayjs";

interface EducationFieldsProps {
  index: number;
  register: UseFormRegister<ResumeData>;
  errors: FieldErrors<ResumeData>;
  onRemove: () => void;
  canRemove: boolean;
  setValue: UseFormSetValue<ResumeData>;
}

export const EducationEditor = () => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Education</Typography>

      {fields.map((field, index) => (
        <Box key={field.id}>
          <EducationFields
            index={index}
            register={register}
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
            years: "",
            qualification: "",
            institution: "",
          })
        }
      >
        + Add Education
      </Button>
    </Stack>
  );
};

// Individual education fields
const EducationFields = ({
  index,
  register,
  errors,
  setValue,
  onRemove,
  canRemove,
}: EducationFieldsProps) => {
  const educationErrors = errors.education?.[index];
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

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
            aria-label="Remove education"
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      )}

      {/* <TextField
        label="Study Duration"
        fullWidth
        {...register(`education.${index}.years`, {
          required: "Duration is required",
        })}
        error={!!educationErrors?.years}
        helperText={educationErrors?.years?.message}
      /> */}
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

                // Update end date if it is earlier than the new start date
                if (endDate && endDate.isBefore(newValue, "month")) {
                  setEndDate(null);
                }

                // Use Present if the existing end date is invalidated
                const validEnd =
                  endDate?.isValid() && !endDate.isBefore(newValue, "month");

                setValue(
                  `education.${index}.years`,
                  `${start} - ${validEnd ? end : "Present"}`,
                  { shouldValidate: true, shouldDirty: true },
                );
              } else {
                setValue(`education.${index}.years`, "");
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
            disabled={!startDate}
            onChange={(newValue) => {
              setEndDate(newValue);

              if (startDate?.isValid()) {
                const start = startDate.format("MMMM YYYY");

                const end = newValue?.isValid()
                  ? newValue.format("MMMM YYYY")
                  : "Present";

                setValue(`education.${index}.years`, `${start} - ${end}`, {
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
        label="Qualification"
        fullWidth
        {...register(`education.${index}.qualification`, {
          required: "Qualification is required",
        })}
        error={!!educationErrors?.qualification}
        helperText={educationErrors?.qualification?.message}
      />

      <TextField
        label="Institution"
        fullWidth
        {...register(`education.${index}.institution`, {
          required: "Institution is required",
        })}
        error={!!educationErrors?.institution}
        helperText={educationErrors?.institution?.message}
      />
    </Stack>
  );
};
