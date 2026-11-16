import { Box, Typography } from "@mui/material";

type EducationProps = {
  qualification: string;
  institution: string;
  years: string;
};

export const Education = (props: EducationProps) => {
  return (
    <Box>
      <Typography variant="h3" component="h2">
        {props.qualification}
      </Typography>
      <Typography variant="h4" component="h3">
        {props.institution}
      </Typography>
      <Typography variant="body2">{props.years}</Typography>
    </Box>
  );
};
