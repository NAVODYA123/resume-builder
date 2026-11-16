// import { useState } from "react";
// import { Box, Typography } from "@mui/material";

// import { PersonalInformationForm } from "@/components/templates/editor/PersonalInformation";
// import type { ResumeData } from "./types/resume.types";
import { Box } from "@mui/material";
import { EditorTemplate } from "./components/templates/editor/EditorTemplate";

function App() {
  // const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  // const handlePersonalInfoSubmit = (data: ResumeData) => {
  //   setResumeData(data);

  //   console.log("Resume Data:", data);
  // };

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <EditorTemplate />
    </Box>
  );
}

export default App;
