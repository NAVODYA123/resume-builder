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

export const CustomRightPanelItemEditor = () => {
  const {
    register,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "customRightPanelItem",
  });

  // Add custom right panel item
  const handleAdd = () => {
    const newItem = {
      id: generateId(),
      title: "",
      subtitle: "",
      years: "",
      content: "",
    };

    append(newItem);

    const currentOrder = getValues("sectionOrder") || [];

    setValue(
      "sectionOrder",
      [
        ...currentOrder,
        {
          id: newItem.id,
          type: "customRightPanelItem",
        },
      ],
      { shouldDirty: true },
    );
  };

  // Remove custom right panel item
  const handleRemove = (index: number) => {
    const items = getValues("customRightPanelItem") || [];
    const itemToRemove = items[index];

    remove(index);

    const currentOrder = getValues("sectionOrder") || [];

    setValue(
      "sectionOrder",
      currentOrder.filter((section) => section.id !== itemToRemove?.id),
      { shouldDirty: true },
    );
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Custom Right Panel Items</Typography>

      {fields.map((field, index) => (
        <Box key={field.id}>
          <EducationFields
            index={index}
            register={register}
            errors={errors}
            onRemove={() => handleRemove(index)}
            canRemove={fields.length > 1}
          />

          {index !== fields.length - 1 && <Divider sx={{ my: 3 }} />}
        </Box>
      ))}

      <Button variant="outlined" onClick={handleAdd}>
        + Add Custom Right Panel Item
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
  const customRightPanelItemErrors = errors.customRightPanelItem?.[index];

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
            aria-label="Remove custom right panel item"
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      )}

      <TextField
        label="Title"
        fullWidth
        {...register(`customRightPanelItem.${index}.title`, {
          required: "Title is required",
        })}
        error={!!customRightPanelItemErrors?.title}
        helperText={customRightPanelItemErrors?.title?.message}
      />

      <TextField
        label="Subtitle"
        fullWidth
        {...register(`customRightPanelItem.${index}.subtitle`, {
          required: "Subtitle is required",
        })}
        error={!!customRightPanelItemErrors?.subtitle}
        helperText={customRightPanelItemErrors?.subtitle?.message}
      />

      <TextField
        label="years"
        fullWidth
        {...register(`customRightPanelItem.${index}.years`, {
          required: "Duration is required",
        })}
        error={!!customRightPanelItemErrors?.years}
        helperText={customRightPanelItemErrors?.years?.message}
      />

      <TextField
        label="content"
        fullWidth
        {...register(`customRightPanelItem.${index}.content`, {
          required: "Content is required",
        })}
        error={!!customRightPanelItemErrors?.content}
        helperText={customRightPanelItemErrors?.content?.message}
      />
    </Stack>
  );
};
