const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://rahulkr:rahulkr@cluster0.uu1odbb.mongodb.net/zomato-app?retryWrites=true&w=majority"
);

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: Number,
    uniqueId: Number
});

module.exports = mongoose.model("users", userSchema)
