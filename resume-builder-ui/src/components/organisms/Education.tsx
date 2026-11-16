import { Box, Typography } from "@mui/material";

import type { ResumeData } from "@/types/resume.types";

interface EducationProps {
  education: ResumeData["education"];
}

export const Education = ({ education }: EducationProps) => {
  return (
    <Box>
      {education.map((item) => (
        <Box key={item.id} sx={{ mb: 2 }}>
          {item.qualification && <Typography>{item.qualification}</Typography>}

          {item.institution && <Typography>{item.institution}</Typography>}

          {item.years && <Typography variant="body2">{item.years}</Typography>}
        </Box>
      ))}
    </Box>
  );
};
