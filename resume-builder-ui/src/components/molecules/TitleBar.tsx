import { Box, Typography } from "@mui/material";

type Props = {
  name: string;
  title: string;
};

export const TitleBar = ({ name, title }: Props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}>
      <Typography variant="h2" component="h1">
        {name}
      </Typography>
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
    </Box>
  );
};
