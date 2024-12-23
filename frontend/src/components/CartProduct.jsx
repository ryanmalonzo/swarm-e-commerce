import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

function CartProduct({ product }) {
  const { name, price, imageUrl } = product;

  return (
    <Card>
      <CardActionArea sx={{ display: "flex", flexDirection: "row" }}>
        <CardMedia
          component="img"
          width="200"
          height="150"
          image={imageUrl}
          alt={name}
        />
        <CardContent sx={{ width: "100%", px: 5 }}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {price} €
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

CartProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }),
};

export default CartProduct;
