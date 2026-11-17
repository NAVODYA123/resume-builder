import { useFormContext, useFieldArray, Controller } from "react-hook-form";

import type { UseFormRegister, FieldErrors } from "react-hook-form";

import {
  Stack,
  TextField,
  Typography,
  Button,
  IconButton,
  Divider,
  Box,
  Autocomplete,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import type { ResumeData } from "@/types/resume.types";
import { generateId } from "@/utils/generateId";

interface CustomLeftPanelItemEditorFieldsProps {
  index: number;
  register: UseFormRegister<ResumeData>;
  errors: FieldErrors<ResumeData>;
  onRemove: () => void;
  canRemove: boolean;
}

export const CustomLeftPanelItemEditor = () => {
  const {
    register,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "customLeftPanelItem",
  });

  // Add custom left panel item
  const handleAdd = () => {
    const newItem = {
      id: generateId(),
      title: "",
      items: [""],
    };

    append(newItem);

    const currentOrder = getValues("leftSectionOrder") || [];

    setValue(
      "leftSectionOrder",
      [
        ...currentOrder,
        {
          id: newItem.id,
          type: "customLeftPanelItem",
        },
      ],
      { shouldDirty: true },
    );
  };

  // Remove custom left panel item
  const handleRemove = (index: number) => {
    const items = getValues("customLeftPanelItem") || [];
    const itemToRemove = items[index];

    remove(index);

    const currentOrder = getValues("leftSectionOrder") || [];

    setValue(
      "leftSectionOrder",
      currentOrder.filter((section) => section.id !== itemToRemove?.id),
      { shouldDirty: true },
    );
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Custom Left Panel Items</Typography>

      {fields.map((field, index) => (
        <Box key={field.id}>
          <CustomLeftPanelItemEditorFields
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
        + Add Custom Left Panel Item
      </Button>
    </Stack>
  );
};

// Individual education fields
const CustomLeftPanelItemEditorFields = ({
  index,
  register,
  errors,
  onRemove,
  canRemove,
}: CustomLeftPanelItemEditorFieldsProps) => {
  const { control } = useFormContext<ResumeData>();
  const customLeftPanelItemErrors = errors.customLeftPanelItem?.[index];

  return (
    <Stack spacing={2}>
      {canRemove && (
        <Stack>
          <IconButton
            color="error"
            onClick={onRemove}
            aria-label="Remove custom left panel item"
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      )}

      <TextField
        label="Title"
        fullWidth
        {...register(`customLeftPanelItem.${index}.title`, {
          required: "Title is required",
        })}
        error={!!customLeftPanelItemErrors?.title}
        helperText={customLeftPanelItemErrors?.title?.message}
      />

      {/* <TextField
        label="Items"
        fullWidth
        {...register(`customLeftPanelItem.${index}.items`, {
          required: "Items is required",
        })}
        error={!!customLeftPanelItemErrors?.items}
        helperText={customLeftPanelItemErrors?.items?.message}
      /> */}

      <Controller
        name={`customLeftPanelItem.${index}.items`}
        control={control}
        rules={{
          validate: (value) =>
            (value?.length ?? 0) > 0 || "At least one item is required",
        }}
        render={({ field, fieldState }) => (
          <Autocomplete
            multiple
            freeSolo
            options={[]}
            value={field.value || []}
            onChange={(_, newValue) => {
              field.onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Items"
                placeholder="Type an item and press Enter"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
              />
            )}
          />
        )}
      />
    </Stack>
  );
};
