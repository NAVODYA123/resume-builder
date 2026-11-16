import { Box, Typography } from "@mui/material";

type workDescription = {
  projectName: string;
  projectDescription: string;
  duration?: string;
};

type WorkExperienceProps = {
  years: string;
  company: string;
  position: string;
  description: workDescription[];
  techStack?: string;
};

export const WorkExperience = (props: WorkExperienceProps) => {
  return (
    <Box>
      {/* {props.position && props.company && (
        <Box>
          <Typography variant="h6"> Work Experience</Typography>
          <Divider sx={{ marginY: 1 }} />
        </Box>
      )} */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        {props.position && (
          <Typography
            variant="body2"
            sx={{
              fontSize: "18px",
              fontWeight: "600",
              textTransform: "capitalize",
            }}
          >
            {props.company} - {props.position}
          </Typography>
        )}
        {props.years && <Typography variant="body2">{props.years}</Typography>}
      </Box>
      {props.techStack && (
        <Typography variant="body2">Tech Stack: {props.techStack}</Typography>
      )}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {Array.isArray(props.description) && (
          <Box>
            {props.description.map((desc, index) => (
              <Box key={index}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">{desc.projectName}</Typography>
                  {desc.duration && (
                    <Typography variant="body2" color="text.secondary">
                      {desc.duration}
                    </Typography>
                  )}
                </Box>
                <Typography variant="body2">
                  {desc.projectDescription}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};
