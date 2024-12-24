import { ShoppingCart } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router";

function Layout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  return (
    <Box sx={{ width: "100vw", minHeight: "100vh" }}>
      {/* Nav */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              <Typography variant="h6" component="div">
                ClassicWheels
              </Typography>
            </Link>
            <Box sx={{ display: "flex", flex: 1, pl: 5, gap: 3 }}>
              <Link to="/products" style={{ color: "white" }}>
                <Button color="inherit">Produits</Button>
              </Link>
              {user && (
                <Link to="/orders" style={{ color: "white" }}>
                  <Button color="inherit">Commandes</Button>
                </Link>
              )}
            </Box>
            {user
              ? (
                <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                  <Link to="/cart">
                    <IconButton sx={{ color: "white" }}>
                      <ShoppingCart />
                    </IconButton>
                  </Link>

                  <Typography>Bienvenue, {user.firstName}</Typography>

                  <Link to="/logout" style={{ color: "white" }}>
                    <Button color="inherit">Déconnexion</Button>
                  </Link>
                </Box>
              )
              : (
                <Link to="/login" style={{ color: "white" }}>
                  <Button color="inherit">Connexion</Button>
                </Link>
              )}
          </Toolbar>
        </AppBar>
      </Box>

      {/* Main */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
          px: 10,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
