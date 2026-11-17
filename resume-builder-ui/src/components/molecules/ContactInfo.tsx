import { Box, Typography } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CallIcon from "@mui/icons-material/Call";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import HomeIcon from "@mui/icons-material/Home";

type ContactInfoProps = {
  email: string;
  phone: string;
  address: string;
  linkedin: string;
};

export const ContactInfo = (props: ContactInfoProps) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "start",
        }}
      >
        <EmailOutlinedIcon sx={{ padding: "10px" }} />
        <Typography
          sx={{
            flex: 1,
            minWidth: 0,
            overflowWrap: "anywhere",
            paddingBlock: "10px",
          }}
          variant="body2"
        >
          {" "}
          {props.email}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "start",
        }}
      >
        <CallIcon sx={{ padding: "10px" }} />
        <Typography
          sx={{
            flex: 1,
            minWidth: 0,
            overflowWrap: "anywhere",
            paddingBlock: "10px",
          }}
          variant="body2"
        >
          {" "}
          {props.phone}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "start",
        }}
      >
        <HomeIcon sx={{ padding: "10px" }} />
        <Typography
          sx={{
            flex: 1,
            minWidth: 0,
            overflowWrap: "anywhere",
            paddingBlock: "10px",
          }}
          variant="body2"
        >
          {" "}
          {props.address}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "start",
        }}
      >
        <LinkedInIcon sx={{ padding: "10px" }} />
        <Typography
          sx={{
            flex: 1,
            minWidth: 0,
            overflowWrap: "anywhere",
            paddingBlock: "10px",
          }}
          variant="body2"
        >
          {" "}
          {props.linkedin}
        </Typography>
      </Box>
    </Box>
  );
};
