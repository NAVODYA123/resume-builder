import { Box, Divider, Typography } from "@mui/material";

type EducationProps = {
  qualification: string;
  institution: string;
  years: string;
};

export const Education = (props: EducationProps) => {
  return (
    <Box>
      <Typography variant="h6"> Education</Typography>
      <Divider sx={{ marginY: 1 }} />
      {props.qualification && props.institution && props.years && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="body2">{props.qualification}</Typography>-
          <Typography variant="body2">{props.institution}</Typography>-
          <Typography variant="body2">{props.years}</Typography>
        </Box>
      )}
    </Box>
  );
};
