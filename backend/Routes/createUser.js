const express = require("express");
const router = express.Router();
const userModel = require("../Models/newUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

// Signup page
router.post("/register",
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
router.post("/login",
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
router.get("/userInfo", async (req, res) => {
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
router.post("/signup/googleAuth", async function(req, res){
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
router.post("/googleAuth/login", async function(req, res){
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

router.get("/profile/:id", async function(req, res){
  let query = {};
  let id = +req.params.id;
  if(id){
    query = {uniqueId: id}
  }
  const profile = await userModel.findOne(query)
  res.send(profile)
})

router.put("/profile/update/:id", async function(req, res){
  let query = {};
  let id = +req.params.id;
  if(id){
    query = {uniqueId: id};
  }
  try{
    const updateProfile = await userModel.updateOne(query, {
        $set:{
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone
        }
    });
  res.send(updateProfile)
  }catch(err){
    console.log("user not update", err)
  }
  
})

// Export the router for use in the main application
module.exports = router;
