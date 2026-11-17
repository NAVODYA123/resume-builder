import { Box, Typography } from "@mui/material";

type Props = {
  name: string;
  title: string;
};

export const TitleBar = ({ name, title }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        padding: 2,
        width: "80%",
        position: "relative",
        zIndex: -9,
        top: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 2,
          width: "100%",
          justifyContent: "center",
          backgroundColor: "#9dc3e0",
          pl: "150px",
          paddingBlock: "32px",
        }}
      >
        <Typography variant="h4">{name}</Typography>
        <Typography variant="h5">{title}</Typography>
      </Box>
    </Box>
  );
};
