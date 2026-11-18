import { Box, Divider, Typography } from "@mui/material";

interface ResumeSectionProps {
  title: string;
  children: React.ReactNode;
}

export const ResumeSection = ({ title, children }: ResumeSectionProps) => {
  return (
    <Box sx={{ mb: 0 }}>
      <Typography variant="h6">{title}</Typography>

      <Divider sx={{ my: 1 }} />

      {children}
    </Box>
  );
};
