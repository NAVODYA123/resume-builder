import { Box, Divider, Typography } from "@mui/material";

type ProfileSummaryProps = {
  summary: string;
};
export const ProfileSummary = (props: ProfileSummaryProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography variant="h6">Profile</Typography>
      <Divider sx={{ marginY: 1 }} />
      <Typography variant="body2">{props.summary}</Typography>
    </Box>
  );
};
