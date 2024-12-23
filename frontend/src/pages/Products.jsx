import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Product from "../components/Product";
import ky from "ky";
import { Box } from "@mui/material";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await ky.get("/api/products").json();
      setProducts(products);
    };

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
        {products.length > 0 &&
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

export default Products;
