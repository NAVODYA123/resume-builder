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
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 2,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4">{name}</Typography>
        <Typography variant="h5">{title}</Typography>
      </Box>
    </Box>
  );
};
