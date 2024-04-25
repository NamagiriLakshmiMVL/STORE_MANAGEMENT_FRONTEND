import React from "react";
import { API } from "../API";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    const name = data.get("name");
    const mobile = data.get("mobile");
    const userDetails = {
      email,
      password,
      name,
      mobile,
    };
    await axios
      .post(`${API}/users/register`, userDetails)
      .then((res) => {
        res.data.message === "User Added Successfully"
          ? toast.success(res.data.message, {
              position: "top-center",
              autoClose: 1000,
            }) && navigate("/home")
          : toast.error(res.data.message, {
              position: "top-center",
              autoClose: 1000,
            });
            localStorage.setItem("x-auth-token",res.data.token)

      });
  };
  return (
    <Box>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Typography sx={{ textAlign: "center" }} variant="h3">
          Store Management
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button size="large" onClick={() => navigate("/login")}>
            Login
          </Button>

          <Button
            sx={{ textDecoration: "underline" }}
            size="large"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </Box>
        <Box sx={{ marginTop: "20px",marginLeft:"38%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "40px",
              marginTop: "20px",
            }}
          >
            <Typography>Name : </Typography>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              name="name"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "38px",
              marginTop: "20px",
            }}
          >
            <Typography>Mobile : </Typography>
            <TextField
              id="outlined-basic"
              label="Mobile"
              variant="outlined"
              name="mobile"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "44px",
              marginTop: "20px",
            }}
          >
          
            <Typography>Email :</Typography>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name="email"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              marginTop: "20px",
            }}
          >
            <Typography>Password : </Typography>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              name="password"
            />
          </Box>

          <Box sx={{marginTop:"20px",marginLeft:"90px"}}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default Signup;
