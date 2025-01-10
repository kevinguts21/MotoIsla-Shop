import React from "react";
import { Box, Button, Typography } from "@mui/material";

const PaginationControls = ({
  currentPage,
  totalPages,
  handleFirstPage,
  handleLastPage,
  handleNextPage,
  handlePreviousPage,
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      mt: 4,
      gap: 2,
    }}
  >
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
  </Box>
);

export default PaginationControls;
