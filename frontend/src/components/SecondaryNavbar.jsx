import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Box, CircularProgress } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import axios from "axios";
import CustomDrawer from "./CustomDrawer";

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
    setSelectedCategory(categoryId); // Set the selected category

    if (categoryId) {
      try {
        const response = await axios.get(
          `http://localhost:8000/subcategorias/?categoria=${categoryId}`
        );
        setSubCategories(response.data); // Set fetched subcategories
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
      // Navigate to products filtered by selected subcategory.
      navigate(`/?subcategoria=${subCategoryId}`);
      setDrawerOpen(false); // Optionally close the drawer after selection
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#232F3F",
          height: "48px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Toolbar
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 15px",
          }}
        >
          <Box sx={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            {location.pathname !== "/" && (
              <Button
                onClick={() => navigate(-1)}
                startIcon={<ArrowBackIcon />}
                sx={{ color: "#fff" }}
              />
            )}
            <Button component={Link} to="/" sx={buttonStyles}>
              Todos los productos
            </Button>
            <Button onClick={toggleDrawer(true)} sx={buttonStyles}>
              Categoría
            </Button>
            <Button component={Link} to="/about" sx={buttonStyles}>
              Sobre Nosotros
            </Button>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
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
        </Toolbar>
      </AppBar>

      {loading && <LoadingSpinner />}

      {/* Use the CustomDrawer here */}
      <CustomDrawer
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        categories={categories}
        selectedCategory={selectedCategory} // Pass selected category state
        subCategories={subCategories} // Pass fetched subcategories
        onCategoryChange={handleCategoryChange} // Handle category change
        onSubCategoryChange={handleSubCategoryChange} // Handle subcategory change
        loading={loading} // Pass loading state for spinner
      />
    </>
  );
};

const buttonStyles = {
  color: "#fff",

  textTransform: "none",
};

export default SecondaryNavbar;
