import React from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const PaginationControls = ({
  currentPage,
  totalPages,
  handleFirstPage,
  handleLastPage,
  handleNextPage,
  handlePreviousPage,
}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 4,
        gap: 2,
      }}
    >
      {isMobile ? (
        // Mobile View
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f9f9f9", // Background color for better contrast
          }}
        >
          <IconButton
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            sx={{
              backgroundColor: currentPage === 1 ? "lightgray" : "red",
              color: "white",
              "&:hover": {
                backgroundColor: currentPage === 1 ? "lightgray" : "darkred",
              },
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            <KeyboardDoubleArrowLeft />
          </IconButton>
          <IconButton
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            sx={{
              backgroundColor: "white",
              color: currentPage === 1 ? "lightgray" : "red",
              border: "1px solid",
              borderColor: currentPage === 1 ? "lightgray" : "red",
              "&:hover": {
                backgroundColor: currentPage === 1 ? "white" : "#ffcccc",
              },
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {currentPage} / {totalPages}
          </Typography>
          <IconButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            sx={{
              backgroundColor: "white",
              color: currentPage === totalPages ? "lightgray" : "red",
              border: "1px solid",
              borderColor: currentPage === totalPages ? "lightgray" : "red",
              "&:hover": {
                backgroundColor:
                  currentPage === totalPages ? "white" : "#ffcccc",
              },
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
          <IconButton
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
            sx={{
              backgroundColor: currentPage === totalPages ? "lightgray" : "red",
              color: "white",
              "&:hover": {
                backgroundColor:
                  currentPage === totalPages ? "lightgray" : "darkred",
              },
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            <KeyboardDoubleArrowRight />
          </IconButton>
        </Box>
      ) : (
        // Desktop View
        <>
          <Button
            onClick={handleFirstPage}
            variant="contained"
            color="error"
            disabled={currentPage === 1}
          >
            Inicio
          </Button>
          <Button
            onClick={handlePreviousPage}
            variant="outlined"
            color="error"
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <Typography variant="body1">
            Página {currentPage} de {totalPages}
          </Typography>
          <Button
            onClick={handleNextPage}
            variant="outlined"
            color="error"
            disabled={currentPage === totalPages}
          >
            Siguiente
          </Button>
          <Button
            onClick={handleLastPage}
            variant="contained"
            color="error"
            disabled={currentPage === totalPages}
          >
            Final
          </Button>
        </>
      )}
    </Box>
  );
};

export default PaginationControls;
