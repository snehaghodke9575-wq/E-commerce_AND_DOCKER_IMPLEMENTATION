const cartModel = require('../model/cart.model');


async function createCart(req,res) {
    const {quantity,productId} = req.body;
    if(!productId || !quantity){
        return res.status(400).json({message:"Product and quantity is required"})
    }
    const existingCart = await cartModel.findOne({
        user : req.user.id,
        product : productId
    })
    if(existingCart){
        return res.status(409).json({message:"Product is already exists use update cart options"})
    }
    const cart = await cartModel.create({
        product:productId,
        quantity,
        user : req.user.id
    })
    
    res.status(200).json({message:"Cart details are",
        cart :{
            id : cart.id,
            user : cart.user,
            product : cart.product,
            quantity:cart.quantity
        }
    })
}
        



async function getCart(req,res){
    try{
    const cart = await cartModel.find({
        user : req.user.id
    }).populate("product");
    console.log(cart);
    res.status(200).json({message:"Cart",
        cart 
    })
}
catch(err){
    res.status(500).json({message:err.message})
}
}

async function updateCart(req,res) {
    try{
    const {quantity,productId} = req.body;

    
    if(!productId){
        return res.status(400).json({message:"Product id is required"})
    }
    const existingCart = await cartModel.findOne({
    user : req.user.id,
    product : productId 
    }).populate("product")
    if(!existingCart){
        return res.status(404).json({message:"Cart item not found"})
    }
    const cart = await cartModel.findOneAndUpdate(
            {
                user:req.user.id,
                product:productId
            },
            {
                quantity 
            },
            {
                returnDocument : "after"
            }

        )
    res.status(200).json({message:"Quantity updated successfully",
        cart
    })
}
catch(err){
    res.status(500).json({message:err.message})
}
}

async function deleteTheCartProduct(req,res){
    const {productId} = req.body;
    const cart = await cartModel.findOneAndDelete({
        user : req.user.id,
        product:productId
    })
    res.status(200).json({message:"Delete cart product successfully",
        cart 
    })
}


module.exports = {createCart,getCart,updateCart,deleteTheCartProduct};