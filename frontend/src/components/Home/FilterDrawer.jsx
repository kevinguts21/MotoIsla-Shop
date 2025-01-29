import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AxiosInstance from "../Axios";
import PriceRange from "./PriceRange";
import { useNavigate } from "react-router-dom";

const FilterDrawer = ({ onClose }) => {
  const [categorias, setCategorias] = useState([]);
  const [selectedCategorias, setSelectedCategorias] = useState({});
  const [subcategorias, setSubcategorias] = useState([]);
  const [todosProductos, setTodosProductos] = useState([]);
  const [precioSeleccionado, setPrecioSeleccionado] = useState([0, 1000]);
  const [showAlert, setShowAlert] = useState(false);
  const [showNoProductsAlert, setShowNoProductsAlert] = useState(false); // New state for no products alert

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const responseCategorias = await AxiosInstance.get("categorias");
        setCategorias(responseCategorias.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    const fetchProductos = async () => {
      try {
        const responseProductos = await AxiosInstance.get("productos");
        setTodosProductos(responseProductos.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchCategorias();
    fetchProductos();
  }, []);

  const handleSelectCategoria = async (categoria) => {
    setSelectedCategorias((prevSelected) => {
      const newSelected = { ...prevSelected };
      if (newSelected[categoria.id]) {
        delete newSelected[categoria.id];
      } else {
        newSelected[categoria.id] = categoria;
      }
      return newSelected;
    });

    try {
      const responseSubcategorias = await AxiosInstance.get(
        `subcategorias/?categoria=${categoria.id}`
      );
      setSubcategorias((prevSubcategorias) => [
        ...prevSubcategorias.filter((sub) => sub.categoria.id !== categoria.id),
        ...responseSubcategorias.data,
      ]);
    } catch (error) {
      console.error("Error al obtener subcategorías:", error);
    }
  };

  const handleSelectAllCategorias = async () => {
    if (Object.keys(selectedCategorias).length === categorias.length) {
      setSelectedCategorias({});
      setSubcategorias([]);
    } else {
      const newSelected = {};
      categorias.forEach((categoria) => {
        newSelected[categoria.id] = categoria;
      });
      setSelectedCategorias(newSelected);

      try {
        const subcategoriasPromises = categorias.map((categoria) =>
          AxiosInstance.get(`subcategorias/?categoria=${categoria.id}`)
        );
        const subcategoriasResponses = await Promise.all(subcategoriasPromises);
        const allSubcategorias = subcategoriasResponses.flatMap(
          (response) => response.data
        );
        setSubcategorias(allSubcategorias);
      } catch (error) {
        console.error(
          "Error al obtener subcategorías para todas las categorías:",
          error
        );
      }
    }
  };

  const handleApplyFilters = () => {
    const categoriasIds = Object.keys(selectedCategorias);

    if (categoriasIds.length === 0) {
      setShowAlert(true);
      return;
    }

    const subcategoriasIds = subcategorias
      .filter((sub) => categoriasIds.includes(sub.categoria.id.toString()))
      .map((sub) => sub.id);

    const productosFiltrados = todosProductos.filter((producto) =>
      subcategoriasIds.includes(producto.subcategoria.id)
    );

    const productosConPrecio = productosFiltrados.filter(
      (producto) =>
        producto.precio >= precioSeleccionado[0] &&
        producto.precio <= precioSeleccionado[1]
    );

    console.log("Productos filtrados:", productosConPrecio);

    if (productosConPrecio.length > 0) {
      navigate("/", { state: { productosFiltrados: productosConPrecio } });

      // Close the drawer only if there are matching products
      onClose();

      // Reset no products alert
      setShowNoProductsAlert(false);
    } else {
      console.error("No hay productos que coincidan con los filtros.");

      // Show alert for no matching products
      setShowNoProductsAlert(true);

      // Do not close the drawer if no products match
    }
  };

  const handleResetFilters = () => {
    setSelectedCategorias({});
    setSubcategorias([]);
    setPrecioSeleccionado([0, 1000]);
    setShowAlert(false);

    // Reset no products alert
    setShowNoProductsAlert(false);
  };

  return (
    <Box
      sx={{
        padding: 3,
        position: "relative",
        top: -10,
        gap: 2,
        width: { xs: "90%", sm: "400px" },
        maxWidth: "90%",
        margin: "0 auto",
      }}
    >
      {showAlert && (
        <Alert severity="warning" sx={{ width: "80%", mt: 2 }}>
          Debe seleccionar al menos una categoría.
        </Alert>
      )}

      {showNoProductsAlert && (
        <Alert severity="error" sx={{ width: "80%", mt: 2 }}>
          No hay productos que coincidan con los filtros aplicados.
        </Alert>
      )}

      <IconButton
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Filtros de búsqueda
        </Typography>

        <Divider />

        <Typography variant="subtitle1">Categorías</Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          <Button
            variant={
              Object.keys(selectedCategorias).length === categorias.length
                ? "contained"
                : "outlined"
            }
            onClick={handleSelectAllCategorias}
            color="error"
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              padding: "5px 15px",
              fontSize: "0.8rem",
              fontWeight: "bold",
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            Todas
          </Button>
          {categorias.map((categoria) => (
            <Button
              key={categoria.id}
              variant={
                selectedCategorias[categoria.id] ? "contained" : "outlined"
              }
              color="error"
              onClick={() => handleSelectCategoria(categoria)}
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                padding: "5px 15px",
                fontSize: "0.8rem",
                fontWeight: "bold",
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                },
              }}
            >
              {categoria.nombre}
            </Button>
          ))}
        </Box>

        <Divider />

        <PriceRange onRangeChange={setPrecioSeleccionado} />

        <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleResetFilters}
            sx={{
              width: "49%",
              height: "10%",
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            Restablecer
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleApplyFilters} // Apply filters and close drawer conditionally
            sx={{
              width: "49%",
              height: "10%",
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            Aplicar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterDrawer;
