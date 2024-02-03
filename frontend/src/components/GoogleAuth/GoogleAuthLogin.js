import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GoogleAuthLogin() {
    const navigate = useNavigate();

    const handleGoogleLogin = async (credentialResponse) => {
      try {
        const decoded = jwtDecode(credentialResponse?.credential);
        const name = decoded.name;
        const email = decoded.email;
  
      //  console.log(name, email);
  
        // Make a POST request to your server for Google login
      const response = await axios.post('http://localhost:4200/createUser/googleAuth/login', {
          name,
          email,
        
        });
  
        console.log('Google login successfully');
        navigate('/');
         // Assuming the server sends the JWT token in the response.data.token
      const token = response.data.token
      // store the token in localStorage
      localStorage.setItem("authtoken", token);
  // console.log(token)
      } catch (error) {
        console.error('Error during Google login:', error);
         
        if(error.response){
          console.log('response data',error.response.data)
        }
      }
    };
  return (
    <>
    <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => {
          console.log('Google Signup Failed');
        }}
      />
      
    </>
  )
}

export default GoogleAuthLogin
