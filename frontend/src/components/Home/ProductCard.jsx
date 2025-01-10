import React, { useContext } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CartContext } from "../Cart/CartContext";
import Tooltip from "@mui/material/Tooltip";

const ProductCard = ({ product, currency, convertPrice }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Producto agregado al carrito satisfactoriamente!");
  };

  // Check if the product is new (added within the last 7 days)
  const isNewProduct = () => {
    const createdDate = new Date(product.tiempo_creado);
    const currentDate = new Date();
    const timeDifference = currentDate - createdDate;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference <= 7;
  };

  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          position: "relative",
          border: "1px solid #ddd",
          borderRadius: 2,
          textAlign: "center",
          padding: 2,
          backgroundColor: "#fff",
          color: "#000",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        {/* Ribbon for new products */}
        {isNewProduct() && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              left: -10,
              width: "100px", // Width of the ribbon
              height: "30px", // Height of the ribbon
              backgroundColor: "red",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 70%, 0% 100%)", // Creates the pointed ends
              zIndex: 1,
            }}
          >
            Nuevo
          </Box>
        )}

        {/* Favorite Button */}
        <Tooltip title="Agregar al carrito" arrow>
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color:"grey",
              
              "&:hover": {
                
                color: "red",
              },
              "&:focus": {
                
                outline: "none", 
                boxShadow: "none", 
              },
            }}
          >
            <AddShoppingCartIcon/>
          </IconButton>
        </Tooltip>

        {/* Product Image */}
        <img
          src={`http://localhost:8000/media/Productos/${product.imagen
            .split("/")
            .pop()}`}
          style={{
            maxWidth: "100%",
            height: "150px",
            objectFit: "contain",
            marginBottom: "10px",
          }}
          alt={product.nombre}
        />
        <Typography variant="h6">{product.nombre}</Typography>
        <Typography variant="subtitle1">
          {/*{convertPrice(product.precio)} {currency}*/} {product.precio} CUP
        </Typography>
      </Box>
    </Link>
  );
};

export default ProductCard;
