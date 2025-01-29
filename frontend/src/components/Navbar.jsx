import React, { useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import LOGO from "../assets/LOGO-1.png";
import { Link } from "react-router-dom";
import HandleSearch from "./Search/HandleSearch";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "../App.css";
import proof from "../assets/proof.jpg";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const Navbar = ({ onSearch, onClearSearch, onClose }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <>
      {/* Desktop View */}
      <AppBar
        position="sticky"
        className="navbar-gradient"
        sx={{
          display: { xs: "none", md: "flex" },
          background:
            "linear-gradient(21deg, rgba(255,255,255,1) 38%, rgba(255,235,87,1) 58%, rgba(223,2,9,1) 90%);",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          padding: { sm: "1px 12px" },
          height: "auto",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Link to="/">
              <img
                src={LOGO}
                alt="Logo"
                style={{ width: "120px", height: "auto" }}
              />
            </Link>
          </Box>

          {/* Search Bar and Cart */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              edge="end"
              color="inherit"
              component={Link}
              to="/cart"
              sx={{
                color: "white",
                fontSize: "1.8rem", // Increase icon size for desktop
              }}
            >
              <ShoppingCartIcon fontSize="inherit" />
            </IconButton>

            <HandleSearch onSearch={onSearch} onClearSearch={onClearSearch} />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile View */}
      <AppBar
        position="sticky"
        sx={{
          display: { xs: "flex", md: "none" },
          background:
            "linear-gradient(155deg, rgba(255,255,255,1) 34%, rgba(255,218,93,1) 60%, rgba(255,0,8,1) 92%);",

          padding: "5px 20px",
          height: "auto",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link to="/">
              <img
                src={LOGO}
                alt="Logo"
                style={{ width: "100px", height: "auto", cursor: "pointer" }}
              />
            </Link>
          </Box>

          {/* Menu Icon */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon sx={{ fontSize: "1.8rem" }} />
          </IconButton>

          {/* Drawer */}
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => toggleDrawer(false)}
          >
            <Box
              sx={{
                width: 300,
                backgroundImage: `url(${proof})`,
                backgroundSize: "cover",
                padding: 2,
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                backgroundPosition: "center",
              }}
              role="presentation"
              onClick={() => toggleDrawer(false)}
              onKeyDown={() => toggleDrawer(false)}
            >
              <Paper
                sx={{
                  backgroundColor: "#ffffffcc", // Semi-transparent white
                  padding: "8px",
                  borderRadius: "8px",
                  boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontFamily: "'Qaranta', sans-serif", color: "#333" }}
                  >
                    Moto Isla
                  </Typography>
                  <IconButton onClick={toggleDrawer}>
                    <CloseIcon sx={{ color: "#333" }} />
                  </IconButton>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: "gray", fontFamily: "'Qaranta', sans-serif" }}
                >
                  Hola, bienvenido
                </Typography>
              </Paper>
              <List>
                {/* Home item with Home icon */}
                <ListItem
                  button
                  component={Link}
                  to="/"
                  sx={{ padding: "16px 0" }}
                >
                  <ListItemIcon
                    sx={{
                      fontSize: "1.8rem",
                      marginLeft: "8px", // Agrega margen izquierdo
                    }}
                  >
                    <HomeIcon sx={{ fontSize: "1.8rem" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Inicio"
                    sx={{
                      color: "black",
                      fontSize: "1.0rem",
                      "& .MuiTypography-root": {
                        fontSize: "1.0rem",
                      },
                    }}
                  />
                </ListItem>

                {/* Cart item with Cart icon */}
                <ListItem
                  button
                  component={Link}
                  to="/cart"
                  sx={{ padding: "16px 0" }}
                >
                  <ListItemIcon
                    sx={{
                      fontSize: "1.8rem",
                      marginLeft: "8px", // Agrega margen izquierdo
                    }}
                  >
                    <ShoppingCartIcon sx={{ fontSize: "1.8rem" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Carrito"
                    sx={{
                      color: "black",
                      fontSize: "1.0rem",
                      "& .MuiTypography-root": {
                        fontSize: "1.0rem",
                      },
                    }}
                  />
                </ListItem>

                {/* About item with Info icon */}
                <ListItem
                  button
                  component={Link}
                  to="/about"
                  sx={{ padding: "16px 0" }}
                >
                  <ListItemIcon
                    sx={{
                      fontSize: "1.8rem",
                      marginLeft: "8px", // Agrega margen izquierdo
                    }}
                  >
                    <InfoIcon sx={{ fontSize: "1.8rem" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Sobre Nosotros"
                    sx={{
                      color: "black",
                      fontSize: "1.0rem",
                      "& .MuiTypography-root": {
                        fontSize: "1.0rem",
                      },
                    }}
                  />
                </ListItem>

                {/* WhatsApp item with WhatsApp icon */}
                <ListItem
                  button
                  component="a"
                  href="https://wa.me/5359874553"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ padding: "16px 0" }}
                >
                  <ListItemIcon
                    sx={{
                      fontSize: "1.8rem",
                      marginLeft: "8px", // Agrega margen izquierdo
                    }}
                  >
                    <WhatsAppIcon sx={{ fontSize: "1.8rem" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Contáctenos"
                    sx={{
                      color: "black",
                      fontSize: "1.0rem",
                      "& .MuiTypography-root": {
                        fontSize: "1.0rem",
                      },
                    }}
                  />
                </ListItem>
              </List>
              <Box
                sx={{
                  marginTop: "auto",
                  padding: "10px",
                  borderRadius: "8px",
                  backgroundColor: "#ffffffcc",
                  boxShadow: "0px -2px 6px rgba(0,0,0,0.2)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    color: "#333",
                  }}
                >
                  <a
                    href="https://www.facebook.com/profile.php?id=100089351164595"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconButton>
                      <FacebookIcon />
                    </IconButton>
                  </a>
                  <a
                    href="https://www.instagram.com/moto.islasurl/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconButton>
                      <InstagramIcon />
                    </IconButton>
                  </a>
                </Box>
              </Box>
            </Box>
          </Drawer>
        </Toolbar>

        {/* Search Bar */}
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Box
            sx={{
              width: "100%",
              marginBottom: "10px",
              marginRight: "18px",
            }}
          >
            <HandleSearch onSearch={onSearch} onClearSearch={onClearSearch} />
          </Box>
        </div>
      </AppBar>
    </>
  );
};

export default Navbar;
