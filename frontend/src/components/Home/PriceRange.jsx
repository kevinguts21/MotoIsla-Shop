import React, { useState, useEffect } from "react";
import { Slider, Typography, Box } from "@mui/material";
import AxiosInstance from "../Axios";

const PriceRange = ({ onRangeChange }) => {
  const [precioMaximo, setPrecioMaximo] = useState(1000);
  const [precioSeleccionado, setPrecioSeleccionado] = useState([0, 1000]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await AxiosInstance.get("productos");
        const maxPrecio = Math.max(...response.data.map((prod) => prod.precio));
        setPrecioMaximo(maxPrecio);
        setPrecioSeleccionado([0, maxPrecio]);
        onRangeChange([0, maxPrecio]); // Inicializar rango en el componente principal
      } catch (error) {
        console.error("Error al obtener productos para rango de precios:", error);
      }
    };

    fetchProductos();
  }, [onRangeChange]);

  const handleChange = (event, newValue) => {
    setPrecioSeleccionado(newValue);
    onRangeChange(newValue);
  };

  return (
    <Box>
      <Typography variant="subtitle1" sx={{marginBottom:"30px"}}>Rango de Precios</Typography>
      <Slider
        value={precioSeleccionado}
        onChange={handleChange}
        valueLabelDisplay="on"
        color="error"
        min={0}
        max={precioMaximo}
      />
    </Box>
  );
};

export default PriceRange;

