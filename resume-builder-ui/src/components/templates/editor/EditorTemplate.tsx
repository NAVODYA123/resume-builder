import { useState, useEffect } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";

import { Box, Typography, Button } from "@mui/material";

import { PersonalInformation } from "./PersonalInformation";
import { WorkExperienceEditor } from "./WorkExperienceEditor";
import { EducationEditor } from "./EducationEditor";

import { VerticalColumnTemplate } from "../VerticalColumnTemplate";

import type { ResumeData, ResumeSectionOrder } from "@/types/resume.types";
import { defaultResumeData } from "@/types/resume.types";

import { ProfileSummary } from "@/components/molecules/ProfileSummary";
import { ContactInfo } from "@/components/molecules/ContactInfo";

// import { CustomLeftPanelItem } from "@/components/organisms/CustomLeftPanelItem";
import { ResumeSection } from "@/components/organisms/ResumeSection";
import { WorkExperienceContent } from "@/components/organisms/WorkExperienceContent";
import { CustomRightPanelContent } from "@/components/organisms/CustomRightPanelContent";
import { EducationContent } from "@/components/organisms/EducationContent";
import { SortablePreviewSections } from "@/components/organisms/SortablePreviewSections";
import { CustomRightPanelItemEditor } from "./CustomRightPanelItemEditor";
import { CustomLeftPanelItemEditor } from "./CustomLeftPanelItemEditor";
import { CustomLeftPanelContent } from "@/components/organisms/CustomLeftPanelContent";
// import { CustomRightPanelItem } from "@/components/organisms/CustomRightPanelItem";

export const EditorTemplate = () => {
  // Initialize the complete resume form
  const methods = useForm<ResumeData>({
    defaultValues: defaultResumeData,
  });

  const { control, handleSubmit, setValue } = methods;

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

  const sectionOrder = useWatch({
    control,
    name: "sectionOrder",
  });

  const leftSectionOrder = useWatch({
    control,
    name: "leftSectionOrder",
  });

  const renderPreviewSection = (section: ResumeSectionOrder) => {
    switch (section.type) {
      case "workExperience":
        return workExperience?.length > 0 ? (
          <ResumeSection title="Work Experience">
            <WorkExperienceContent experiences={workExperience} />
          </ResumeSection>
        ) : null;

      case "education":
        return education?.length > 0 ? (
          <ResumeSection title="Education">
            <EducationContent educations={education} />
          </ResumeSection>
        ) : null;

      case "customRightPanelItem": {
        const item = customRightPanelItem?.find(
          (item) => item.id === section.id,
        );

        return item ? (
          <ResumeSection title={item.title}>
            <CustomRightPanelContent items={[item]} />
          </ResumeSection>
        ) : null;
      }

      default:
        return null;
    }
  };

  const renderPreviewLeftSection = (section: ResumeSectionOrder) => {
    switch (section.type) {
      case "profileSummary":
        return (
          <ResumeSection title="Profile Summary">
            <ProfileSummary summary={personalInfo?.summary || ""} />
          </ResumeSection>
        );

      case "contactInfo":
        return (
          <ResumeSection title="Contact Information">
            <ContactInfo
              email={personalInfo?.email || ""}
              phone={personalInfo?.phone || ""}
              address={personalInfo?.address || ""}
            />
          </ResumeSection>
        );

      case "customLeftPanelItem": {
        const item = customLeftPanelItem?.find(
          (item) => item.id === section.id,
        );

        return item ? (
          <ResumeSection title={item.title}>
            <CustomLeftPanelContent items={[item]} />
          </ResumeSection>
        ) : null;
      }

      default:
        return null;
    }
  };

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
          }}
        >
          <Typography variant="h5">Resume Editor</Typography>
          <PersonalInformation
            onProfilePictureChange={handleProfilePictureChange}
          />
          <WorkExperienceEditor />
          <EducationEditor />
          <CustomRightPanelItemEditor />
          <CustomLeftPanelItemEditor />

          <Button type="submit" variant="contained">
            Save Resume
          </Button>
        </Box>

        {/* RIGHT COLUMN - LIVE RESUME PREVIEW */}
        <Box sx={{ backgroundColor: "#656161" }}>
          <VerticalColumnTemplate
            name={personalInfo?.fullName || ""}
            title={personalInfo?.jobTitle || ""}
            leftContent={
              <SortablePreviewSections
                sections={leftSectionOrder || []}
                onChange={(updatedSections) => {
                  setValue("leftSectionOrder", updatedSections, {
                    shouldDirty: true,
                  });
                }}
                renderSection={renderPreviewLeftSection}
              />
            }
            rightContent={
              <SortablePreviewSections
                sections={sectionOrder || []}
                onChange={(updatedSections) => {
                  setValue("sectionOrder", updatedSections, {
                    shouldDirty: true,
                  });
                }}
                renderSection={renderPreviewSection}
              />
            }
          />
        </Box>
      </Box>
    </FormProvider>
  );
};
