import React, { useState } from "react";
import "../About.css"; // Archivo CSS para estilos personalizados
import motoislalogo from "../assets/motoislalogo.jpg";
import PlaceIcon from "@mui/icons-material/Place";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import foto from "../assets/LOGO-1.png";
import repair from "../assets/Repair.jpg"
import tools from "../assets/Tools.jpg"

const About = () => {
  // Estados para controlar la visibilidad de los textos adicionales
  const [showMore1, setShowMore1] = useState(false);
  const [showMore2, setShowMore2] = useState(false);
  const [showMore3, setShowMore3] = useState(false);

  return (
    <div className="about-container">
      {/* Sección principal con la imagen y los textos */}
      <div className="main-section">
        <div className="image-container">
          <img
            src={motoislalogo}
            alt="Moto Isla Surl"
            className="about-image"
          />
        </div>
        <div className="main-content">
          <div className="content-row">
            <div className="text-section">
              <h1>¿Qué hacemos?</h1>
              <p className="description">
                Somos una empresa comercializadora de piezas automotores.
                Nuestro compromiso es brindar soluciones rápidas y eficientes
                para tus necesidades.
              </p>
              <p className="description">
                Nos especializamos en reparación, reconstrucción y mantenimiento
                de vehículos que incluye la chapistería, pintura y electricidad
                a chasis, carrocería, motores de combustión interna. Además de
                la comercialización de partes y piezas de motos.
              </p>
            </div>
            <div className="text-section">
              <h2>Contamos con:</h2>
              <p className="description">
                Personal altamente capacitado, partes y piezas de calidad,
                rapidez en la ejecución, garantía por escrito, servicios tanto a
                personas Jurídicas como a personas Naturales.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de localización */}
      <div className="section">
        <h2>¿Dónde radicamos?</h2>

        <p className="location">
          <PlaceIcon />
          Nos encontramos en Calle 39A entre 47 y 49, Nueva Gerona.
        </p>
      </div>

      {/* Sección de contacto */}
      <div className="section">
        <h2>¿Cómo contactarnos?</h2>
        <p className="location">
          <CallIcon />
          Teléfono:
          <a href="tel:53036894" className="contact-link">
            +5346335214
          </a>
        </p>
        <p className="location">
          <EmailIcon />
          Email:
          <a href="mailto:contacto@motoislasurl.com" className="contact-link">
            motoislasurl@gmail.com
          </a>
        </p>
      </div>

      {/* Servicios que prestamos */}
      <div>
        <h2>Servicios que prestamos</h2>
        <div className="services-container">
          {/* Servicio 1 */}
          <div className="service">
            <img src={tools} alt="Servicio 1"></img>
            <h2>Venta de respuestos y accesorios</h2>
            <p>
              Ofrecemos una amplia variedad de repuestos, piezas y accesorios
              para vehículos automotores.
            </p>
            {showMore1 && (
              <p>
                Garantizando calidad, durabilidad y compatibilidad con las
                principales marcas del mercado. Nuestro objetivo es brindar
                soluciones confiables para el mantenimiento, personalización y
                reparación de tu vehículo, asegurando siempre un servicios ágil
                y profesional.
              </p>
            )}
            <a onClick={() => setShowMore1(!showMore1)}>
              {showMore1 ? "Leer menos" : "Leer más"}
            </a>
          </div>

          {/* Servicio 2 */}
          <div className="service">
            <img src={repair} alt="Servicio 2"></img>
            <h2>Reparación, reconstrucción y mantenimiento </h2>
            <p>
              Nos especializamos en ofrecer servicios integrales para garantizar
              el óptimo funcionamiento de su vehículo.
            </p>
            {showMore2 && (
              <p>
                Desde reparaciones mecánicas y eléctricas hasta reconstrucción
                de componentes y mantenimiento preventivo, adaptadas a las
                necesidades de cada cliente.
              </p>
            )}
            <a onClick={() => setShowMore2(!showMore2)}>
              {showMore2 ? "Leer menos" : "Leer más"}
            </a>
          </div>
        </div>
      </div>

      {/* Eslogan */}
      <div className="slogan">
        <h2 className="qaranta-title">"Su moto merece lo mejor"</h2>
      </div>
    </div>
  );
};

export default About;
