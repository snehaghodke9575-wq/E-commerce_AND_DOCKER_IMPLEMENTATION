const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function authSeller(req,res,next) {
    try{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Invalid crednitials"})
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRETKEY);
    if(decoded.role!=="seller"){
        return res.status(400).json({message:"Permission denied"})
    }

    req.user = decoded;
    next()
}
    
    catch(err){
        res.status(500).json({message:err.message})
    }
    
}

async function authUser(req,res,next) {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRETKEY);
    req.user = decoded;
    next()
    
} 

module.exports = {authSeller,authUser};