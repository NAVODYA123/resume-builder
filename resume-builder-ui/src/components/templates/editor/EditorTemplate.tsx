import { useState, useEffect, useRef } from "react";
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

import { ResumeSection } from "@/components/organisms/ResumeSection";
import { WorkExperienceContent } from "@/components/organisms/WorkExperienceContent";
import { CustomRightPanelContent } from "@/components/organisms/CustomRightPanelContent";
import { EducationContent } from "@/components/organisms/EducationContent";
import { SortablePreviewSections } from "@/components/organisms/SortablePreviewSections";
import { CustomRightPanelItemEditor } from "./CustomRightPanelItemEditor";
import { CustomLeftPanelItemEditor } from "./CustomLeftPanelItemEditor";
import { CustomLeftPanelContent } from "@/components/organisms/CustomLeftPanelContent";
import { usePaginatedSections } from "@/hooks/usePaginatedSections";
import { useSectionMeasurements } from "@/hooks/useSectionMeasurements";
import { ResumeMeasurement } from "@/components/organisms/ResumeMeasurement";

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

  // Refs for the hidden measurement containers
  const leftMeasurementRef = useRef<HTMLDivElement>(null);
  const rightMeasurementRef = useRef<HTMLDivElement>(null);

  // Re-measure when the section IDs change.
  const leftMeasurementDependency =
    leftSectionOrder?.map((section) => section.id).join("|") ?? "";

  const rightMeasurementDependency =
    sectionOrder?.map((section) => section.id).join("|") ?? "";

  // Measure left and right sections independently
  const leftSectionHeights = useSectionMeasurements({
    containerRef: leftMeasurementRef,
    dependency: leftMeasurementDependency,
  });

  const rightSectionHeights = useSectionMeasurements({
    containerRef: rightMeasurementRef,
    dependency: rightMeasurementDependency,
  });

  // Available vertical space inside the A4 pages
  const FIRST_PAGE_HEIGHT = 848;
  const OTHER_PAGE_HEIGHT = 1068;

  // Calculate left-column pages
  const leftPages = usePaginatedSections({
    sections: leftSectionOrder || [],
    sectionHeights: leftSectionHeights,
    firstPageHeight: FIRST_PAGE_HEIGHT,
    pageHeight: OTHER_PAGE_HEIGHT,
    sectionGap: 16,
  });

  // Calculate right-column pages
  const rightPages = usePaginatedSections({
    sections: sectionOrder || [],
    sectionHeights: rightSectionHeights,
    firstPageHeight: FIRST_PAGE_HEIGHT,
    pageHeight: OTHER_PAGE_HEIGHT,
    sectionGap: 24,
  });

  // Use the larger page count so both columns have matching page layouts
  const totalPages = Math.max(1, leftPages.length, rightPages.length);

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
              linkedin={personalInfo?.linkedin || ""}
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

  return (
    <FormProvider {...methods}>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            color="info"
            onClick={() => window.print()}
            sx={{ mt: 2 }}
          >
            Export as PDF
          </Button>
        </Box>

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
              height: "100vh",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                backgroundColor: "#324655",
                color: "white",
                padding: 1.5,
                borderRadius: 1,
                fontWeight: 600,
              }}
            >
              Resume Editor
            </Typography>
            <Box
              sx={{
                overflowY: "auto",
                borderRight: "2px solid #324655",
              }}
            >
              <PersonalInformation
                onProfilePictureChange={handleProfilePictureChange}
              />
              <WorkExperienceEditor />
              <EducationEditor />
              <CustomRightPanelItemEditor />
              <CustomLeftPanelItemEditor />
            </Box>
            <Button type="submit" variant="contained">
              Save Resume
            </Button>
          </Box>

          {/* RIGHT COLUMN - LIVE RESUME PREVIEW */}
          <Box
            className="resume-preview"
            sx={{
              backgroundColor: "#656161",
              position: "relative",
              height: "100vh",
              overflowY: "auto",
            }}
          >
            {/* Hidden left-column measurements */}
            <ResumeMeasurement
              sections={leftSectionOrder || []}
              renderSection={renderPreviewLeftSection}
              column="left"
              containerRef={leftMeasurementRef}
            />

            {/* Hidden right-column measurements */}
            <ResumeMeasurement
              sections={sectionOrder || []}
              renderSection={renderPreviewSection}
              column="right"
              containerRef={rightMeasurementRef}
            />

            {/* Actual resume pages */}
            {Array.from({ length: totalPages }, (_, pageIndex) => (
              <VerticalColumnTemplate
                key={`resume-page-${pageIndex}`}
                name={personalInfo?.fullName || ""}
                title={personalInfo?.jobTitle || ""}
                profilePicture={personalInfo?.profilePicture ?? null}
                isFirstPage={pageIndex === 0}
                leftContent={
                  <SortablePreviewSections
                    sections={leftSectionOrder || []}
                    pages={[leftPages[pageIndex] || []]}
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
                    pages={[rightPages[pageIndex] || []]}
                    onChange={(updatedSections) => {
                      setValue("sectionOrder", updatedSections, {
                        shouldDirty: true,
                      });
                    }}
                    renderSection={renderPreviewSection}
                  />
                }
              />
            ))}
          </Box>
        </Box>
      </Box>
    </FormProvider>
  );
};
