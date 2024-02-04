// Importing required modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const restaurant = require('./Routes/restaurant'); // Importing the route for the restaurant
const createUser = require("./Routes/createUser"); // Importing the route for user creation
const cors = require("cors");

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

// Start the server on port 4100
app.listen(4200);
