import { Box, Card, CardContent, Typography } from "@mui/material";
import ky from "ky";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout.jsx";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await ky.get("/api/products").json();
        setProducts(products);
      } catch {
        navigate("/");
      }
    };

    if (navigate) {
      fetchProducts();
    }
  }, [navigate]);

  // Check if user is logged in
  useEffect(() => {
    if (navigate) {
      let user = localStorage.getItem("user");
      if (!user) {
        navigate("/");
      }
      user = JSON.parse(user);

      const fetchOrders = async (userId) => {
        try {
          const orders = await ky.get(`/api/orders?user_id=${userId}`).json();
          setOrders(orders);
        } catch {
          return;
        }
      };

      fetchOrders(user.id);
    }
  }, [navigate]);

  const getProductName = (id) => {
    const product = products.find((product) => product.id == id);
    if (product) {
      return product.name;
    }
    return "";
  };

  return (
    <Layout>
      <Box
        sx={{
          width: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          flexWrap: "wrap",
        }}
      >
        {!orders.length && (
          <Typography>Vous n&apos;avez pas de commande</Typography>
        )}
        {orders.length > 0 &&
          orders.map((order) => (
            <Card key={order.id} sx={{ width: "100%" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6">Date : {order.date}</Typography>
                  <Typography variant="h6">#{order.id}</Typography>
                </Box>
                <Typography variant="subtitle1">
                  En cours de traitement
                </Typography>
                <Box sx={{ py: 1 }} />
                {order.productsToOrders.map((product) => (
                  <Typography key={product.productId}>
                    {getProductName(product.productId)}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          ))}
      </Box>
    </Layout>
  );
}

export default Orders;
