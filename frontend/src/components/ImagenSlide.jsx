import React, { useState } from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

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
          bottom: 10,
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
    nextArrow: <ArrowForwardIos style={{ color: "#e94f5b" }} />,
    prevArrow: <ArrowBackIos style={{ color: "#e94f5b" }} />,
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "250px", md: "510px" }, // Ajuste para vista móvil
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
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                background: `linear-gradient(to right, rgba(255,255,255,0), ${getAverageColor(image.src)}), linear-gradient(to left, rgba(255,255,255,0), ${getAverageColor(image.src)})`, // Degradado que hereda el color
                zIndex: -1,
              }}
            />
            <img
              src={image.src}
              alt={image.alt}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain", // Ajuste para que las imágenes no se deformen
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

const getAverageColor = (src) => {
  // Función ficticia para obtener el color promedio de la imagen
  // Aquí debes implementar tu propia lógica para obtener el color promedio de la imagen
  return "#000"; // Solo como ejemplo, retornar un color negro
};

export default ImagenSlide;
