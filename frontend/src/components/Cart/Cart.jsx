import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Backdrop,
  useMediaQuery,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { CartContext } from "./CartContext";
import emptyCartImage from "./EmptyC.png";
import GeneratePDFAndPurchase from "./GeneratePDFAndPurchase";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./Cart.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Cart = () => {
  const { cart, clearCart, removeItem, updateQuantity } =
    useContext(CartContext);
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);
  const handleConfirmClear = () => {
    clearCart();
    handleCloseDialog();
  };

  const handleRemoveItem = (id) => {
    removeItem(id);
    toast.error("Producto eliminado", {
      position: "top-center",
      style: {
        background: "#dc3545",
        color: "#fff",
      },
    });
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  return (
    <Box className="cart-container">
      <Toaster />
      <Box className="cart-header">
        <Typography
          variant="h4"
          fontFamily={"Qaranta"}
          sx={{ alignItems: "center" }}
        >
          Carrito <ShoppingCartIcon />{" "}
        </Typography>
        {cart.length > 0 && (
          <Button
            color="error"
            variant="contained"
            sx={{
              borderRadius: "111px",
              "&:focus": {
                outline: "none",
              },
            }}
            onClick={handleOpenDialog}
          >
            {isMobile ? <RestartAltIcon /> : "Restablecer Carrito"}
          </Button>
        )}
      </Box>
      <Typography
        variant="h6"
        className="total-amount"
        sx={{ marginBottom: "7px" }}
      >
        Importe Total: {totalAmount} CUP
      </Typography>

      {cart.length === 0 ? (
        <Box className="empty-cart">
          <img
            src={emptyCartImage}
            alt="Carrito vacío"
            className={
              isMobile ? "empty-cart-image-mobile" : "empty-cart-image"
            }
          />
          <Typography color="gray" variant="body1">
            Tu carrito está vacío.
          </Typography>
          <Button
            variant="contained"
            color="error"
            sx={{
              borderRadius: "111px",
              "&:focus": {
                outline: "none",
              },
            }}
          >
            <Link to="/" className="home-link">
              Ir a todos los productos
            </Link>
          </Button>
        </Box>
      ) : (
        <Box className="product-list">
          {cart.map((item) =>
            isMobile ? (
              <Box
                key={item.id}
                className="product-item"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px",
                  gap: 2,
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      flex: "0 0 auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "10px",
                    }}
                  >
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={`http://localhost:8000/media/Productos/${item.imagen
                          .split("/")
                          .pop()}`}
                        alt={item.nombre}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "contain",
                        }}
                      />
                    </Link>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      padding: "10px",
                      gap: "5px",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.3rem",
                        textAlign: "left",
                      }}
                    >
                      {item.nombre}
                    </Typography>
                    <Typography
                      sx={{
                        
                        color: "gray",
                      }}
                    >
                      Precio Unitario: {item.precio} CUP
                    </Typography>
                    <Typography
                      sx={{
                        
                        color: "gray",
                      }}
                    >
                      Importe Total: {item.precio * item.quantity} CUP
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={() =>
                        updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                      }
                      sx={{
                        color: "grey",

                        "&:hover": {
                          color: "red",
                        },
                        "&:focus": {
                          outline: "none",
                          boxShadow: "none",
                        },
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      sx={{
                        color: "grey",

                        "&:hover": {
                          color: "green",
                        },
                        "&:focus": {
                          outline: "none",
                          boxShadow: "none",
                        },
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <IconButton
                    onClick={() => handleRemoveItem(item.id)}
                    sx={{
                      marginLeft: "190px",
                      color: "#D32F2F",

                      "&:hover": {
                        color: "red",
                      },
                      "&:focus": {
                        outline: "none",
                        boxShadow: "none",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ) : (
              <Box
                key={item.id}
                className="product-item-container"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "20px",
                  overflow: "auto",
                }}
              >
                <Box
                  className="product-item-desktop"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                  }}
                >
                  <Link
                    to={`/product/${item.id}`}
                    style={{
                      width: "350px",
                    }}
                  >
                    <img
                      src={`http://localhost:8000/media/Productos/${item.imagen
                        .split("/")
                        .pop()}`}
                      alt={item.nombre}
                      style={{
                        width: "100px",
                        height: "80px",
                        objectFit: "contain",
                      }}
                    />
                  </Link>
                  <Box sx={{ width: "480px", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {item.nombre}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "420px", alignItems: "center" }}>
                    <Typography >
                      Precio Unitario
                    </Typography>
                    <Typography sx={{ color: "gray" }}>
                      {item.precio} CUP
                    </Typography>
                  </Box>
                  <Box sx={{ width: "420px", alignItems: "center" }}>
                    <Typography >
                      Importe Total
                    </Typography>
                    <Typography sx={{ color: "gray" }}>
                      {item.precio * item.quantity} CUP
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton
                      onClick={() =>
                        updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                      }
                      sx={{
                        color: "grey",

                        "&:hover": {
                          color: "red",
                        },
                        "&:focus": {
                          outline: "none",
                          boxShadow: "none",
                        },
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      sx={{
                        color: "grey",

                        "&:hover": {
                          color: "green",
                        },
                        "&:focus": {
                          outline: "none",
                          boxShadow: "none",
                        },
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleRemoveItem(item.id)}
                      sx={{
                        color: "#d32f2f",

                        "&:hover": {
                          color: "red",
                        },
                        "&:focus": {
                          outline: "none",
                          boxShadow: "none",
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            )
          )}
        </Box>
      )}
      {cart.length >= 1 && (
        <Box sx={{ marginTop: 2 }}>
          <GeneratePDFAndPurchase />
        </Box>
      )}
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        BackdropComponent={Backdrop}
        BackdropProps={{
          style: {
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          },
        }}
      >
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas vaciar todo el carrito? Esta acción no
            se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              borderRadius: "111px",
              "&:focus": {
                outline: "none",
              },
            }}
            onClick={handleCloseDialog}
          >
            No
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{
              borderRadius: "111px",
              "&:focus": {
                outline: "none",
              },
            }}
            onClick={handleConfirmClear}
          >
            Si
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cart;
