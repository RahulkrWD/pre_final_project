import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from "./HomePage/NavBar";
import OrderDetails from "./OrderDetails";
function MyOrder() {
    const [value, setValue] = useState([]);
    const sessionData = sessionStorage.getItem("userInfo");
    let data  = JSON.parse(sessionData);
    async function fetchMyorder(){
     const response = await axios.get(`http://localhost:4200/restaurant/order?id=${data.uniqueId}`);
        setValue(response.data);
       // console.log(response.data)
    }
    useEffect(()=>{
        fetchMyorder()
    })
  return (
    <>
     <div className='bg-dark'>
    <NavBar/>
    </div>
    <div className="container"> 
    <center>
    <h3 className='border-bottom border-2 p-1 border-primary'>order details</h3>
    </center> 
            
  <table className="table">
    <thead>
      <tr>
        <th className='text-success'>orderId</th>
        <th className='text-success'>restaurant</th>
        <th className='text-success'>Address</th>
        <th className='text-success'>Cost</th>
      </tr>
    </thead>
    <tbody>
   
    {value.map((data, index)=>(
    <tr key={index}>
    <td><OrderDetails datas={data}/></td>
        <td>{data.restName}</td>
        <td>{data.address}</td>
        <td>{data.cost}</td>
      </tr>
      ))}
    </tbody>
  </table>
</div>
      
    </>
  )
}

export default MyOrder
