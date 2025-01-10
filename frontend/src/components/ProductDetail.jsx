import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, Typography, Paper, CircularProgress, Box } from "@mui/material";
import ReactImageMagnify from "react-image-magnify";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState("USD");

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

  const handleSubcategoryClick = (subcategoriaId) => {
    navigate(`/?subcategoria=${subcategoriaId}`);
  };

  const convertPrice = (price) => {
    const exchangeRate = currency === "CUP" ? 320 : 1; // Ejemplo: 1 USD = 320 CUP
    const convertedPrice = price * exchangeRate;
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(convertedPrice);
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

  if (!product) {
    return null;
  }

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
    cantidad_disponible > 1 ? "Disponible" : "No disponible";
  const categoriaNombre =
    subcategoria?.categoria?.nombre || "Categoría desconocida";
  const subcategoriaNombre = subcategoria?.nombre || "Subcategoría desconocida";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: 2,
        marginTop: "30px",
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
          alignItems: "stretch",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRight: "1px solid #ddd",
            minHeight: "400px",
            backgroundColor: "#f9f9f9",
            height: "100%",
          }}
        >
          <Box
            sx={{
              maxWidth: "100%",
              maxHeight: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: nombre,
                  isFluidWidth: true,
                  src: imagen,
                },
                largeImage: {
                  src: imagen,
                  width: 1200,
                  height: 1800,
                },
                enlargedImageContainerStyle: {
                  backgroundColor: "#fff",
                  zIndex: 1000,
                },
                isHintEnabled: true,
                shouldUsePositiveSpaceLens: true,
              }}
            />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "400px",
            height: "100%",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              height: "100%",
            }}
          >
            <Typography variant="h4" gutterBottom>
              {nombre}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography variant="h5" color="Disabled">
                Precio: {convertPrice(precio)} CUP
              </Typography>
            </Box>

            <Typography variant="body1">Estado: {disponibilidad}</Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontSize: "0.9rem" }}
            >
              Fecha de Ingreso: {new Date(tiempo_creado).toLocaleDateString()}
            </Typography>
            <hr style={{ border: "1px solid #ddd", margin: "10px 0" }} />

            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                fontSize: "0.95rem",
              }}
            >
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

            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                fontSize: "0.95rem",
              }}
            >
              Categoría: {categoriaNombre}
            </Typography>

            {/* Mostrar el color solo si existe */}
            {color && (
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                }}
              >
                Color:{' '} 
                {color}
              </Typography>
            )}

            {/* Mostrar el Caracteristicas solo si existe */}
            {caracteristicas && (
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                }}
              >
                Caracteristicas:{' '} 
                {caracteristicas}
              </Typography>
            )}

            {/* Mostrar el Componentes solo si existe */}
            {componentes && (
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                }}
              >
                Componentes:{' '} 
                {componentes}
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Box
        sx={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          marginTop: 3,
          padding: 2,
          width: "100%",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="body1" sx={{ fontSize: "1rem" }}>
          <strong>Detalles del Producto:</strong>
          <hr />
          {descripcion}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductDetail;
