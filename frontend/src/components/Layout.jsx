import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { IconButton } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

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
                Swarm
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
                <Box sx={{ display: "flex", gap: 3 }}>
                  <Link to="/cart">
                    <IconButton sx={{ color: "white" }}>
                      <ShoppingCart />
                    </IconButton>
                  </Link>
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
