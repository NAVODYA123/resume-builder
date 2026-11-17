import { Avatar, Box } from "@mui/material";

interface ProfilePictureProps {
  profilePicture: File | null;
}

export const ProfilePicture = ({ profilePicture }: ProfilePictureProps) => {
  const imageUrl = profilePicture
    ? URL.createObjectURL(profilePicture)
    : undefined;

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
        src={imageUrl}
        sx={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          border: "8px solid #ffffff",
        }}
      />
    </Box>
  );
};
