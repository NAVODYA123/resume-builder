import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

type IconWithTextProps = {
  icon: ReactNode;
  text: string;
};

export const IconWithText = ({ icon, text }: IconWithTextProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <Box sx={{ padding: "10px" }}>{icon}</Box>

      <Typography
        variant="body2"
        sx={{
          flex: 1,
          minWidth: 0,
          overflowWrap: "anywhere",
          paddingBlock: "10px",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};
