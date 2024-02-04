import React, {useState} from 'react';
import axios from 'axios';

function Payment() {
    const [paymentData, setPaymentData] = useState(null);

    const initiatePayment = async () => {
      try {
        const response = await axios.post('http://localhost:4200/initiatePayment');
        setPaymentData(response.data);
      } catch (error) {
        console.error('Error initiating payment:', error);
      }
    };
  return (
    <>
     <div>
      <h1>Paytm Payment Integration</h1>
      <button onClick={initiatePayment}>Initiate Payment</button>
      {paymentData && (
        <form action={paymentData.CALLBACK_URL} method="POST">
          {Object.entries(paymentData).map(([key, value]) => (
            <input type="hidden" key={key} name={key} value={value} />
          ))}
          <button type="submit">Proceed to Paytm</button>
        </form>
      )}
    </div>
      
    </>
  )
}

export default Payment
