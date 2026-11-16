import { Box, Divider, Typography } from "@mui/material";

type ContactInfoProps = {
  email: string;
  phone: string;
  address: string;
};

export const ContactInfo = (props: ContactInfoProps) => {
  return (
    <Box>
      <Typography variant="h6">Contact</Typography>
      <Divider sx={{ marginY: 1 }} />
      <Typography variant="body2"> {props.email}</Typography>
      <Typography variant="body2"> {props.phone}</Typography>
      <Typography variant="body2"> {props.address}</Typography>
    </Box>
  );
};
