import { useFormContext, useFieldArray } from "react-hook-form";

import type { UseFormRegister, FieldErrors } from "react-hook-form";

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

interface EducationFieldsProps {
  index: number;
  register: UseFormRegister<ResumeData>;
  errors: FieldErrors<ResumeData>;
  onRemove: () => void;
  canRemove: boolean;
}

export const EducationEditor = () => {
  const {
    register,
    control,
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
  onRemove,
  canRemove,
}: EducationFieldsProps) => {
  const educationErrors = errors.education?.[index];

  return (
    <Stack spacing={2}>
      {canRemove && (
        <Stack>
          <IconButton
            color="error"
            onClick={onRemove}
            aria-label="Remove education"
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      )}

      <TextField
        label="Study Duration"
        fullWidth
        {...register(`education.${index}.years`, {
          required: "Duration is required",
        })}
        error={!!educationErrors?.years}
        helperText={educationErrors?.years?.message}
      />

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
