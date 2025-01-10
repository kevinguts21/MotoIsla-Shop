import React, { useState, useEffect } from "react";
import { Box, IconButton, Badge } from "@mui/material";
import LOGO from "../assets/LOGO-1.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import HandleSearch from "./Search/HandleSearch";
import { useMediaQuery } from "@mui/material";

const Navbar = ({ onSearch, onClearSearch }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [showSearch, setShowSearch] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  // Fetching the quantity of items in the cart from local storage
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const quantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotalQuantity(quantity);
  }, []);

  return (
    <Box
      className="navbar-gradient"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        padding: "12px 35px",
        color: "#fff",
        position: "relative",
        overflow: "visible",
      }}
    >
      {/* Logo y título */}
      <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
        <img
          src={LOGO}
          alt="Moto Isla Logo"
          style={{
            marginTop: "10px",
            width: "150px",
            height: "auto",
            marginLeft: "-10px",
            zIndex: 0.05,
            position: "absolute",
          }}
        />
      </Box>

      {/* Barra de búsqueda y carrito */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "17px",
          flexGrow: 1,
          flexBasis: "300px", // Ajusta este valor según sea necesario
          justifyContent: "flex-end",
        }}
      >
        {isMobile ? (
          <>
            {/* Ícono de lupa en vista móvil */}
            <IconButton
              disableRipple
              sx={{
                transition: "color 0.3s",
                padding: 0,
                color: "#fff",
                "&:hover": {
                  color: "red",
                },
                "&:focus": {
                  outline: "none",
                },
              }}
              onClick={toggleSearch}
            >
              {showSearch ? <CloseIcon /> : <SearchIcon />}
            </IconButton>

            {/* Barra de búsqueda emergente */}
            {showSearch && (
              <Box
                sx={{
                  position: "absolute",
                  top: "50px",
                  right: "20px",
                  backgroundColor: "#232F3F",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  padding: "10px",
                  zIndex: 1000,
                }}
              >
                <HandleSearch
                  onSearch={onSearch}
                  onClearSearch={onClearSearch}
                />
              </Box>
            )}
          </>
        ) : (
          // Barra de búsqueda en vista de escritorio
          <HandleSearch onSearch={onSearch} onClearSearch={onClearSearch} />
        )}

        {/* Ícono de carrito con badge */}
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <Badge
            badgeContent={totalQuantity}
            color="primary"
            sx={{ marginLeft: "10px" }} // Espaciado opcional
          >
            <IconButton
              disableRipple
              sx={{
                padding: 0, // Quita espacio adicional
                transition: "color 0.3s",
                color: "#fff", // Blanco predeterminado
                "&:hover": {
                  color: "red", // Cambia a rojo al pasar el mouse
                },
                "&:focus": {
                  outline: "none", // Elimina el cuadro azul de enfoque
                  boxShadow: "none", // Asegura que tampoco haya sombra
                },
              }}
            >
              <ShoppingCartIcon />
            </IconButton>
          </Badge>
        </Link>
      </Box>
    </Box>
  );
};

export default Navbar;
