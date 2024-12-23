import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Product from "../components/Product";
import ky from "ky";
import { Box } from "@mui/material";

function Home() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const json = await ky.get("/api/products").json();
    setProducts(json);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {products.length &&
          products.map((product) => (
            <Product
              key={product.id}
              product={product}
            />
          ))}
      </Box>
    </Layout>
  );
}

export default Home;
