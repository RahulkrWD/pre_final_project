import React, { useState } from 'react';
import NavBar from "../HomePage/NavBar";
import styles from "../PlaceOrder/PlaceOrder.module.css";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function PlaceOrder() {
    const restaurantName = sessionStorage.getItem("restaurant");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const orderId = Math.floor(Math.random() * 100000 + 100000);

  const cost = sessionStorage.getItem("totalPrice");
  const restName = sessionStorage.getItem("restaurant");
  const orderItems = sessionStorage.getItem("menu");

 const sessionData = sessionStorage.getItem("userInfo");
    let data  = JSON.parse(sessionData);
    let uniqueId = data.uniqueId
    const navigate = useNavigate()
    async function fetchData(){

        await axios.post("https://trails-6dwz.onrender.com/restaurant/placeOrder",{
         orderId, name, email, phone, address, cost, restName, orderItems, uniqueId
         });
        // console.log(response.data);
         navigate("/Myorder")
       
         }
    

  return (
    <>
     <div className="bg-dark mb-4">
      <NavBar/>
    </div>

    <div className={`container ${styles.container}`}>
    <div className='restaurant-name'>
    <h3> Order for {restaurantName}</h3>
    <hr/>
    </div>
    <div className={styles.details}>
    <TextField id="outlined-name-input" value={name} onChange={(e)=> setName(e.target.value)} label="Name" variant="outlined" />
    <TextField id="outlined-basic" label="Email" value={email} onChange={(e)=> setEmail(e.target.value)} variant="outlined" />
    
    <TextField id="outlined-number-input" label="Phone Number" value={phone} onChange={(e)=> setPhone(e.target.value)} variant="outlined" />

    <TextField id="outlined-address-input" label="Address" value={address} onChange={(e)=> setAddress(e.target.value)} variant="outlined" />
    </div>
   <center>
   <button className='btn text-bg-success' onClick={fetchData}>Click</button>
   </center>
    </div>
   
      
    </>
  )
}

export default PlaceOrder
