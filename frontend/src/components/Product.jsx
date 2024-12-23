import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router";

function Product({ product }) {
  const { name, price, imageUrl } = product;

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }

    let cart = localStorage.getItem("cart");
    if (!cart) {
      cart = [];
    } else {
      cart = JSON.parse(cart);
    }

    cart.push(product);

    // Remove duplicates (one quantity per product)
    cart = cart.filter((obj1, i, arr) =>
      arr.findIndex((obj2) => (obj2.id === obj1.id)) === i
    );

    localStorage.setItem("cart", JSON.stringify(cart));

    setOpen(true);
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          width="400"
          height="275"
          image={imageUrl}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {price} €
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          startIcon={<AddShoppingCartIcon />}
          onClick={handleClick}
        >
          Ajouter
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message="Produit ajouté au panier"
        />
      </CardActions>
    </Card>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }),
};

export default Product;
