import { Box } from "@mui/material";

import { WorkExperience } from "./WorkExperience";

import type { ResumeData } from "@/types/resume.types";

interface Props {
  experiences: ResumeData["workExperience"];
}

export const WorkExperienceContent = ({ experiences }: Props) => {
  return (
    <Box>
      {experiences.map((experience) => (
        <WorkExperience
          key={experience.id}
          years={experience.years}
          company={experience.company}
          position={experience.position}
          description={experience.description}
          techStack={experience.techstack.join(", ")}
        />
      ))}
    </Box>
  );
};
