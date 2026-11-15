import { useState } from "react";

import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";

function App() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({
      fullName,
      email,
    });
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Navos Resume Builder
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
          />

          <TextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />

          <Button type="submit" variant="contained">
            Save Resume
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

// export default App;
// function App() {
//   return (
//     <div
//       style={{
//         padding: "30px",
//         background: "#e8f5e9",
//         color: "#1b5e20",
//       }}
//     >
//       <h1>React is working!</h1>
//       <p>Navos Resume Builder successfully loaded.</p>
//     </div>
//   );
// }

export default App;
