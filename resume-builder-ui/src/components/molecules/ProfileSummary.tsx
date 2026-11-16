import { Box, Typography } from "@mui/material";

type ProfileSummaryProps = {
  summary: string;
};
export const ProfileSummary = (props: ProfileSummaryProps) => {
  return (
    <Box>
      <Typography variant="h3" component="h2">
        {props.summary}
      </Typography>
    </Box>
  );
};
