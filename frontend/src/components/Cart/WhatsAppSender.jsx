import React from "react";

const WhatsAppSender = ({ customerName, customerID, customerPhone, cart, totalAmount }) => {
  const handleSendWhatsApp = () => {
    const whatsappMessage = `
      Hola,
      Estoy interesado en estos productos.

      Nombre del Cliente: ${customerName}
      Número de Carnet: ${customerID}
      Número Telefónico: ${customerPhone}
      Cantidad de Productos: ${cart.length}
      Importe Total: ${totalAmount.toFixed(2)} CUP
    `;

    const whatsappLink = `https://wa.me/5353036894?text=${encodeURIComponent(whatsappMessage)}`;
    window.location.href = whatsappLink;
  };

  return (
    <button onClick={handleSendWhatsApp} style={{ display: "none" }} id="send-whatsapp">
      Enviar WhatsApp
    </button>
  );
};

export default WhatsAppSender;
