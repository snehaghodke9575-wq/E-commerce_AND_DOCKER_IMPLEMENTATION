const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
        product : {
            type : mongoose.Schema.ObjectId,
            ref :"product",
            required : true
        },
        quantity : {
            type : Number ,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
    user :{
        type : mongoose.Schema.ObjectId,
        ref :"user"
    },
    totalPrice : {
        type : Number ,
        required : true
    },
    status : {
        type : String ,
        enum : ["Pending","Order Placed","Shipped","Delivered","Cancelled"],
        default : "Pending"
    }

},{
    timestamps : true 

})

const orderModel = mongoose.model("order",orderSchema);

module.exports = orderModel;