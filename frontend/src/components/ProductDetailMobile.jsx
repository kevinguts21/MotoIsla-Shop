import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Typography, Box, Paper, Button, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import toast, { Toaster } from "react-hot-toast";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { CartContext } from "./Cart/CartContext";

const ProductDetailMobile = ({ product, handleSubcategoryClick }) => {
  const [quantity, setQuantity] = useState(1);

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

  const handleAddToCart = () => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const productInCart = cart.find((item) => item.id === product.id);

    if (productInCart) {
      productInCart.quantity += quantity; // Update quantity if already in cart
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
    toast.success(`${nombre} añadido al carrito.`);
  };

  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
  const handleDecreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <Box sx={{ padding: 1.5, marginTop: "15px" }}>
      <Toaster position="top-center" />
      <Paper
        sx={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          
          <Box
            component="img"
            src={imagen}
            alt={nombre}
            sx={{
              width: "100%",
              borderRadius: 2,
              marginTop: 2,
              boxShadow: 2,
            }}
          />
          <Typography variant="h6" color="textSecondary">
            {nombre}
          </Typography>
          <Typography variant="h5" >
           {precio} CUP
          </Typography>
          <Typography variant="body1">
            Estado:{" "}
            <span
              style={{
                color: cantidad_disponible > 0 ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {disponibilidad}
            </span>
          </Typography>

          <Typography variant="body2">
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
          <Typography variant="body2" >
            Categoría: {categoriaNombre}
          </Typography>
          {color && (
            <Typography variant="body2" >
              Color: {color}
            </Typography>
          )}
          {caracteristicas && (
            <Typography variant="body2" >
              Características: {caracteristicas}
            </Typography>
          )}
          {componentes && (
            <Typography variant="body2" >
              Componentes: {componentes}
            </Typography>
          )}
          <Typography variant="body2" color="textSecondary">
            Fecha de Ingreso: {new Date(tiempo_creado).toLocaleDateString()}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
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
              <Typography variant="body1">{quantity}</Typography>
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
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              Añadir al carrito
              <ShoppingCartOutlinedIcon />
            </Button>
          </Box>
        </Box>
      </Paper>
      <Paper
        sx={{
          border: "1px solid #ddd",
          borderRadius: "9px",
          marginTop: 1.5,
          padding: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="body1">
          <strong>Detalles</strong>
          <hr />
          {descripcion}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ProductDetailMobile;
