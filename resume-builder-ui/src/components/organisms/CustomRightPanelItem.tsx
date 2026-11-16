import { Box, Typography } from "@mui/material";

export const CustomRightPanelItem = (props: {
  title: string;
  subtitle?: string;
  years?: string;
  content: string | string[];
}) => {
  return (
    <Box>
      <Typography variant="h5">{props.title}</Typography>
      {props.years && (
        <Typography variant="body2" color="text.secondary">
          {props.years}
        </Typography>
      )}
      {props.subtitle && (
        <Typography variant="body2" color="text.secondary">
          {props.subtitle}
        </Typography>
      )}
      {Array.isArray(props.content) ? (
        <ul>
          {props.content.map((item, index) => (
            <li key={index}>
              <Typography variant="body2">{item}</Typography>
            </li>
          ))}
        </ul>
      ) : (
        <Typography variant="body2">{props.content}</Typography>
      )}
    </Box>
  );
};
