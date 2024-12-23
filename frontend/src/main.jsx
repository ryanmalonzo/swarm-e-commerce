import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Logout from "./pages/Logout.jsx";
import Orders from "./pages/Orders.jsx";
import Products from "./pages/Products.jsx";
import Register from "./pages/Register.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/products" element={<Products />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  </BrowserRouter>,
);
