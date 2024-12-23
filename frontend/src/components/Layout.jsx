import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";

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
            <Typography variant="h6" component="div">
              Swarm
            </Typography>
            <Box sx={{ flex: 1, pl: 5 }}>
              <Button color="inherit">Produits</Button>
            </Box>
            {user
              ? <Button color="inherit">Bienvenue</Button>
              : <Button color="inherit">Connexion</Button>}
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
