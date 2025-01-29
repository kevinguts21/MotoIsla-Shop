import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowButton(scrollPosition > 100); // Muestra el botón cuando el usuario ha hecho scroll hacia abajo.
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    showButton && (
      <Box
        sx={{
          position: "fixed",
          bottom: { xs: "50px", sm: "70px" }, // Más alto que antes
          right: { xs: "20px", sm: "30px" }, // Ajuste según pantallas pequeñas y grandes
          zIndex: 10,
          backgroundColor: "#DF0209",
          padding: "8px",
          borderRadius: "50%",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",

          "&:focus": {
            outline: "none",
            boxShadow: "none",
          },
        }}
        onClick={scrollToTop}
      >
        <IconButton sx={{ color: "white" }}>
          <KeyboardArrowUpIcon />
        </IconButton>
      </Box>
    )
  );
};

export default ScrollToTopButton;
