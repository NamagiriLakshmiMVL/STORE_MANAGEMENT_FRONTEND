import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../API";
import Item from "./Item";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, TextField } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
function Home() {
  const navigate = useNavigate();
  const [itemData, setItemData] = useState([]);
  const [search, setSearch] = useState("");

  const cartItems = useSelector((state) => state.itemShop.cartItems);
  const FavItems = useSelector((state) => state.favoriteSlice.favItems);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const result = { data: search };
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .post("http://localhost:2000/items/get-items", result)
        .then((res) => setItemData(res.data));
    };
    fetchData();
  }, [cartItems, FavItems, search]);
  console.log(search);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ marginLeft: "20px" }}>
          <Typography variant="h4">Store Management</Typography>
        </Box>

        <Box sx={{ marginLeft: "50px" }}>
          <TextField
            placeholder="  Search Products"
            onChange={(e) => handleChange(e)}
            id="outlined-basic"
            variant="standard"
            sx={{
              height: "40px",
              width: { xs: "160px", sm: "300px", md: "500px" },
              border: "1px solid grey",
              borderRadius: "10px",
            }}
            InputProps={{
              disableUnderline: true,
              style: {
                height: "50px",
              },
            }}
          />
        </Box>

        <Box sx={{ display: "flex" }}>
          <Button
            variant="dark"
            onClick={() => navigate("/favorites")}
            startIcon={<FavoriteIcon />}
            sx={{ border: "1px solid black", marginLeft: "150px" }}
          >
            <b>My Wishlist ({FavItems.length})</b>
          </Button>
          <Button
            variant="dark"
            onClick={() => navigate("/cart")}
            startIcon={<ShoppingCartIcon />}
            sx={{ border: "1px solid black", marginLeft: "30px" }}
          >
            <b> Cart ({cartItems.length})</b>
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "40px",
        }}
      >
        {itemData.map((item) => (
          <Item key={item._id} item={item} />
        ))}
      </Box>
    </>
  );
}
export default Home;
