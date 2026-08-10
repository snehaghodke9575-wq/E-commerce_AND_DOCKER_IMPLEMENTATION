const productModel = require('../model/product.model');
const uploadImages = require('../service/storage.service')

async function createProduct(req,res){
    try{
    const {title,description,price,manufracturedBy,seller,category,stock} = req.body;
    const productimage = req.file;
    if(!productimage){
        return res.status(400).json({message:"Product image is required"})
    }
    const result = await uploadImages(productimage.buffer.toString("base64"));
    const product = await productModel.create({
        title,
        productimage : result.url,
        description,
        price,
        category,
        stock,
        manufracturedBy,
        seller : req.user.id

    })
    res.status(201).json({message:"Product Details are :",
        product
    })
}
catch(err){
    res.status(500).json({message:err.message})
}

}

async function getAllProduct(req,res){
    const id = req.params.id;
    let {page="1",limit="10"} = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const product = await productModel.find().skip((page-1)*limit).limit(limit);
    const totalProduct = await productModel.countDocuments();
    const totalPages = Math.ceil(totalProduct/limit);

    res.status(200).json({message:"Product is ",
        product,
        totalProduct,
        totalPages 
    })
}

async function getProductByid(req,res){
    try{
    const id = req.params.id;
    const product = await productModel.findById(id).limit(8);
    res.status(200).json({message:"Product is",
        product
    })
    }
    catch(err){
        res.status(500).json({message:"err.message"})
    }


    
}


async function productUpdateDetails(req,res){
    try{
    const {title,description,category,stock,price} = req.body;
    const {productId} = req.params;
    const product = await productModel.findOneAndUpdate(
        {
            product:productId,
            seller : req.user.id
        },
        {
            title,
            category,
            description,
            stock,
            price
        },
        {
            returnDocument :"after"
        }
)
if(!product){
    return res.status(404).json({message:"Product not found"})
}

res.status(200).json({message:"Successfully updated the product details",
    product
})
}
catch(err){
    res.status(500).json({message:err.message})
}


}

async function deleteProduct(req,res){
    const {productId} = req.params;
    const product = await productModel.findOneAndDelete({
        product : productId,
        user : req.user.id
    })

    res.status(200).json({message:"Product deleted successfully",
        product
    })
}


module.exports= {createProduct,getAllProduct,getProductByid,productUpdateDetails,deleteProduct};