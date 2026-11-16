import { useState } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { Box, Typography, Button } from "@mui/material";

import { PersonalInformation } from "./PersonalInformation";
import { VerticalColumnTemplate } from "../VerticalColumnTemplate";
import type { ResumeData } from "@/types/resume.types";
import { ProfileSummary } from "@/components/molecules/ProfileSummary";

export const EditorTemplate = () => {
  const methods = useForm<ResumeData>({
    defaultValues: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      address: "",
      summary: "",
      profilePicture: null,
    },
  });

  const { control, handleSubmit } = methods;

  const resumeData = useWatch({ control });

  const [imagePreview, setImagePreview] = useState<string>();

  // Handle profile picture selection
  const handleProfilePictureChange = (file: File | null) => {
    setImagePreview((previousUrl) => {
      if (previousUrl) {
        URL.revokeObjectURL(previousUrl);
      }

      return file ? URL.createObjectURL(file) : undefined;
    });
  };

  const onSubmit = (data: ResumeData) => {
    console.log("Complete Resume:", data);
  };
  ///remove after fix
  console.log("Current Resume Data:", imagePreview);

  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "40% 60%",
          gap: 3,
          p: 2,
          alignItems: "start",
        }}
      >
        {/* LEFT COLUMN - INPUT FORMS */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography variant="h5">Resume Editor</Typography>

          <PersonalInformation
            onProfilePictureChange={handleProfilePictureChange}
          />

          <Button type="submit" variant="contained">
            Save Resume
          </Button>
        </Box>

        {/* RIGHT COLUMN - LIVE RESUME PREVIEW */}
        <Box>
          <VerticalColumnTemplate
            name={resumeData.fullName as string}
            title={resumeData.jobTitle as string}
            leftContent={
              <ProfileSummary summary={resumeData.summary as string} />
            }
            rightContent={
              <Box>
                <Typography variant="body2">{resumeData.email}</Typography>
                <Typography variant="body2">{resumeData.phone}</Typography>
                <Typography variant="body2">{resumeData.address}</Typography>
                <Typography variant="body1">{resumeData.summary}</Typography>
              </Box>
            }
          />
        </Box>
      </Box>
    </FormProvider>
  );
};
