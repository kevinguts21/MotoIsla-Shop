import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProductDetailDesktop from "./ProductDesktop";
import ProductDetailMobile from "./ProductDetailMobile";
import { CircularProgress, Typography } from "@mui/material";


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/productos/${id}/`
        );
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product data:", err);
        setError("Producto no encontrado.");
        setLoading(false);
      }
    };
    fetchProductData();
  }, [id]);

  const convertPrice = (price) => {
    const exchangeRate = 320; // 1 USD = 320 CUP (example)
    const convertedPrice = price * exchangeRate;
    return convertedPrice.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

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
        cantidad: quantity,
        imagen: product.imagen,
      });
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.nombre} añadido al carrito.`);
  };

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography
        variant="h5"
        color="error"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        {error}
      </Typography>
    );
  }

  if (!product) return null;

  return isMobile ? (
    <ProductDetailMobile
      product={product}
      convertPrice={convertPrice}
      quantity={quantity}
      setQuantity={setQuantity}
      handleAddToCart={handleAddToCart}
    />
  ) : (
    <ProductDetailDesktop
      product={product}
      convertPrice={convertPrice}
      handleSubcategoryClick={(id) =>
        console.log("Navigating to subcategory", id)
      }
    />
  );
};

export default ProductDetail;
