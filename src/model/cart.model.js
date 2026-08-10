const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema ({
    user : {
        type : mongoose.Schema.ObjectId,
        ref:"user"

    },
    product :{
        type : mongoose.Schema.ObjectId,
        ref : "product"
    },
    quantity :{
        type : Number,
        require:true
    }

},{
    timestamps : true
})

const cartModel = mongoose.model("cart",cartSchema);

module.exports = cartModel;