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
      <Typography variant="h3" component="h2">
        {props.company} - {props.position}
      </Typography>
      <Typography variant="h4" component="h3">
        {props.years}
      </Typography>
      {props.techStack && (
        <Typography variant="body2">Tech Stack: {props.techStack}</Typography>
      )}
      <Typography variant="body1">
        {Array.isArray(props.description) && (
          <ul>
            {props.description.map((desc, index) => (
              <li key={index}>
                {desc.duration && (
                  <Typography variant="body2" color="text.secondary">
                    {desc.duration}
                  </Typography>
                )}
                <Typography variant="h5">{desc.projectName}</Typography>
                <Typography variant="body2">
                  {desc.projectDescription}
                </Typography>
              </li>
            ))}
          </ul>
        )}
      </Typography>
    </Box>
  );
};
