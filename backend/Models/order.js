const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://rahulkr:rahulkr@cluster0.uu1odbb.mongodb.net/zomato-app?retryWrites=true&w=majority");
const orderSchema = new mongoose.Schema({
    
        orderId:Number,
        name: String,
        email: String,
        address: String,
        phone: Number,
        cost: Number,
        restName: String,
        orderItems: String,
       uniqueId: Number,
})

module.exports = mongoose.model("orders", orderSchema);