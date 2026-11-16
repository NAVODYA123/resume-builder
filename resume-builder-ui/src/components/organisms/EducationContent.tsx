import { Box } from "@mui/material";

import { Education } from "./Education";

import type { ResumeData } from "@/types/resume.types";

interface Props {
  educations: ResumeData["education"];
}

export const EducationContent = ({ educations }: Props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {educations.map((item) => (
        <Education key={item.id} education={[item]} />
      ))}
    </Box>
  );
};
