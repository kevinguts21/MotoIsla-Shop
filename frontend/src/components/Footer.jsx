import React from "react";
import { Box, Typography, Link, Grid } from "@mui/material";
import { Facebook, Instagram} from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#232F3E",
        color: "gray",
        textAlign: "center",
        padding: "20px 10px",
        marginTop: "auto",
      }}
    >
      {/* Sección de ayuda */}
      <Typography
        variant="body1"
        sx={{
          color: "#e94f5b",
          fontSize: "1rem",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        ¿Ayuda? <br />
        <Typography
          variant="body1" // Corrección de typo aquí
          sx={{
            color: "white",
            fontSize: "1rem", // Corrección de typo aquí
            marginBottom: "10px",
          }}
        >
          <hr style={{ borderColor: "#e94f5b", width: "75px" }} />
          Llama al: <br />
        </Typography>
        <Link
          href="tel:+5355541164"
          sx={{
            color: "white",
            fontWeight: "bold",
            textDecoration: "none",
            "&:hover": {
              color: "#e94f5b", // Cambia el color a rojo al pasar el cursor
            },
          }}
        >
          +5353036894
        </Link>
      </Typography>

      {/* Línea horizontal */}
      <hr style={{ borderColor: "gray", width: "865px" }} />

      {/* Sección de redes sociales */}
      <Typography variant="body1" sx={{ marginBottom: "10px" }}>
        Conéctate con nosotros:
      </Typography>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <Link
            href="https://www.facebook.com/profile.php?id=100089351164595"
            sx={{ color: "white", "&:hover": { color: "#e94f5b" } }}
          >
            <Facebook />
          </Link>
        </Grid>
        <Grid item>
          <Link
            href="https://www.instagram.com/moto.islasurl/"
            sx={{ color: "white", "&:hover": { color: "#e94f5b" } }}
          >
            <Instagram/>
          </Link>
        </Grid>
        
      </Grid>

      {/* Derechos reservados */}
      <Typography
        variant="body2"
        sx={{ fontSize: "0.9rem", marginTop: "10px" }}
      >
        © 2024 Todos los derechos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
