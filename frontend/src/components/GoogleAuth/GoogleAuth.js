import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GoogleAuth() {
  const navigate = useNavigate();
  const uniqueId = Math.ceil(Math.random() * 999999);

  const handleGoogleSignup = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse?.credential);
      const name = decoded.name;
      const email = decoded.email;

    //  console.log(name, email);

      // Make a POST request to your server for Google signup
      await axios.post('https://trails-6dwz.onrender.com/createUser/signup/googleAuth', {
        name, email,uniqueId
        // other fields as needed
      });

      console.log('Google Signup successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error during Google signup:', error);
       
      if(error.response){
        console.log('response data',error.response.data)
      }
    }
  };

  return (
    <>
      <GoogleLogin
        onSuccess={handleGoogleSignup}
        onError={() => {
          console.log('Google Signup Failed');
        }}
      />
    </>
  );
}

export default GoogleAuth;

