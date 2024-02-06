// Importing required modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const restaurant = require('./Routes/restaurant'); // Importing the route for the restaurant
const createUser = require("./Routes/createUser"); // Importing the route for user creation
const cors = require("cors");

const crypto = require('crypto')
const PORT = process.env.PORT || 4200;

app.use(cors()); // Enable Cross-Origin Resource Sharing for handling requests from different origins
app.use(express.json()); // Parse incoming request bodies in JSON format
app.use(bodyParser.json()); // Parse JSON in the request body using body-parser

// Home page route
app.get("/", function(req, res){
    res.send("Welcome to my Zomato App");
});


// Restaurant route
app.use("/restaurant", restaurant);

// User creation route
app.use("/createUser", createUser);

// payments
// const generateChecksum = (params, key)=>{
//     const paramString = Object.keys(params)
//     .filter(key=> key !== `CHECKSUMHASH`)
//     .map(key => `${key}=${params[key]}`)
//     .join('&');
//     const checksum = crypto.createHmac('sha256', key).update(paramString).digest('hex');
//   return checksum;
// }

// app.post('/initiatePayment', function(req, res){
//     const params = {
//         MID: 'yourMerchantID',
//         ORDER_ID: 'uniqueOrderID',
//         CUST_ID: 'customerID',
//         TXN_AMOUNT: 'transactionAmount',
//         CHANNEL_ID: 'WEB',
//         INDUSTRY_TYPE_ID: 'Retail',
//         WEBSITE: 'WEBSTAGING', // Change it to 'DEFAULT' in production
//         CALLBACK_URL: 'http://yourdomain.com/callback',
//     }
//     params.CHECKSUMHASH = generateChecksum(params, 'yourMerchantKey');

//   res.json(params);
// })

// app.post("/callback", function(req, res){
//     const responseData = req.body;
//     const checksumMatch = verifyChecksum(responseData, 'yourMerchantKey');
  
//     if (checksumMatch) {
//       // Process payment success
//       res.send('Payment successful');
//     } else {
//       // Handle checksum mismatch
//       res.status(400).send('Checksum mismatch');
//     }
// })
// const verifyChecksum = (params, key) => {
//     const checksum = params.CHECKSUMHASH;
//     delete params.CHECKSUMHASH;
  
//     const calculatedChecksum = generateChecksum(params, key);
  
//     return checksum === calculatedChecksum;
//   };
  

// Start the server on port 4200
app.listen(PORT);
