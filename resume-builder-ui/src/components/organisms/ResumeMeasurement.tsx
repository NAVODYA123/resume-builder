import { Box } from "@mui/material";
import type { ReactNode, RefObject } from "react";
import type { ResumeSectionOrder } from "@/types/resume.types";

interface ResumeMeasurementProps {
  sections: ResumeSectionOrder[];
  renderSection: (section: ResumeSectionOrder) => ReactNode;
  column: "left" | "right";
  containerRef: RefObject<HTMLDivElement | null>;
}

export const ResumeMeasurement = ({
  sections,
  renderSection,
  column,
  containerRef,
}: ResumeMeasurementProps) => {
  const isLeft = column === "left";

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "absolute",
        left: "-10000px",
        top: 0,
        width: isLeft ? "198px" : "516px",
        visibility: "hidden",
        pointerEvents: "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: isLeft ? 2 : 3,
          width: "100%",
          boxSizing: "border-box",

          "& *": isLeft ? { color: "#ffffff" } : {},

          "& .MuiTypography-h6": isLeft ? {} : { color: "#163853" },

          "& .MuiDivider-root": {
            borderColor: isLeft ? "#ffffff" : "#163853",
            borderBottomWidth: "2px",
          },

          "& .resume-company-position": {
            color: "#235f8e",
          },
        }}
      >
        {sections.map((section) => (
          <Box key={section.id} data-section-id={section.id}>
            {renderSection(section)}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
