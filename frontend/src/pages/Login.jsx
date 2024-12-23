import { Box, Button, TextField, Typography } from "@mui/material";
import ky from "ky";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Layout from "../components/Layout";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await ky.post("/api/login", {
        json: {
          email,
          password,
        },
      }).json();

      localStorage.setItem("user", JSON.stringify(user));
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
          alignItems: "center",
          gap: 3,
          width: "500px",
        }}
      >
        <Typography variant="h4" alignSelf="start">Connexion</Typography>

        <TextField
          type="email"
          label="Adresse mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          type="password"
          label="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />

        <Button type="submit" variant="contained" fullWidth>Connexion</Button>

        <Link to="/register">
          <Typography>Pas encore de compte ? Inscrivez-vous</Typography>
        </Link>
      </Box>
    </Layout>
  );
}

export default Login;
