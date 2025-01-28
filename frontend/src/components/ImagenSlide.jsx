import React, { useState } from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";

const ImagenSlide = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Configuración del slider
  const settings = {
    dots: true, // Muestra los punticos para navegar entre imágenes
    infinite: true, // Ciclo infinito de imágenes
    fade: true, // Habilitar transición de desvanecimiento
    speed: 3000, // Velocidad lenta (en ms)
    slidesToShow: 1, // Mostrar una imagen a la vez
    slidesToScroll: 1, // Desplazar una imagen por vez
    autoplay: true, // Cambio automático
    autoplaySpeed: 4500, // Tiempo entre cambios (en ms)
    beforeChange: (_, next) => setCurrentIndex(next), // Cambia el índice al cambiar de imagen
    appendDots: (dots) => (
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {dots}
      </Box>
    ),
    customPaging: (i) => (
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: i === currentIndex ? "#e94f5b" : "#ccc",
        }}
      />
    ),
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "510px", // Ajuste de la altura para que coincida con 1920x510
        overflow: "hidden",
      }}
    >
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%", // Usar toda la altura disponible
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Ajuste para que las imágenes no se deformen
              }}
            />
          </Box>
        ))}
      </Slider>

      {/* Contador de imágenes */}
      <Typography
        sx={{
          position: "absolute",
          bottom: 10,
          right: 20,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "#fff",
          borderRadius: "12px",
          padding: "4px 8px",
          fontSize: "14px",
        }}
      >
        {currentIndex + 1}/{images.length}
      </Typography>
    </Box>
  );
};

export default ImagenSlide;
