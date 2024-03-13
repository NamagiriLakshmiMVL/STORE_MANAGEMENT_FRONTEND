import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/itemSlice";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { favorites } from "../redux/FavSlice";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";

export default function Item({ item }) {
  const [cart, setCart] = useState(true);
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState(false);
  const [qty, setQty] = useState(1);
  const handleSubmit = (item) => {
    toast.success("Added to Cart", {
      position: "top-center",
      autoClose: 1000,
    });
    setCart(!cart);
    const result = {
      qty,
      ...item,
    };
    dispatch(addToCart(result));
  };
  const handleFavorite = (item) => {
    setFavorite(!favorite);
    dispatch(favorites(item));
  };
  return (
    <div>
      <Card sx={{ width: 200, border: "1px solid grey" }}>
        <CardMedia sx={{ height: 160 }} image={item.image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Price: {item.price}/Kg
          </Typography>
        </CardContent>
        <Button onClick={() => setQty(qty - 1)}>
          <RemoveIcon />
        </Button>
        {qty}
        <Button onClick={() => setQty(qty + 1)}>
          <AddIcon />
        </Button>

        <CardActions sx={{ display: "flex" }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleSubmit(item)}
          >
            {cart === true ? "Add To Cart" : "Remove Cart"}
          </Button>
          <Button onClick={() => handleFavorite(item)}>
            {favorite === false ? (
              <FavoriteBorderOutlinedIcon />
            ) : (
              <FavoriteOutlinedIcon />
            )}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
