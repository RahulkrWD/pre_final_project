// Importing required modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const restaurant = require('./Routes/restaurant'); // Importing the route for the restaurant
// const createUser = require("./Routes/createUser"); // Importing the route for user creation
const cors = require("cors");
const locationModel = require("./Models/location");
const mealsModel = require("./Models/mealType");
const restaurantModel = require("./Models/restaurant");
const menusModel = require("./Models/menu");
const orderModel = require("./Models/order");

const userModel = require("./Models/newUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

app.use(cors()); // Enable Cross-Origin Resource Sharing for handling requests from different origins
app.use(express.json()); // Parse incoming request bodies in JSON format
app.use(bodyParser.json()); // Parse JSON in the request body using body-parser

// Home page route
app.get("/", function(req, res){
    res.send("Welcome to my Zomato App");
});

// restaurant Api
app.get("/location", async function (req, res) {
    try {
      const location = await locationModel.find();
      res.send(location);
    } catch (err) {
      console.log("server error", err);
    }
  });
  
  // Find restaurants based on stateId or mealId
  app.get("/restaurants", async function (req, res) {
    try {
      let query = {};
      let stateId = +req.query.stateId;
      let mealId = +req.query.mealId;
      if (stateId) {
        query = { state_id: stateId };
      } else if (mealId) {
        query = { "mealTypes.mealtype_id": mealId };
      }
      const restaurant = await restaurantModel.find(query);
      res.send(restaurant);
    } catch (err) {
      console.log("server error", err);
    }
  });
  
  // Get all meal types for quick search
  app.get("/quicksearch", async function (req, res) {
    try {
      const meals = await mealsModel.find();
      res.send(meals);
    } catch (err) {
      console.log("server error", err);
    }
  });
  
  // Filter restaurants based on mealId, cuisineId, and cost range
  app.get("/filter/:mealId", async function (req, res) {
    let query = {};
    let mealId = +req.params.mealId;
    let cuisineId = +req.query.cuisineId;
    let lcost = +req.query.lcost;
    let hcost = +req.query.hcost;
  
    if (mealId) {
      query = { "mealTypes.mealtype_id": mealId };
    }
  
    if (cuisineId) {
      query = {
        "mealTypes.mealtype_id": mealId,
        "cuisines.cuisine_id": cuisineId,
      };
    } else if (lcost && hcost) {
      query = {
        "mealTypes.mealtype_id": mealId,
        $and: [{ cost: { $gt: lcost, $lt: hcost } }],
      };
    } else if (cuisineId && lcost && hcost) {
      query = {
        "mealTypes.mealtype_id": mealId,
        "cuisines.cuisine_id": cuisineId,
        $and: [{ cost: { $gt: lcost, $lt: hcost } }],
      };
    }
  
    try {
      const filter = await restaurantModel.find(query);
      res.send(filter);
    } catch (err) {
      console.log('server error', err);
    }
  });
  
  // Get details of a specific restaurant by ID
  app.get("/restaurants/:id", async function(req, res){
      let query = {};
      let id = +req.params.id;
      if(id){
          query = {restaurant_id: id}
      }
      try{
          const details = await restaurantModel.find(query);
          res.send(details)
      }catch(err){
          console.log("server error", err)
      }
  });
  
  // Get all menus
  app.get("/menu", async function (req, res) {
    try {
      const menu = await menusModel.find();
      res.send(menu);
    } catch (err) {
      console.log("server error", err);
    }
  });
  
  // Get menu for a specific restaurant by ID
  app.get("/menu/:id", async function(req, res){
      let query = {};
      let id = +req.params.id;
      if(id){
          query = {restaurant_id: id};
      }
      try{
          const menuId = await menusModel.find(query);
          res.send(menuId)
      }catch(err){
          console.log("server error", err)
      }
  });
  
  // Post order for selected menu items
  app.post("/menuItem", async function(req, res){
      if(Array.isArray(req.body)){
          let menu = await menusModel.find({menu_id: {$in: req.body}});
          res.send(menu)
      }else{
          res.send("invalid input")
      }
  });
  
  // Place an order
  app.post("/placeOrder", async function(req, res){
      try{
          const placeOrder = await orderModel.create({
              orderId: req.body.orderId,
              name: req.body.name,
              email: req.body.email,
              phone: req.body.phone,
              address: req.body.address,
              cost: req.body.cost,
              restName: req.body.restName,
              orderItems: req.body.orderItems,
              uniqueId: req.body.uniqueId
          });
          res.send(placeOrder)
      }catch(err){
          console.log("Order not placed", err);
      }
  });
  
  // Find order using query method
  app.get("/order", async function(req, res){
      let query = {};
      let id = +req.query.id;
      if(id){
          query = {uniqueId: id};
      }
      try{
          const order = await orderModel.find(query);
          res.send(order)
      }catch(err){
          console.log("server error", err)
      }
  });
  
  // Delete order by orderId
  app.delete("/delete/:id", async function(req, res){
      let query = {};
      let id = +req.params.id;
      if(id){
          query = {orderId: id}
      }
      try{
          const deleteOrder = await orderModel.deleteOne(query);
          res.send(deleteOrder)
      }catch(err){
          console.log("server error", err)
      }
  });
  
  // Update order email by orderId
  app.put("/update/:id", async function(req, res){
      let id = +req.params.id;
      try{
          const updateorder = await orderModel.updateOne({orderId: id},
              {
                  $set:{
                      email: req.body.email
                  }
              });
          res.send(updateorder)
      }catch(err){
          console.log("server error", err)
      }
  });

  // create user Api
  // Signup page
app.post("/register",
// Apply express-validator for input validation
[
  body("email").isEmail().toLowerCase(),
  body("name").isLength({ min: 5 }),
  body("phone").isLength({ min: 10, max: 10 }),
  body("password", "password is too short").isLength({ min: 5 }),
],
async function (req, res) {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, phone, password, uniqueId } = req.body;
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user in the database
    const newUser = await userModel.create({ name, email, phone, password: hashedPassword, uniqueId });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login page
app.post("/login",
[
  body("email").isEmail().toLowerCase(),
  body("password", "password is too short").isLength({ min: 5 }),
], async function (req, res) {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    // Find the user in the database based on the email
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
    } else {
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        // Generate JWT Token for authentication
        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '24h' });
        res.status(200).json({ message: "Login successful", token });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});

// User information page
app.get("/userInfo", async (req, res) => {
try {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({ auth: false, message: "No token provided" });
  }

  // Verify the JWT token and retrieve user information
  jwt.verify(token, 'your_secret_key', async (err, decoded) => {
    if (err) {
      return res.status(401).json({ auth: false, message: "Invalid token" });
    }
    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  });
} catch (error) {
  console.log(error);
  res.status(500).json({ error: 'Server error' });
}
});

// Google auth signup
app.post("/signup/googleAuth", async function(req, res){
try{
  const {name, email, uniqueId} = req.body;
  // Create a new user for Google authentication
  const signup = await userModel.create({name, email, uniqueId });
  res.send(signup);
}catch(err){
  console.log("Invalid");
}
});

// Google auth login
app.post("/googleAuth/login", async function(req, res){
const {name, email} = req.body;
// Find the user in the database based on the Google email
const user = await userModel.findOne({email});
if(!user){
  res.send("User not found");
}else{
  // Generate JWT Token for Google authentication
  const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '24h' });
  res.status(200).json({ message: "Login successful", token });
}
});




// Start the server on port 4100
app.listen(4200);
