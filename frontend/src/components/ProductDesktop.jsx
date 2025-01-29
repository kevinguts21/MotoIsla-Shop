import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Typography,
  Paper,
  Box,
  Button,
  IconButton,
  Modal,
} from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import toast, { Toaster } from "react-hot-toast";

const ProductDetailDesktop = ({
  product,
  convertPrice,
  handleSubcategoryClick,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false); // Controla el estado del modal de zoom

  const {
    nombre,
    descripcion,
    precio,
    cantidad_disponible,
    imagen,
    subcategoria,
    tiempo_creado,
    color,
    caracteristicas,
    componentes,
  } = product;

  const disponibilidad =
    cantidad_disponible > 0 ? "Disponible" : "No disponible";
  const categoriaNombre =
    subcategoria?.categoria?.nombre || "Categoría desconocida";
  const subcategoriaNombre = subcategoria?.nombre || "Subcategoría desconocida";

  useEffect(() => {
    const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotalQuantity(total);
  }, []);

  const handleAddToCart = () => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const productInCart = cart.find((item) => item.id === product.id);

    if (productInCart) {
      productInCart.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        quantity,
        imagen: product.imagen,
      });
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));

    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalQuantity(total);

    toast.success(`${nombre} añadido al carrito.`);
  };

  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
  const handleDecreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleZoomOpen = () => setIsZoomOpen(true);
  const handleZoomClose = () => setIsZoomOpen(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: 2,
        marginTop: "20px",
      }}
    >
      <Toaster position="top-center" />
      <Grid
        container
        spacing={2}
        sx={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
          alignItems: "stretch",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            position: "relative", // Para posicionar el botón de zoom
          }}
        >
          <Box
            sx={{
              width: "95%",
              height: "95%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              borderRadius: "8px",
              backgroundColor: "#f0f0f0",
              position: "relative",
            }}
          >
            {/* Imagen principal */}
            <img
              src={imagen}
              alt={nombre}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
            {/* Botón de zoom */}
            <IconButton
              onClick={handleZoomOpen}
              sx={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                },
              }}
            >
              <ZoomInIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" gutterBottom>
            {nombre}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Estado: {disponibilidad}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontSize: "0.9rem" }}
          >
            Precio: {precio} CUP
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontSize: "0.9rem" }}
          >
            Fecha de Ingreso: {new Date(tiempo_creado).toLocaleDateString()}
          </Typography>
          <hr style={{ border: "1px solid #ddd", margin: "10px 0" }} />
          <Typography variant="body2" color="textSecondary">
            Subcategoría:{" "}
            <Link
              to={`/?subcategoria=${subcategoria?.id}`}
              style={{
                textDecoration: "none",
                fontWeight: "normal",
                color: "#007bff",
              }}
              onClick={() => handleSubcategoryClick(subcategoria?.id)}
            >
              {subcategoriaNombre}
            </Link>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Categoría: {categoriaNombre}
          </Typography>
          {color && (
            <Typography variant="body2" color="textSecondary">
              Color: {color}
            </Typography>
          )}
          {caracteristicas && (
            <Typography variant="body2" color="textSecondary">
              Características: {caracteristicas}
            </Typography>
          )}
          {componentes && (
            <Typography variant="body2" color="textSecondary">
              Componentes: {componentes}
            </Typography>
          )}
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 1,
            }}
          >
            <IconButton
              color="primary"
              onClick={handleDecreaseQuantity}
              sx={{
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                },
              }}
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="h6">{quantity}</Typography>
            <IconButton
              color="primary"
              onClick={handleIncreaseQuantity}
              sx={{
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                },
              }}
            >
              <AddIcon />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleAddToCart}
              sx={{
                padding: "6px 12px",
                fontSize: "0.8rem",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Añadir al carrito
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          marginTop: 2,
          padding: 2,
          width: "100%",
          backgroundColor: "#fff",
        }}
      >
        <hr style={{ border: "1px solid #ddd", margin: "0 0 10px 0" }} />
        <Typography variant="body1" sx={{ fontSize: "1rem" }}>
          {descripcion}
        </Typography>
      </Box>
      {/* Modal de Zoom */}
      <Modal open={isZoomOpen} onClose={handleZoomClose}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            overflow: "auto",
          }}
        >
          <img
            src={imagen}
            alt={nombre}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductDetailDesktop;
