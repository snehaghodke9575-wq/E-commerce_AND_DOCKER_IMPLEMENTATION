const orderModel = require("../model/order.model");
const productModel = require("../model/product.model");
const userModel = require("../model/user.model")

async function createOrder(req,res){
    let {productId,quantity} = req.body;
    const product = await productModel.findById(productId)
    if(!product){
        return res.status(400).json({message:"Product is required"})
    }
    const price = product.price;
    let totalPrice = price * quantity;

    let stock = product.stock;
    if(stock < quantity){
        return res.status(400).json({message:"Out of stock"})
    }
    
    
    const order = await orderModel.create({
        product : productId,
        price,
        quantity,
        totalPrice,
        user : req.user.id
    })
    
    product.stock = product.stock - quantity;
     await product.save() ;

   res.status(200).json({message :"Order details are",
    order
   })
  

}


async function getOrderDetails(req,res) {
    try{
    const order = await orderModel.find({
        user : req.user.id,
    }).populate("product");
    res.status(200).json({message:"Order details are ",
        order 
    })
}
catch(err){
    res.status(500).json({message:err.message})
}

    
}

async function getOrderById(req,res){
    try{
    const orderId    = req.params.id;
    const order = await orderModel.findOne({
        _id :orderId,
        user : req.user.id});
    if(!order){
        return res.status(404).json({message:"No order yet "})
    }
    res.status(200).json({message:"Product order details are",
        order
    })
}
catch(err){
    res.status(500).json({message:err.message})
}
}

async function updateStatus(req,res){
    const {status,orderId} = req.body;
    if(!orderId){
        return res.status(400).json({message:"Order is required"})
    }
    const order = await orderModel.findById(orderId).populate("product");
    if(!order){
        return res.status(404).json({message:"Order is not found"})
    }
    const product = order.product;
    
    if(product.seller.toString() !== req.user.id.toString()){
        return res.status(401).json({message:"Unauthorized"})
    }
    

   order.status = status;
   await order.save();
   res.status(200).json({message:"Status updated sucessfully",
    order
   })
      
}

module.exports = {createOrder,getOrderDetails,getOrderById,updateStatus};