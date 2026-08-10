const userModel = require("../model/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

async function registerUser(req,res) {
try{

 const {username,email,password,role="user"} = req.body;

 const isEmailAlreadyExists = await userModel.findOne({
   email
 })
 if(isEmailAlreadyExists){
   return res.status(400).json({message:"Email already exists"})
 }

 const hash = await bcrypt.hash(password,10);

 const user = await userModel.create({
    username,
    email,
    password : hash,
    role

 })
 const token = jwt.sign({
    id : user._id,
    role : user.role
 },process.env.JWT_SECRETKEY);
 res.cookie("token",token);

 res.status(201).json({message:"User registered successfully",
   user:{
      id : user._id,
      username : user.username,
      email : user.email,
      role : user.role
   }
 })
}
catch(err){
   res.status(500).json({message:err.message})
}
 
 
    
}

async function loginUser(req,res) {
   try{
   const {username,email,password,role="user"} = req.body;
   let user;
   if(email){
      user = await userModel.findOne({email});
   }
   else if(username){
      user = await userModel.findOne({username})
   }
   else{
      return res.status(400).json({message:"Please provide a email or username"})
   }
   if(!user){
      return res.status(400).json({message:"Invalid credinitials"})
   }


   const isPasswordValid = await bcrypt.compare(password,user.password);
   if(!isPasswordValid){
      return res.status(401).json({message:"Invalid credinitial"})   
   }

   const token = jwt.sign({
      id : user._id,
      role : user.role
   },process.env.JWT_SECRETKEY)
   res.cookie("token",token)

   res.status(200).json({message:"Login User successfully",
      user :{
         id : user._id,
         username : user.username,
         email : user.email,
         role : user.role
      }
   })
}
catch(err){
   res.status(500).json({message:err.message})
}
   
}

async function logOut(req,res){
   res.clearCookie("token");
   res.status(200).json({message:"User LogOut successfully"})
}


module.exports = {registerUser,loginUser,logOut}