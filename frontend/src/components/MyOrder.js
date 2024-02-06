import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from "./HomePage/NavBar";
import OrderDetails from "./OrderDetails";

function MyOrder() {
    const [value, setValue] = useState([]);
    const [deletedOrderId, setDeletedOrderId] = useState(null);
    const sessionData = sessionStorage.getItem("userInfo");
    let data  = JSON.parse(sessionData);

    async function fetchMyorder() {
        try {
            const response = await axios.get(`http://localhost:4200/restaurant/order?id=${data.uniqueId}`);
            setValue(response.data);
        } catch (err) {
            console.log("Error fetching orders", err);
        }
    }

    async function deleteOrder(orderId) {
        try {
         const response =  await axios.delete(`http://localhost:4200/restaurant/delete/${orderId}`);
            setDeletedOrderId(response.data);
        } catch (err) {
            console.log("Order not deleted", err);
        }

    }

    useEffect(() => {
        fetchMyorder();
    },[deletedOrderId] ); // Add deletedOrderId to the dependency array to refetch orders after deletion

    return (
        <>
            <div className='bg-dark'>
                <NavBar />
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
                            <th className='text-success'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {value.map((data, index) => (
                            <tr key={index}>
                                <td><OrderDetails datas={data} /></td>
                                <td>{data.restName}</td>
                                <td>{data.address}</td>
                                <td>{data.cost}</td>
                                <td>
                                    <button className='btn bg-warning fw-bold' onClick={() => deleteOrder(data.orderId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default MyOrder;

