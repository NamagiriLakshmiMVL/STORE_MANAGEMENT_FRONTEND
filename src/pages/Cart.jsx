import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { API } from "../API";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { TextField, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {toast} from "react-toastify"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Cart() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Cash");
  const token = localStorage.getItem("x-auth-token")

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [subTotal, setSubTotal] = useState(0);
  const cartItems = useSelector((state) => state.itemShop.cartItems);
 
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => {
      temp = temp + item.price * item.qty;
    });
    setSubTotal(temp);
  }, [cartItems]);
  const handleSelect = (e) => {
    setValue(e.target.value);
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqObject = {
      customerName: e.target.customerName.value,
      customerPhoneNumber: e.target.phoneNumber.value,
      totalAmount: Number(subTotal + (subTotal / 100) * 2),
      tax: Number(((subTotal / 100) * 2).toFixed(2)),
      subTotal,
      paymentMode: value,
      billId: Math.random(),
      cartItems,
    };
    localStorage.setItem("bill", reqObject.billId);
    await axios
      .post(`${API}/bills/charge-bill`, reqObject, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
       (res.data === "Added SuccessFully")? navigate("/bills") : toast.error(res.data,{
        position:"top-center",
        autoClose:1000
       })
       
      });
  };

  return (
    <Box>
      <Box>
        <Typography variant="h5">My Cart ({cartItems.length})</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {cartItems.map((item) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  border: "1px solid #EBE3D5",
                  width: "80%",
                  gap: "40px",
                  marginTop: "30px",
                  backgroundColor: "#EEEDEB",
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
                  <Typography
                    sx={{
                      marginTop: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    variant="h5"
                  >
                    Price - <CurrencyRupeeIcon />
                    {item.price * item.qty}
                  </Typography>
                  <Typography sx={{ marginTop: "10px" }} variant="h5">
                    Quantity - {item.qty} Kg
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Typography
        sx={{ marginTop: "20px", marginLeft: "68%", fontWeight: "bold" }}
        variant="h5"
      >
        SubTotal : {subTotal}
      </Typography>
      <Button
        size="4s0px"
        onClick={handleOpen}
        sx={{ marginTop: "20px", marginLeft: "70%" }}
        variant="contained"
      >
        Click to Bill
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Typography variant="h4">Bill</Typography>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                marginTop: "15px",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Customer Name:</Typography>
              <TextField size="small" name="customerName" />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                marginTop: "15px",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Customer Phone Number:</Typography>
              <TextField size="small" name="phoneNumber" />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                marginTop: "15px",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Payment Mode:</Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                onChange={handleSelect}
                size="small"
              >
                <MenuItem value={"Cash"}>Cash</MenuItem>
                <MenuItem value={"Card"}>Card</MenuItem>
              </Select>
            </Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginTop: "15px" }}
            >
              Sub Total: {subTotal}
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginTop: "15px" }}
            >
              Tax: {((subTotal / 100) * 2).toFixed(2)}
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginTop: "15px" }}
            >
              Total Amount: {subTotal + (subTotal / 100) * 2}
            </Typography>
            <Button
              sx={{ marginTop: "15px", marginLeft: "330px" }}
              type="submit"
              variant="contained"
            >
              Generate Bill
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}
export default Cart;
