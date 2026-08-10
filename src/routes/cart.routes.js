const express = require("express");
const authMiddleware = require("../middleware/auth.middleware")
const cartController = require("../controller/cart.controller");
const router = express.Router();

router.post("/create-cart",authMiddleware.authUser,cartController.createCart);
router.get("/getCart",authMiddleware.authUser,cartController.getCart);
router.put("/updateCart",authMiddleware.authUser,cartController.updateCart);
router.delete("/delete",authMiddleware.authUser,cartController.deleteTheCartProduct);




module.exports= router;