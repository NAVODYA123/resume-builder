import { Avatar, Box } from "@mui/material";

export const ProfilePicture = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          border: "5px solid #951ceb",
        }}
      />
    </Box>
  );
};
