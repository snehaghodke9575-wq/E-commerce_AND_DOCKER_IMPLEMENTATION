const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const orderController = require("../controller/order.controller");

const router = express.Router();

router.post("/create-order",authMiddleware.authUser,orderController.createOrder);
router.get("/getOrder",authMiddleware.authUser,orderController.getOrderDetails);
router.get("/getOrderById/:id",authMiddleware.authUser,orderController.getOrderById);
router.put("/update",authMiddleware.authSeller,orderController.updateStatus);


module.exports = router;