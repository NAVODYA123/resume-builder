import { Box, Typography } from "@mui/material";

type CustomLeftPanelListProps = {
  key: string | number;
  title: string;
  items: string[];
};

export const CustomLeftPanelItem = (props: CustomLeftPanelListProps) => {
  return (
    <Box>
      <ul>
        {props.items.map((item, index) => (
          <li key={index}>
            <Typography variant="body2">{item}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
};
