import { useState } from "react";

import { useFormContext, useFieldArray } from "react-hook-form";

import type {
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

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import type { Dayjs } from "dayjs";

import type { ResumeData } from "@/types/resume.types";
import { generateId } from "@/utils/generateId";

interface CustomRightPanelItemEditorFieldsProps {
  index: number;
  register: UseFormRegister<ResumeData>;
  setValue: UseFormSetValue<ResumeData>;
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
          <CustomRightPanelItemEditorFields
            index={index}
            register={register}
            setValue={setValue}
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

// Individual CustomRightPanelItemEditor fields
const CustomRightPanelItemEditorFields = ({
  index,
  register,
  setValue,
  errors,
  onRemove,
  canRemove,
}: CustomRightPanelItemEditorFieldsProps) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

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

                const validEnd =
                  endDate?.isValid() && !endDate.isBefore(newValue, "month");

                if (endDate && !validEnd) {
                  setEndDate(null);
                }

                const end = validEnd ? endDate?.format("MMMM YYYY") : "Present";

                setValue(
                  `customRightPanelItem.${index}.years`,
                  `${start} - ${end}`,
                  {
                    shouldValidate: true,
                    shouldDirty: true,
                  },
                );
              } else {
                setValue(`customRightPanelItem.${index}.years`, "", {
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
            disabled={!startDate}
            onChange={(newValue) => {
              setEndDate(newValue);

              if (startDate?.isValid()) {
                const start = startDate.format("MMMM YYYY");

                const end = newValue?.isValid()
                  ? newValue.format("MMMM YYYY")
                  : "Present";

                setValue(
                  `customRightPanelItem.${index}.years`,
                  `${start} - ${end}`,
                  {
                    shouldValidate: true,
                    shouldDirty: true,
                  },
                );
              }
            }}
            slotProps={{
              textField: { fullWidth: true },
            }}
          />
        </Stack>
      </LocalizationProvider>

      <TextField
        label="Content"
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
