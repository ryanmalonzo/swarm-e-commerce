import Layout from "../components/Layout";
import ky from "ky";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const json = await ky.post("/api/login", {
        json: {
          email,
          password,
        },
      }).json();

      localStorage.setItem("user", JSON.stringify(json));
      localStorage.setItem("cart", JSON.stringify([]));

      navigate("/");
    } catch {
      return;
    }
  };

  return (
    <Layout>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "500px",
        }}
      >
        <Typography variant="h4">Connexion</Typography>
        <TextField
          type="email"
          label="Adresse mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          type="password"
          label="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">Connexion</Button>
      </Box>
    </Layout>
  );
}

export default Login;
