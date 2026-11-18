import { Box } from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CallIcon from "@mui/icons-material/Call";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import HomeIcon from "@mui/icons-material/Home";

import { IconWithText } from "@/components/atoms/IconWithText";

type ContactInfoProps = {
  email: string;
  phone: string;
  address: string;
  linkedin: string;
};

export const ContactInfo = (props: ContactInfoProps) => {
  const contactItems = [
    { id: "email", icon: <EmailOutlinedIcon />, text: props.email },
    { id: "phone", icon: <CallIcon />, text: props.phone },
    { id: "address", icon: <HomeIcon />, text: props.address },
    { id: "linkedin", icon: <LinkedInIcon />, text: props.linkedin },
  ];

  return (
    <Box>
      {contactItems.map((item) => (
        <IconWithText key={item.id} icon={item.icon} text={item.text} />
      ))}
    </Box>
  );
};
