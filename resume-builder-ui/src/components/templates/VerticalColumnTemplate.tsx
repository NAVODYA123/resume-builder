import { Box, Paper } from "@mui/material";
import { TitleBar } from "../molecules/TitleBar";
import { ProfilePicture } from "../molecules/ProfilePicture";

type VerticalColumnTemplateProps = {
  name: string;
  title: string;
  profilePicture: File | null;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  isFirstPage?: boolean;
};

export const VerticalColumnTemplate = ({
  name = "test",
  title = "test",
  profilePicture,
  leftContent,
  rightContent,
  isFirstPage = false,
}: VerticalColumnTemplateProps) => {
  return (
    <Paper
      elevation={4}
      sx={{
        width: "210mm",
        height: "297mm",
        margin: "auto",
        position: "relative",
        overflow: "hidden",
        borderRadius: 0,
        backgroundColor: "#ffffff",
        mb: 3,
      }}
    >
      {/* Header */}
      {isFirstPage && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            left: 16,
            right: 16,
            justifyContent: "flex-end",
            zIndex: 10,
            top: "30px",
          }}
        >
          <Box sx={{ position: "absolute", left: 10, top: 0 }}>
            <ProfilePicture profilePicture={profilePicture} />
          </Box>

          <TitleBar name={name} title={title} />
        </Box>
      )}

      {/* Columns */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          minHeight: "297mm",
        }}
      >
        {/* Left Column */}
        <Box
          sx={{
            width: "30%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "#163853",
            pt: isFirstPage ? "250px" : "30px",
            px: "20px",
            pb: 3,

            "& *": {
              color: "#ffffff",
            },

            "& .MuiDivider-root": {
              borderColor: "#ffffff",
              borderBottomWidth: "2px",
            },
          }}
        >
          {leftContent}
        </Box>

        {/* Right Column */}
        <Box
          // sx={{
          //   width: "70%",
          //   boxSizing: "border-box",
          //   backgroundColor: "#ffffff",
          //   pt: isFirstPage ? "250px" : "30px",
          //   px: "20px",
          //   pb: 3,

          //   "& .MuiTypography-h6": {
          //     color: "#163853",
          //   },

          //   "& .MuiDivider-root": {
          //     borderColor: "#163853",
          //     borderBottomWidth: "2px",
          //   },

          //   "& .resume-company-position": {
          //     color: "#235f8e",
          //   },
          // }}
          sx={{
            width: "70%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            backgroundColor: "#ffffff",
            pt: isFirstPage ? "250px" : "30px",
            px: "20px",
            pb: 3,

            "& .MuiTypography-h6": {
              color: "#163853",
            },

            "& .MuiDivider-root": {
              borderColor: "#163853",
              borderBottomWidth: "2px",
            },

            "& .resume-company-position": {
              color: "#235f8e",
            },
          }}
        >
          {rightContent}
        </Box>
      </Box>
    </Paper>
  );
};
