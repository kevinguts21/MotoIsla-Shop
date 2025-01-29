import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import axios from "axios";
import CustomDrawer from "./CustomDrawer";
import { useMediaQuery } from "@mui/material";

const LoadingSpinner = () => (
  <Box
    sx={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      backdropFilter: "blur(5px)",
      zIndex: 1300,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <CircularProgress sx={{ color: "#fff" }} />
  </Box>
);

const SecondaryNavbar = ({ setShowSlider }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/categorias/");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
    if (!open) {
      resetSelection();
    }
  };

  const resetSelection = () => {
    setSelectedCategory(null);
    setSubCategories([]);
  };

  const handleAllProductsClick = () => {
    setShowSlider(false);
    navigate("/");
    resetSelection();
    setDrawerOpen(false);
  };

  const handleCategoryChange = async (categoryId) => {
    setLoading(true);
    setSelectedCategory(categoryId);

    if (categoryId) {
      try {
        const response = await axios.get(
          `http://localhost:8000/subcategorias/?categoria=${categoryId}`
        );
        setSubCategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setLoading(false);
      }
    } else {
      resetSelection();
    }
  };

  const handleSubCategoryChange = (subCategoryId) => {
    if (subCategoryId) {
      navigate(`/?subcategoria=${subCategoryId}`);
      setDrawerOpen(false);
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#232F3F",
          height: "auto",
        }}
      >
        <Toolbar
          sx={{
            height: "40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 15px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {location.pathname !== "/" && (
              <IconButton
                onClick={() => navigate(-1)}
                sx={{
                  color: "#fff",
                  padding: 0,
                  "&:hover": { color: "#ccc" },
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            )}
            {isMobile && (
              <Button
                onClick={toggleDrawer(true)}
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                Categorías
              </Button>
            )}
          </Box>

          {!isMobile ? (
            <Box
              sx={{
                display: "flex",
                gap: "1.5rem",
                alignItems: "center",
                marginRight: "60%",
              }}
            >
              <Button component={Link} to="/" sx={buttonStyles}>
                Todos los productos
              </Button>
              <Button onClick={toggleDrawer(true)} sx={buttonStyles}>
                Categorías
              </Button>
              <Button component={Link} to="/about" sx={buttonStyles}>
                Sobre Nosotros
              </Button>
            </Box>
          ) : null}

          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                marginLeft: "1.0%",
              }}
            >
              <a
                href="https://wa.me/+5359874553"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="text"
                  startIcon={<WhatsAppIcon />}
                  sx={buttonStyles}
                >
                  Contáctenos
                </Button>
              </a>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {loading && <LoadingSpinner />}

      <CustomDrawer
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        subCategories={subCategories}
        onCategoryChange={handleCategoryChange}
        onSubCategoryChange={handleSubCategoryChange}
        loading={loading}
      />
    </>
  );
};

const buttonStyles = {
  color: "#fff",
  textTransform: "none",
};

export default SecondaryNavbar;
