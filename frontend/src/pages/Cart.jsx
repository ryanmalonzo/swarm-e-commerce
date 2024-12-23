import { useEffect, useRef } from "react";
import Layout from "../components/Layout.jsx";
import { useNavigate } from "react-router";
import CartProduct from "../components/CartProduct.jsx";
import { useState } from "react";
import { Box, Button, Snackbar, Typography } from "@mui/material";
import ky from "ky";

function Cart() {
  const userId = useRef(null);

  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    if (navigate) {
      let user = localStorage.getItem("user");
      if (!user) {
        navigate("/");
      }
      user = JSON.parse(user);
      userId.current = user.id;
    }
  }, [navigate]);

  useEffect(() => {
    if (navigate) {
      const localCart = localStorage.getItem("cart");
      if (!localCart) {
        navigate("/");
      }
      setCart(JSON.parse(localCart));
    }
  }, [navigate]);

  const handleClick = async () => {
    try {
      await ky.post("/api/orders", {
        json: {
          userId: userId.current,
          products: cart,
        },
      });

      localStorage.setItem("cart", JSON.stringify([]));
      setCart([]);

      setOpen(true);
    } catch {
      return;
    }
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {!cart.length > 0 && <Typography>Votre panier est vide</Typography>}
        {cart.map((product) => (
          <CartProduct key={product.id} product={product} />
        ))}

        {cart.length > 0 && (
          <Button variant="contained" onClick={handleClick}>Commander</Button>
        )}
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message="Votre commande a bien été enregistrée"
        />
      </Box>
    </Layout>
  );
}

export default Cart;
