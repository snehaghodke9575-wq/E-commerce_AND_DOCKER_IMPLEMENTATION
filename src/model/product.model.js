const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : true
    },
    description : {
        type :String,
        required : true
    },
    productimage : {
        type : String,
        required: true
    },
    manufracturedBy : {
        type : String,
        required:true
    },
    price :{
        type : Number,
        required:true
    },
    stock :{
        type : Number,
        default : 0
    },
    category :{
        type : String,
        required : true
    },
    seller :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    }
    

},{
    timestamps : true
})

const productModel =   mongoose.model("product",productSchema);


module.exports = productModel