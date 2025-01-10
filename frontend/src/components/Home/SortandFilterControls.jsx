import React from "react";
import { Box, Select, MenuItem, Typography, IconButton } from "@mui/material";
import ViewCompactAltOutlinedIcon from "@mui/icons-material/ViewCompactAltOutlined";
import ViewCompactOutlinedIcon from "@mui/icons-material/ViewCompactOutlined";

const SortAndFilterControls = ({
  sortOption = "newest", // Set default sorting option here
  debouncedSort,

  setColumns,
  paginatedProducts,
  displayedProducts,
}) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 2,
      width: "100%",
      maxWidth: "1150px", // Ensure it matches product grid width
      marginX: "auto",
      padding: 1.5,
      border: "1px solid #ddd",
      borderRadius: 2,
      boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
      backgroundColor: "#f9f9f9",
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
          borderColor: "#e94f5b", // Change border color when focused
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#e94f5b", // Change border color on hover
        },
      }}
    >
      <MenuItem value="" disabled>
        <em>Ordenar por</em>
      </MenuItem>
      <MenuItem value="">Sin Ordenar</MenuItem>
      <MenuItem value="low-to-high">Menor precio</MenuItem>
      <MenuItem value="high-to-low">Mayor precio</MenuItem>
      <MenuItem value="newest">Más recientes</MenuItem> {/* Default option */}
    </Select>

    {/* Display Information */}
    <Typography variant="body1" sx={{ color: "gray" }}>
      Mostrando {paginatedProducts.length} - {displayedProducts.length}
    </Typography>

    {/* Column View Controls */}
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
  </Box>
);

export default SortAndFilterControls;
