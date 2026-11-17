import { useFormContext } from "react-hook-form";

import { Button, Stack, TextField, Typography } from "@mui/material";

import type { ResumeData } from "@/types/resume.types";
import { ProfilePicture } from "@/components/molecules/ProfilePicture";

interface PersonalInformationProps {
  onProfilePictureChange: (file: File | null) => void;
}

export const PersonalInformation = ({
  onProfilePictureChange,
}: PersonalInformationProps) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ResumeData>();

  const profilePicture = watch("personalInformation.profilePicture");

  const personalInfoErrors = errors.personalInformation;

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

    setValue("personalInformation.profilePicture", file, {
      shouldDirty: true,
      shouldValidate: true,
    });

    onProfilePictureChange(file);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Personal Information</Typography>

      {/* Profile Picture */}
      <Stack spacing={1}>
        <ProfilePicture profilePicture={profilePicture} />
        {/* <Avatar
          src={
            profilePicture instanceof File
              ? URL.createObjectURL(profilePicture)
              : undefined
          }
          sx={{ width: 80, height: 80 }}
        /> */}

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
        {...register("personalInformation.fullName", {
          required: "Full name is required",
        })}
        error={!!personalInfoErrors?.fullName}
        helperText={personalInfoErrors?.fullName?.message}
      />

      <TextField
        label="Professional Title"
        fullWidth
        {...register("personalInformation.jobTitle")}
      />

      <TextField
        label="Email Address"
        fullWidth
        {...register("personalInformation.email")}
      />

      <TextField
        label="Phone Number"
        fullWidth
        {...register("personalInformation.phone")}
      />

      <TextField
        label="Address"
        fullWidth
        {...register("personalInformation.address")}
      />

      <TextField
        label="Professional Summary"
        multiline
        rows={4}
        fullWidth
        {...register("personalInformation.summary")}
      />

      <TextField
        label="Linkedin"
        fullWidth
        {...register("personalInformation.linkedin")}
      />
    </Stack>
  );
};
