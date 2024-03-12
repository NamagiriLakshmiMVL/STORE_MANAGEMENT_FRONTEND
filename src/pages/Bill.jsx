import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../API";
import { Box, Button, Divider, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ReactToPrint from "react-to-print";
import { useSelector } from "react-redux";

import { useReactToPrint } from "react-to-print";

export function Bill() {
  const cartItems = useSelector((state) => state.itemShop.cartItems);

  const componentRef = React.useRef(null);
  const [billData, setBillData] = useState([]);
  const data = localStorage.getItem("bill");
  const res = { id: data };
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .post("http://localhost:2000/bills/get-bill", res)
        .then((res) => setBillData(res.data));
    };
    fetchData();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  console.log(billData);
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", marginBottom: "20px" }}
      >
        Billing Page
      </Typography>
      <Box ref={componentRef}>
        <Table sx={{ width: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "20px" }}>Customer Name</TableCell>
              <TableCell sx={{ fontSize: "20px" }}>
                Customer Phone Number
              </TableCell>
              <TableCell sx={{ fontSize: "20px" }}>Total Amount</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {billData.map((item) => (
              <TableRow>
                <TableCell sx={{ fontSize: "15px", fontWeight: "bold" }}>
                  {item.customerName}
                </TableCell>
                <TableCell sx={{ fontSize: "15px", fontWeight: "bold" }}>
                  {item.customerPhoneNumber}
                </TableCell>
                <TableCell sx={{ fontSize: "15px", fontWeight: "bold" }}>
                  {item.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ border: "1px solid black", width: 630, padding: "10px" }}>
          <Typography sx={{ textAlign: "center" }} variant="h5">
            Items Purchased
          </Typography>
          <Divider sx={{ borderColor: "black" }} />
          <Box
            sx={{
              display: "flex",
              gap: "50px",
              marginTop: "10px",
              marginLeft: "50px",
            }}
          >
            <Typography variant="h5">Name</Typography>
            <Typography variant="h5">Quantity</Typography>
            <Typography variant="h5">Price</Typography>
          </Box>
          <Divider sx={{ borderColor: "black" }} />
          {cartItems.map((item) => (
            <Box
              sx={{
                display: "flex",
                gap: "50px",
                marginTop: "10px",
                marginLeft: "50px",
              }}
            >
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="h6">{item.qty}</Typography>
              <Typography variant="h6" sx={{ marginLeft: "65px" }}>
                {item.price}
              </Typography>
            </Box>
          ))}
          <Divider sx={{ borderColor: "black" }} />

          {billData.map((item) => (
           
            <Box sx={{ marginLeft: "400px", fontWeight: "bold" }}>
              <Typography sx={{ fontWeight: "bold" }} variant="h6">
                Subtotal : {item.subTotal}
              </Typography>
              <Typography sx={{ fontWeight: "bold" }} variant="h6">
                Tax : {item.tax}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Total Amount : {item.totalAmount}
              </Typography>
            </Box>
          ))}
        </Box>

        <Button
          sx={{ marginLeft: "540px", marginTop: "20px" }}
          type="submit"
          onClick={handlePrint}
          variant="contained"
        >
          Print Bill
        </Button>
      </Box>
    </Box>
  );
}

export default Bill;
