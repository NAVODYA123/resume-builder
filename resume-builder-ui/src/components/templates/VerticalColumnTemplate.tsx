import { Box } from "@mui/material";
import { TitleBar } from "../molecules/TitleBar";
import { ProfilePicture } from "../molecules/ProfilePicture";

type VerticalColumnTemplateProps = {
  name: string;
  title: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
};
export const VerticalColumnTemplate = ({
  name = "test",
  title = "test",
  leftContent,
  rightContent,
}: VerticalColumnTemplateProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ProfilePicture />
        <TitleBar name={name} title={title} />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", gap: 2, padding: 2 }}>
        <Box
          sx={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {leftContent}
        </Box>

        <Box sx={{ width: "70%" }}>{rightContent}</Box>
      </Box>
    </Box>
  );
};
