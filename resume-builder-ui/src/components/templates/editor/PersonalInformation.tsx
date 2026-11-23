import { Controller, useFormContext } from "react-hook-form";

import { Button, Stack, TextField, Typography } from "@mui/material";

import type { ResumeData } from "@/types/resume.types";
import { ProfilePicture } from "@/components/molecules/ProfilePicture";
import { PhoneInput } from "@/components/molecules/PhoneInput";

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
    control,
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
        error={!!personalInfoErrors?.jobTitle}
        helperText={personalInfoErrors?.jobTitle?.message}
      />
      <TextField
        label="Email Address"
        fullWidth
        {...register("personalInformation.email")}
        error={!!personalInfoErrors?.email}
        helperText={personalInfoErrors?.email?.message}
      />

      {/* Phone Number */}
      <Controller
        name="personalInformation.phone"
        control={control}
        rules={{
          validate: (value) =>
            value?.number?.trim() || "Phone number is required",
        }}
        render={({ field, fieldState }) => (
          <Stack spacing={0.5}>
            <PhoneInput
              country={field.value?.country ?? null}
              phone={field.value?.number ?? ""}
              onCountryChange={(country) =>
                field.onChange({ ...field.value, country })
              }
              onPhoneChange={(number) =>
                field.onChange({ ...field.value, number })
              }
            />

            {fieldState.error && (
              <Typography variant="caption" color="error">
                {fieldState.error.message}
              </Typography>
            )}
          </Stack>
        )}
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
