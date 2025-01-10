import React, { useState } from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const HandleSearch = ({ onSearch, onClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(searchQuery);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    onClearSearch();
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgba(211, 211, 211, 0.7)", // Fondo gris claro
        borderRadius: "111px",
        padding: "10px 20px", // Aumentar padding para más espacio interno
        position: "relative",
        width: { xs: "90%", sm: "400px" }, // Ancho responsivo
        transition: "background-color 0.3s",
        "&:hover": {
          backgroundColor: "#fff", // Fondo blanco al pasar el mouse
        },
        "&:focus-within": {
          backgroundColor: "#fff", // Fondo blanco al enfocarse
        },
      }}
    >
      <InputBase
        placeholder="Buscar productos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        sx={{
          flex: 1,
          color: "rgba(105, 105, 105, 0.9)", // Gris oscuro para el texto
          transition: "color 0.3s",
          fontSize: "18px", // Ajuste de tamaño de texto para mejor legibilidad
          paddingLeft: "10px", // Espacio interno a la izquierda
          "&:hover": {
            color: "#000", // Texto negro al pasar el mouse
          },
          "&:focus": {
            color: "#000", // Texto negro al enfocarse
          },
        }}
      />

      {/* Ícono de búsqueda */}
      <IconButton
        onClick={handleSearch}
        disableRipple // Desactiva el efecto de onda
        sx={{
          color: "rgba(105, 105, 105, 0.9)", // Gris oscuro por defecto
          padding: 0, // Quita el espacio extra alrededor del ícono
          transition: "color 0.3s",
          "&:hover": {
            color: "red",
          },
          "&:focus": {
            outline: "none", // Evita contornos adicionales en enfoque
          },
        }}
      >
        <SearchIcon sx={{ color: "inherit", fontSize: "1.5rem" }} />
      </IconButton>

      {/* Ícono de basura */}
      {searchQuery.trim() && (
        <IconButton
        disableRipple
          onClick={handleClear}
          sx={{
            color: "rgba(105, 105, 105, 0.9)", // Gris oscuro por defecto
            position: "absolute",
            right: 35,
            transition: "color 0.3s",
            "&:hover": {
              color: "red",
            },
            "&:focus": {
            outline: "none", // Evita contornos adicionales en enfoque
          },
          }}
        >
          <DeleteOutlineIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default HandleSearch;
