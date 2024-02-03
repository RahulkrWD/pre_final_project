import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from './HomePage/NavBar';
import Footer from './HomePage/Footer';
import GoogleAuthLogin from './GoogleAuth/GoogleAuthLogin';
import { GoogleOAuthProvider } from '@react-oauth/google';


const defaultTheme = createTheme();

export default function Login() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
   const response = await axios.post("https://trails-6dwz.onrender.com/createUser/login", {
        email,
        password,
      });
      console.log("Login successful!");
      navigate("/");    
      // Assuming the server sends the JWT token in the response.data.token
      const token = response.data.token
      // store the token in localStorage
      localStorage.setItem("authtoken", token);
  // console.log(token)
    
    } catch (error) {
      console.error("Error during login:", error.response.data.error);
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              autoFocus
              value={email}
         onChange={(e) => setEmail(e.target.value.toLowerCase())}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
           onChange={(e) => setPassword(e.target.value.toLowerCase())}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <center>
            <GoogleOAuthProvider clientId="943812210495-8b302cofk4i6pqhmof6tt6b9gc4bs1vn.apps.googleusercontent.com">
            <GoogleAuthLogin/>
    </GoogleOAuthProvider>
    <br/>
           
           
            <p>
            New user, create an account
            <Link to={'/signup'}>SignUp</Link>
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

