const mongoose  = require("mongoose");
mongoose.connect("mongodb+srv://rahulkr:rahulkr@cluster0.uu1odbb.mongodb.net/zomato-app?retryWrites=true&w=majority");

const restaurantSchema = new mongoose.Schema({});

module.exports = mongoose.model("restaurants", restaurantSchema);