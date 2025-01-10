import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "./LOGO-1.png";
import { CartContext } from "./CartContext";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import WhatsAppSender from "./WhatsAppSender";

const GeneratePDFAndPurchase = () => {
  const { cart } = useContext(CartContext);

  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const customerValidationSchema = Yup.object().shape({
    customerName: Yup.string().required("El nombre del cliente es obligatorio"),
    customerID: Yup.string().required("El número de carnet es obligatorio"),
    customerPhone: Yup.string()
      .required("El número telefónico es obligatorio")
      .matches(/^[0-9]+$/, "El número telefónico debe contener solo dígitos"),
  });

  const totalAmount = cart.reduce(
    (sum, item) => sum + Number(item.precio) * item.quantity,
    0
  );

  const handleDialogOpen = () => {
    setOpenDialog(true);
    setOpenConfirmDialog(false);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setOpenConfirmDialog(false);
  };

  const isFormValid = () => {
    return (
      customerName.trim() !== "" &&
      customerID.trim() !== "" &&
      customerPhone.trim() !== ""
    );
  };

  const handleGeneratePDF = async () => {
    try {
      await customerValidationSchema.validate({
        customerName,
        customerID,
        customerPhone,
      });

      if (cart.length === 0) {
        toast.error("El carrito está vacío. No se puede generar el PDF.");
        return;
      }

      const doc = new jsPDF();
      doc.addImage(logo, "PNG", 10, 10, 40, 40);
      doc.setFontSize(20);
      doc.text("Factura", 160, 20);

      const date = new Date().toLocaleDateString();
      doc.setTextColor(150);
      doc.text(date, 160, 30);
      doc.setTextColor(0);

      doc.setFontSize(16);
      doc.text("Tienda Virtual Moto Isla Surl", 10, 60);
      doc.setFontSize(14);
      doc.text("Isla de la Juventud", 10, 70);
      doc.text("+5355541164", 10, 80);

      doc.setFontSize(16);
      doc.text("Dirección de facturación:", 10, 100);
      doc.setFontSize(14);
      doc.text("Tienda en Físico", 10, 110);
      doc.text("Moto Isla Calle 39A entre 47 y 49", 10, 120);
      doc.text("Nueva Gerona", 10, 130);

      const tableData = cart.map((item) => [
        item.nombre,
        item.quantity,
        Number(item.precio).toFixed(2),
        (Number(item.precio) * item.quantity).toFixed(2),
      ]);

      autoTable(doc, {
        head: [
          [
            "Producto",
            "Cantidad",
            "Precio Unitario (CUP)",
            "Precio Total (CUP)",
          ],
        ],
        body: tableData,
        startY: 140,
        theme: "grid",
        styles: { fontSize: 12 },
        headStyles: { fillColor: [22, 160, 133] },
      });

      doc.setFontSize(16);
      const totalYPosition = doc.lastAutoTable.finalY + 10;
      doc.text(`Total: ${totalAmount.toFixed(2)} CUP`, 10, totalYPosition);

      const customerInfoYPosition = totalYPosition + 20;
      doc.setFontSize(14);
      doc.text(
        `Nombre del Cliente: ${customerName}`,
        10,
        customerInfoYPosition
      );
      doc.text(
        `Número de Carnet: ${customerID}`,
        10,
        customerInfoYPosition + 10
      );
      doc.text(
        `Número Telefónico: ${customerPhone}`,
        10,
        customerInfoYPosition + 20
      );

      // Footer Section
      const footerMargin = 10; // Margin from the bottom of the page
      const footerYPosition = doc.internal.pageSize.height - footerMargin; // Positioning footer above bottom margin
      doc.setFontSize(10); // Smaller font size for footer

      // Centering text
      const footerText1 = "Tienda Virtual Moto ISLA Surl - Isla de la Juventud";
      const footerText2 = "Para obtener más ayuda contacte con el soporte:";
      const footerText3 = "Tel: +5359874553";
      const footerText4 = "Atendemos todos los días excepto los domingos";

      const pageWidth = doc.internal.pageSize.getWidth();
      const textWidth1 = doc.getTextWidth(footerText1);
      const textWidth2 = doc.getTextWidth(footerText2);
      const textWidth3 = doc.getTextWidth(footerText3);
      const textWidth4 = doc.getTextWidth(footerText4);

      // Center and position each line of the footer
      doc.text(footerText1, (pageWidth - textWidth1) / 2, footerYPosition);
      doc.text(footerText2, (pageWidth - textWidth2) / 2, footerYPosition + 3);
      doc.text(footerText3, (pageWidth - textWidth3) / 2, footerYPosition + 6);
      doc.text(footerText4, (pageWidth - textWidth4) / 2, footerYPosition + 9);

      // Save the PDF
      doc.save("Factura.pdf");

      toast.success("PDF generado con éxito");

      setOpenConfirmDialog(true);
    } catch (error) {
      toast.error(error.errors ? error.errors[0] : "Error al generar el PDF");
    }
  };
  const handleSendWhatsApp = () => {
    document.getElementById("send-whatsapp").click();
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <Button
        variant="contained"
        color="primary"
        sx={{
          borderRadius: "111px",
          "&:focus": {
            outline: "none",
          },
        }}
        onClick={handleDialogOpen}
      >
        Comprobante de Compra
      </Button>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Información del Cliente</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre del Cliente"
            type="text"
            fullWidth
            variant="outlined"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Número de Carnet"
            type="text"
            fullWidth
            variant="outlined"
            value={customerID}
            onChange={(e) => setCustomerID(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Número Telefónico"
            type="text"
            fullWidth
            variant="outlined"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cerrar
          </Button>
          <Button
            onClick={handleGeneratePDF}
            color="primary"
            disabled={!isFormValid()}
          >
            Generar PDF
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          <p>
            Se ha generado un comprobante de compra en formato PDF. Por favor,
            proporciónelo al gestor de ventas vía WhatsApp para continuar con el
            proceso.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSendWhatsApp} color="primary">
            Enviar WhatsApp
          </Button>
        </DialogActions>
      </Dialog>

      <WhatsAppSender
        customerName={customerName}
        customerID={customerID}
        customerPhone={customerPhone}
        cart={cart}
        totalAmount={totalAmount}
      />
    </Box>
  );
};

export default GeneratePDFAndPurchase;
