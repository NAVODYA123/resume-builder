import { Box, Typography } from "@mui/material";

type ProfileSummaryProps = {
  summary: string;
};
export const ProfileSummary = (props: ProfileSummaryProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography variant="body2">{props.summary}</Typography>
    </Box>
  );
};
