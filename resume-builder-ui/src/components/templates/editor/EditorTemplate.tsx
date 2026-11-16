import { useState, useEffect } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";

import { Box, Typography, Button } from "@mui/material";

import { PersonalInformation } from "./PersonalInformation";
import { WorkExperienceEditor } from "./WorkExperienceEditor";
import { EducationEditor } from "./EducationEditor";

import { VerticalColumnTemplate } from "../VerticalColumnTemplate";

import type { ResumeData } from "@/types/resume.types";
import { defaultResumeData } from "@/types/resume.types";

import { ProfileSummary } from "@/components/molecules/ProfileSummary";
import { ContactInfo } from "@/components/molecules/ContactInfo";

import { WorkExperience } from "@/components/organisms/WorkExpirience";
import { Education } from "@/components/organisms/Education";
import { CustomLeftPanelItem } from "@/components/organisms/CustomLeftPanelItem";
import { CustomRightPanelItem } from "@/components/organisms/CustomRightPanelItem";

export const EditorTemplate = () => {
  // Initialize the complete resume form
  const methods = useForm<ResumeData>({
    defaultValues: defaultResumeData,
  });

  const { control, handleSubmit } = methods;

  // Watch all resume data for live preview
  // const resumeData = useWatch({ control });

  const personalInfo = useWatch<ResumeData, "personalInformation">({
    control,
    name: "personalInformation",
  });

  const workExperience = useWatch<ResumeData, "workExperience">({
    control,
    name: "workExperience",
  });

  const education = useWatch<ResumeData, "education">({
    control,
    name: "education",
  });

  const customLeftPanelItem = useWatch<ResumeData, "customLeftPanelItem">({
    control,
    name: "customLeftPanelItem",
  });

  const customRightPanelItem = useWatch<ResumeData, "customRightPanelItem">({
    control,
    name: "customRightPanelItem",
  });

  // Profile picture preview
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

  // Clean up image preview URL
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Submit complete resume
  const onSubmit = (data: ResumeData) => {
    console.log("Complete Resume:", data);
  };

  // const personalInfo = resumeData.personalInformation;

  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "30% 70%",
          gap: 3,
          p: 2,
          alignItems: "start",
        }}
      >
        {/* LEFT COLUMN - EDITOR */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            // width: "40%",
          }}
        >
          <Typography variant="h5">Resume Editor</Typography>

          <PersonalInformation
            onProfilePictureChange={handleProfilePictureChange}
          />

          <WorkExperienceEditor />

          <EducationEditor />

          <Button type="submit" variant="contained">
            Save Resume
          </Button>
        </Box>

        {/* RIGHT COLUMN - LIVE RESUME PREVIEW */}
        <Box
        // sx={{ width: "60%" }}
        >
          <VerticalColumnTemplate
            name={personalInfo?.fullName || ""}
            title={personalInfo?.jobTitle || ""}
            leftContent={
              <Box>
                <ProfileSummary summary={personalInfo?.summary || ""} />
                <ContactInfo
                  email={personalInfo?.email || ""}
                  phone={personalInfo?.phone || ""}
                  address={personalInfo?.address || ""}
                />
                {/* MULTIPLE CUSTOM LEFT PANEL LISTS */}
                {customLeftPanelItem &&
                  customLeftPanelItem?.map((item, index) => (
                    <CustomLeftPanelItem
                      key={index}
                      title={item.title}
                      items={item.items}
                    />
                  ))}
              </Box>
            }
            rightContent={
              <Box>
                {/* MULTIPLE WORK EXPERIENCES */}
                {workExperience?.map((experience) => (
                  <WorkExperience
                    key={experience.id}
                    years={experience.years}
                    company={experience.company}
                    position={experience.position}
                    description={experience.description}
                    techStack={experience.techstack.join(", ")}
                  />
                ))}

                {/* MULTIPLE EDUCATION ENTRIES */}
                {education?.map((item) => (
                  <Education
                    key={item.id}
                    qualification={item.qualification}
                    institution={item.institution}
                    years={item.years}
                  />
                ))}
                {/* MULTIPLE CUSTOM RIGHT PANEL ITEMS */}
                {customRightPanelItem &&
                  customRightPanelItem?.map((item, index) => (
                    <CustomRightPanelItem
                      key={index}
                      title={item.title}
                      subtitle={item.subtitle}
                      years={item.years}
                      content={item.content}
                    />
                  ))}
              </Box>
            }
          />
        </Box>
      </Box>
    </FormProvider>
  );
};
