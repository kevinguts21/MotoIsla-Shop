import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Collapse,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import proof from "../assets/proof.jpg";

const CustomDrawer = ({
  open,
  onClose,
  categories,
  selectedCategory,
  subCategories,
  onCategoryChange,
  onSubCategoryChange,
  loading,
}) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    onCategoryChange(categoryId); // Fetch subcategories for the selected category
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 300,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundImage: `url(${proof})`,  
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Header */}
        <Box
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
            <IconButton onClick={onClose}>
              <CloseIcon sx={{ color: "#333" }} />
            </IconButton>
          </Box>
          <Typography
            variant="body2"
            sx={{ color: "gray", fontFamily: "'Qaranta', sans-serif" }}
          >
            Hola, bienvenido
          </Typography>
        </Box>

        {/* Category List */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontFamily: "'Qaranta', sans-serif",
            mb: 1,
          }}
        >
          Categorías:
        </Typography>
        <List>
          {categories.map((category) => (
            <div key={category.id}>
              <ListItem button onClick={() => handleCategoryClick(category.id)}>
                <ListItemText
                  primary={<b>{category.nombre}</b>} 
                />
                {expandedCategory === category.id ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </ListItem>
              {/* Subcategories */}
              <Collapse
                in={expandedCategory === category.id}
                timeout="auto"
                unmountOnExit
              >
                {/* Apply styles for the blurred white background */}
                <Box
                  sx={{
                    backgroundColor: "#ffffffcc", // Semi-transparent white background for subcategories
                    backdropFilter: "blur(5px)", // Blur effect
                    borderRadius: "4px", // Rounded corners
                    paddingLeft: "16px", 
                  }}
                >
                  <List component="div" disablePadding>
                    {subCategories
                      .filter((sub) => sub.categoria.id === category.id)
                      .map((subCategory) => (
                        <ListItem
                          button
                          key={subCategory.id}
                          onClick={() => onSubCategoryChange(subCategory.id)}
                        >
                          <ListItemText primary={subCategory.nombre} />
                        </ListItem>
                      ))}
                  </List>
                </Box>
              </Collapse>
            </div>
          ))}
        </List>

        {/* Loading Indicator */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Social Media Icons */}
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
            <a
              href="https://wa.me/+5353036894"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton>
                <WhatsAppIcon />
              </IconButton>
            </a>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CustomDrawer;
