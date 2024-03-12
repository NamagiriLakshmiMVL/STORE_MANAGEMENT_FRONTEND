import { Box, Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/itemSlice";
import {toast} from "react-toastify"

export function Wishlist(props) {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favoriteSlice.favItems);
  console.log(favorites);

  const handleCart = (item) => {
    toast.success("Dipatched",{
      position:"top-center",
      autoClose:1000
    });
    dispatch(addToCart(item));
  };
  return (
    <Box>
      <Typography variant="h5" sx={{fontWeight:"bold"}}>My Wishlist ({favorites.length})</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap",gap:"50px" }}>
        {favorites.map((item) => {
          return (
            <Box
              sx={{
                display: "flex",
                border: "1px solid black",
                width: "30%",
                gap: "40px",
                marginTop: "30px",
              }}
            >
              <Box>
                <Box
                  component="img"
                  sx={{
                    height: 150,
                    width: 150,
                  }}
                  src={item.image}
                  alt={item.name}
                />
              </Box>
              <Box>
                <Typography variant="h4">{item.name}</Typography>
                <Typography sx={{ marginTop: "10px" }} variant="h5">
                  Price {item.price}/Kg
                </Typography>
                <Button
                  sx={{ marginTop: "20px" }}
                  onClick={() => handleCart(item)}
                >
                  Add to Cart
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
