import { createRoot } from "react-dom/client";
import Products from "./pages/Products.jsx";
import Login from "./pages/Login.jsx";
import Logout from "./pages/Logout.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  </BrowserRouter>,
);
