import { Box, Button } from "@mui/material";
import React,{useState} from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/itemSlice";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
export function Wishlist(props) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const favorites = useSelector((state) => state.favoriteSlice.favItems);

  const handleCart = (item) => {
    const result = {
      qty,
      ...item,
    };
    dispatch(addToCart(result));
  };
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        My Wishlist ({favorites.length})
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "50px" }}>
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
                <Box sx={{marginTop:"15px"}}>
                <Button onClick={() => setQty(qty - 1)}>
                  <RemoveIcon />
                </Button>
                {qty}
                <Button onClick={() => setQty(qty + 1)}>
                  <AddIcon />
                </Button>
                </Box>
                <Button
                  sx={{ marginTop: "20px",marginBottom:"10px" }}
                  onClick={() => handleCart(item)}
                  variant="outlined"

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
