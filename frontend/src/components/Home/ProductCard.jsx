import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  useMediaQuery,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductCard = ({ product, currency, convertPrice }) => {
  const [quantity, setQuantity] = useState(1);
  const isMobile = useMediaQuery("(max-width:600px)"); // Detect mobile screen size

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
    toast.success("Producto agregado al carrito");
  };

  const isNewProduct = () => {
    const createdDate = new Date(product.tiempo_creado);
    const currentDate = new Date();
    const timeDifference = currentDate - createdDate;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference <= 7;
  };

  // Shared Styled Components
  const ProductContainer = styled(Box)(({ theme }) => ({
    position: "relative",
    border: "1px solid #ddd",
    borderRadius: 9,
    textAlign: "center",
    padding: 2,
    backgroundColor: "#fff",
    color: "#000",
    transition: "transform 0.3s, box-shadow 0.3s",
    height: "100%",
  }));

  const ProductImage = styled("img")(({ theme }) => ({
    maxWidth: "100%",
    height: "150px",
    objectFit: "contain",
    marginBottom: "5px",
  }));

  const CartButton = styled(IconButton)(({ theme }) => ({
    color: "grey",
    background: "#e2e2e2",
    "&:hover": {
      color: "red",
    },
  }));

  const Ribbon = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: 10,
    left: -10,
    width: "80px",
    height: "25px",
    backgroundColor: "red",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "2px",
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    zIndex: 1,
    fontSize: "14px",
    fontWeight: "bold",
  }));

  // Desktop View
  const DesktopView = () => (
    <ProductContainer
      sx={{
        display: "flex",
        flexDirection: "column", // Asegura alineación en columna
        justifyContent: "space-between", // Espaciado entre elementos
        height: "100%", // Ocupa toda la altura disponible
      }}
    >
      {isNewProduct() && <Ribbon>Nuevo</Ribbon>}

      {/* Imagen del Producto */}
      <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
        <ProductImage src={product.imagen} alt={product.nombre} />
      </Link>

      {/* Detalles del Producto */}
      <Box
        sx={{
          paddingLeft: "10px",
          textAlign: "center",
          marginBottom: "auto", // Empuja los elementos superiores hacia arriba
        }}
      >
        <Typography variant="h6">{product.nombre}</Typography>
        <Typography variant="subtitle1">
          {convertPrice(product.precio)} CUP
        </Typography>
        {product.subcategoria && (
          <Typography variant="subtitle2" color="textSecondary">
            {product.subcategoria.nombre}
          </Typography>
        )}
      </Box>

      {/* Divider siempre al fondo */}
      <Divider sx={{ marginY: 1 }} />

      {/* Controles de Cantidad y Botón Agregar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingX: "10px",
          marginTop: "sticky", // Posiciona este bloque siempre al final
        }}
      >
        {/* Controles de Cantidad */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => setQuantity(Math.max(quantity - 1, 1))}>
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1" sx={{ mx: 1 }}>
            {quantity}
          </Typography>
          <IconButton onClick={() => setQuantity(quantity + 1)}>
            <AddIcon />
          </IconButton>
        </Box>
        <Divider orientation="vertical" sx={{ marginLeft: "80px" }} />

        {/* Botón Agregar al Carrito */}
        <Tooltip title="Agregar al carrito" arrow>
          <CartButton
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
          >
            <AddShoppingCartIcon />
          </CartButton>
        </Tooltip>
      </Box>
    </ProductContainer>
  );

  // Mobile View
  const MobileView = () => (
    <ProductContainer
      sx={{
        display: "flex",
        flexDirection: "row", // Imagen a la izquierda, contenido a la derecha
        alignItems: "stretch", // Asegura que ambos lados tengan la misma altura
        padding: "5px",
        height: "auto",
        marginRight: "15px",
      }}
    >
      {/* Contenedor de la Imagen */}
      <Box
        sx={{
          flex: "1 1 auto",
          height: "100%",
          maxWidth: "150px", // Tamaño fijo para la imagen
          display: "flex",
          flexDirection: "column", // Apila la imagen y el Ribbon verticalmente
        }}
      >
        <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
          <ProductImage
            src={product.imagen}
            alt={product.nombre}
            sx={{
              height: "100%",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        </Link>

        {/* Ribbon debajo de la imagen */}
        {isNewProduct() && (
          <Ribbon
            sx={{
              marginTop: "5px",
              backgroundColor: "red",
              color: "white",
              fontSize: "10px",
              fontWeight: "bold",
              padding: "0.1px 2px", // Más fino
              borderRadius: "3px",
              textAlign: "center",
            }}
          >
            Nuevo
          </Ribbon>
        )}
      </Box>

      {/* Información del producto y controles */}
      <Box
        sx={{
          flex: "2 1 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "20px 15px", // Más padding para aprovechar el espacio
        }}
      >
        {/* Información del producto */}
        <Box>
          <Typography
            variant="h6"
            sx={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}
          >
            {product.nombre}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: "14px", marginBottom: "5px" }}
          >
            {convertPrice(product.precio)} CUP
          </Typography>
          {product.subcategoria && (
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ fontSize: "12px" }}
            >
              {product.subcategoria.nombre}
            </Typography>
          )}
        </Box>

        {/* Controles del carrito */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto", // Empuja los controles hacia abajo
          }}
        >
          {/* Controles de cantidad */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => setQuantity(Math.max(quantity - 1, 1))}
              sx={{ padding: "8px" }}
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="body1" sx={{ mx: 1, fontSize: "14px" }}>
              {quantity}
            </Typography>
            <IconButton
              onClick={() => setQuantity(quantity + 1)}
              sx={{ padding: "8px" }}
            >
              <AddIcon />
            </IconButton>
          </Box>

          {/* Botón de agregar al carrito */}
          <Tooltip title="Agregar al carrito" arrow>
            <CartButton
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart();
              }}
              sx={{
                padding: "10px",
                marginLeft: "10px",
              }}
            >
              <AddShoppingCartIcon />
            </CartButton>
          </Tooltip>
        </Box>
      </Box>
    </ProductContainer>
  );

  return isMobile ? <MobileView /> : <DesktopView />;
};

export default ProductCard;
