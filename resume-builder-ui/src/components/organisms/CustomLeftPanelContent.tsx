import { Box } from "@mui/material";

import type { ResumeData } from "@/types/resume.types";
import { CustomLeftPanelItem } from "./CustomLeftPanelItem";

interface Props {
  items: ResumeData["customLeftPanelItem"];
}

export const CustomLeftPanelContent = ({ items }: Props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {items?.map((item, index) => (
        <CustomLeftPanelItem
          key={index}
          title={item.title}
          items={item.items}
        />
      ))}
    </Box>
  );
};
