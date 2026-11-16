import { useFormContext } from "react-hook-form";

import { Avatar, Button, Stack, TextField, Typography } from "@mui/material";

import type { ResumeData } from "@/types/resume.types";

interface PersonalInformationProps {
  onProfilePictureChange: (file: File | null) => void;
}

export const PersonalInformation = ({
  onProfilePictureChange,
}: PersonalInformationProps) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeData>();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be less than 2MB.");
      event.target.value = "";
      return;
    }

    setValue("profilePicture", file, {
      shouldDirty: true,
      shouldValidate: true,
    });

    onProfilePictureChange(file);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Personal Information</Typography>

      {/* Profile Picture */}
      <Stack>
        <Avatar sx={{ width: 80, height: 80 }} />

        <Button component="label" variant="outlined">
          Upload Picture
          <input
            type="file"
            hidden
            accept="image/png,image/jpeg,image/webp"
            onChange={handleImageChange}
          />
        </Button>
      </Stack>

      <TextField
        label="Full Name"
        fullWidth
        {...register("fullName", {
          required: "Full name is required",
        })}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
      />

      <TextField
        label="Professional Title"
        fullWidth
        {...register("jobTitle")}
      />

      <TextField label="Email Address" fullWidth {...register("email")} />

      <TextField label="Phone Number" fullWidth {...register("phone")} />

      <TextField label="Address" fullWidth {...register("address")} />

      <TextField
        label="Professional Summary"
        multiline
        rows={4}
        fullWidth
        {...register("summary")}
      />
    </Stack>
  );
};
