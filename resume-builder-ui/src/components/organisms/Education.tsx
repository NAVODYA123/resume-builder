import { Box, Typography } from "@mui/material";

import type { ResumeData } from "@/types/resume.types";

interface EducationProps {
  education: ResumeData["education"];
}

export const Education = ({ education }: EducationProps) => {
  return (
    <Box>
      {education.map((item) => (
        <Box
          key={item.id}
          sx={{
            mb: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {item.qualification && item.institution && (
            <Typography variant="body2">
              {item.qualification} - {item.institution} - {item.years}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};
