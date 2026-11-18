import { Box } from "@mui/material";

import { CustomRightPanelItem } from "./CustomRightPanelItem";

import type { ResumeData } from "@/types/resume.types";

interface Props {
  items: ResumeData["customRightPanelItem"];
}

export const CustomRightPanelContent = ({ items }: Props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {items?.map((item) => (
        <CustomRightPanelItem
          key={item.id}
          title={item.title}
          subtitle={item.subtitle}
          years={item.years}
          content={item.content}
        />
      ))}
    </Box>
  );
};
