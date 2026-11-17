import { Box, Typography } from "@mui/material";

type ContactInfoProps = {
  email: string;
  phone: string;
  address: string;
};

export const ContactInfo = (props: ContactInfoProps) => {
  return (
    <Box>
      <Typography variant="body2"> {props.email}</Typography>
      <Typography variant="body2"> {props.phone}</Typography>
      <Typography variant="body2"> {props.address}</Typography>
    </Box>
  );
};
