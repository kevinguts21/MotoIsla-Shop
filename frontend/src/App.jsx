import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import SecondaryNavbar from "./components/SecondaryNavbar";
import Footer from "./components/Footer";
import About from "./components/About";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart/Cart";
import { CartProvider } from "./components/Cart/CartContext";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { useMediaQuery } from "@mui/material";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Detect if the screen is mobile
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    axios
      .get("http://localhost:8000/productos/")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleSearch = (query) => {
    setLoading(true);
    setTimeout(() => {
      if (query.trim() === "") {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter((product) =>
          product.nombre.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
      }
      setLoading(false);
    }, 500);
  };

  const handleClearSearch = () => {
    setFilteredProducts(products);
  };

  return (
    <CartProvider>
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Toaster position="top-center" />

        {/* Render mobile or desktop navbar */}
        <Navbar
          onSearch={handleSearch}
          onClearSearch={handleClearSearch}
          mobileView={isMobile}
        />
        <SecondaryNavbar
          sx={{ backgroundColor: "#232F3F", minHeight: "40px" }}
        />

        {/* Main Routes */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  filteredProducts={filteredProducts}
                  loading={loading}
                  isMobile={isMobile}
                />
              }
            />
            <Route path="/about" element={<About isMobile={isMobile} />} />
            <Route
              path="/product/:id"
              element={
                <ProductDetail products={products} isMobile={isMobile} />
              }
            />
            <Route path="/cart" element={<Cart isMobile={isMobile} />} />
          </Routes>
        </div>

        {/* Render footer */}
        <Footer mobileView={isMobile} desktopView={!isMobile} />
      </div>
    </CartProvider>
  );
}

export default App;
