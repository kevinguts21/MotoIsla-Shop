import React, { useState } from "react";
import { Box, MenuItem, Select, Typography } from "@mui/material";

const Moneda = ({ onCurrencyChange }) => {
  const [currency, setCurrency] = useState("USD");

  const handleCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;
    setCurrency(selectedCurrency);
    if (onCurrencyChange) {
      onCurrencyChange(selectedCurrency);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "top",
        gap: 1,
        padding: "0 8px",
      }}
    >
      <Select
        value={currency}
        onChange={handleCurrencyChange}
        variant="outlined"
        size="small"
        sx={{
          minWidth: 80,
          color: "#fff",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "4px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          "& .MuiSelect-icon": { color: "#fff" },
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
        }}
      >
        <MenuItem value="USD">USD</MenuItem>
        <MenuItem value="CUP">CUP</MenuItem>
      </Select>
    </Box>
  );
};

export default Moneda;
