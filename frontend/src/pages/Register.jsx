import { Box, Button, TextField, Typography } from "@mui/material";
import ky from "ky";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Layout from "../components/Layout";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await ky.post("/api/register", {
        json: {
          firstName,
          lastName,
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
        <Typography variant="h4" alignSelf="start">Inscription</Typography>

        <Box sx={{ display: "flex", gap: 3, width: "100%" }}>
          <TextField
            label="Prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            fullWidth
          />
        </Box>

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
        <Button type="submit" variant="contained" fullWidth>Inscription</Button>

        <Link to="/login">
          <Typography>Déjà un compte ? Connectez-vous</Typography>
        </Link>
      </Box>
    </Layout>
  );
}

export default Register;
