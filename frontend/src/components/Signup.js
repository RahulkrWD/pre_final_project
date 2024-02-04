import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./HomePage/NavBar";
import Footer from "./HomePage/Footer";
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleAuth from "./GoogleAuth/GoogleAuth";

const defaultTheme = createTheme();

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const uniqueId = Math.ceil(Math.random() * 999999);

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("https://trails-6dwz.onrender.com/register", {
        name, email, phone, password, uniqueId
        
      });
      console.log("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error.response.data.error);
    }
  };

  return (
    <>
<div className="bg-dark">
<NavBar/>

</div>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Name"
              type="text"
              id="name"
              autoComplete="current-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              type="email"
              id="email"
              autoComplete="current-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Phone Number"
              type="text"
              id="phone"
              autoComplete="current-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              id="password"
              label="password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignup}
            >
              Sign In
            </Button>
            <center>
            <GoogleOAuthProvider clientId="943812210495-8b302cofk4i6pqhmof6tt6b9gc4bs1vn.apps.googleusercontent.com">
           <GoogleAuth/>
    </GoogleOAuthProvider>
    <br/>
           
              <p>
                Already have an account?
                <Link to={"/login"}> Login</Link>
              </p>
            </center>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    <Footer/>
   
    
    </>
  );
}


