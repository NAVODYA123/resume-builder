import { useRef } from "react";
import { Button } from "@mui/material";
import { useReactToPrint } from "react-to-print";

type ResumePDFExportProps = {
  children: React.ReactNode;
};

export const ResumePDFExport = ({ children }: ResumePDFExportProps) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: "My-Resume",
  });

  return (
    <>
      <Button variant="contained" onClick={() => handlePrint()}>
        Export PDF
      </Button>

      <div ref={resumeRef}>{children}</div>
    </>
  );
};
