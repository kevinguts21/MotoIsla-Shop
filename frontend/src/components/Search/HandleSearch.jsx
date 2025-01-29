import React, { useState } from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const HandleSearch = ({ onSearch, onClearSearch, data }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const normalizeString = (str) => {
    return str
      .normalize("NFD") // Descompone caracteres con tildes
      .replace(/[\u0300-\u036f]/g, "") // Elimina marcas diacríticas
      .toLowerCase(); // Convierte a minúsculas
  };

  const filterData = (query) => {
    if (!data) return []; // Si no hay datos, devuelve un arreglo vacío
    const normalizedQuery = normalizeString(query);
    return data.filter((item) =>
      normalizeString(item).includes(normalizedQuery)
    );
  };

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

  // Datos filtrados según la consulta
  const filteredData = filterData(searchQuery);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: "25px",
        padding: "5px 10px",
        width: "100%",
        maxWidth: "400px",
        transition: "background-color 0.3s",
        border: "1px solid black", 
        "&:hover": {
          backgroundColor: "#f9f9f9",
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
          color: "#333",
          fontSize: "16px",
          paddingLeft: "8px",
        }}
      />

      <IconButton
        onClick={handleSearch}
        sx={{
          color: "#666",
          transition: "color 0.3s",
          "&:hover": {
            color: "#000",
          },
        }}
      >
        <SearchIcon />
      </IconButton>

      {searchQuery.trim() && (
        <IconButton
          onClick={handleClear}
          sx={{
            color: "#666",
            transition: "color 0.3s",
            "&:hover": {
              color: "#000",
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
