const express = require("express");
const authController = require('../controller/auth.controller');
const authMiddleware = require("../middleware/auth.middleware")


const router = express.Router();

router.post("/register",authController.registerUser);
router.post("/login",authController.loginUser)
router.post("/logout",authMiddleware.authSeller,authController.logOut);

module.exports=router;