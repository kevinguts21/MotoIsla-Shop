import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingOverlay = ({ showBlurLoading }) => (
  showBlurLoading && (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1300,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(5px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress sx={{ color: "#fff" }} />
    </Box>
  )
);

export default LoadingOverlay;
