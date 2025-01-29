import React, { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  IconButton,
  Typography,
  Drawer,
} from "@mui/material";
import ViewCompactAltOutlinedIcon from "@mui/icons-material/ViewCompactAltOutlined";
import ViewCompactOutlinedIcon from "@mui/icons-material/ViewCompactOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useMediaQuery } from "@mui/material";
import FilterDrawer from "./FilterDrawer";

const SortAndFilterControls = ({
  sortOption = "newest",
  debouncedSort,
  setColumns,
  paginatedProducts,
  displayedProducts,
  onApplyFilters,
}) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState({});
  const [precioSeleccionado, setPrecioSeleccionado] = useState([0, 0]);
  const [disponible, setDisponible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleResetFilters = () => {
    setCategoriasSeleccionadas({});
    setPrecioSeleccionado([0, 0]);
    setDisponible(false);
    handleCloseDrawer();
  };

  const handleApplyFilters = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
  };

  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 3,
        width: "100%",
        maxWidth: "1450px",
        marginX: "auto",
        padding: 1.5,
        border: "1px solid #ddd",
        borderRadius: 2,
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
        flexWrap: isMobile ? "wrap" : "nowrap",
      }}
    >
      {/* Sort Options */}
      <Select
        variant="outlined"
        value={sortOption}
        onChange={(e) => debouncedSort(e.target.value)}
        size="small"
        displayEmpty
        sx={{
          backgroundColor: "#fff",
          borderRadius: 1,
          minWidth: 180,
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e94f5b",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e94f5b",
          },
        }}
      >
        <MenuItem value="" disabled>
          <em>Ordenar por</em>
        </MenuItem>
        <MenuItem value="">Sin Ordenar</MenuItem>
        <MenuItem value="low-to-high">Menor precio</MenuItem>
        <MenuItem value="high-to-low">Mayor precio</MenuItem>
        <MenuItem value="newest">Más recientes</MenuItem>
      </Select>

      {/* Column View Controls o Filtro en Móvil */}
      {isMobile ? (
        <IconButton
          onClick={handleOpenDrawer} // Abre el drawer
          disableRipple
          sx={{
            backgroundColor: "inherit",
            "&:hover": {
              color: "red",
            },
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
          }}
        >
          <FilterListIcon />
        </IconButton>
      ) : (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={() => setColumns(4)}
            disableRipple
            sx={{
              backgroundColor: "inherit",
              "&:hover": {
                color: "red",
              },
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            <ViewCompactAltOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() => setColumns(3)}
            disableRipple
            sx={{
              backgroundColor: "inherit",
              "&:hover": {
                color: "red",
              },
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            <ViewCompactOutlinedIcon />
          </IconButton>
        </Box>
      )}

      {/* Display Information (Desktop Only) */}
      {!isMobile && (
        <Typography variant="body1" sx={{ color: "gray" }}>
          Mostrando {paginatedProducts.length} - {displayedProducts.length}
        </Typography>
      )}

      {/* Drawer */}
      <Drawer
        anchor="bottom"
        open={openDrawer}
        onClose={handleCloseDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%",
            height: "70%",
            backgroundColor: "#f9f9f9",
            borderRight: "1px solid #ddd",
          },
        }}
      >
        <FilterDrawer
          onClose={handleCloseDrawer}
          onResetFilters={handleResetFilters}
          onApplyFilters={handleApplyFilters}
        />
      </Drawer>
    </Box>
  );
};

export default SortAndFilterControls;
