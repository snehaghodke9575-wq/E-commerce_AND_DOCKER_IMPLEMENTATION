const express  = require('express');
const productController = require('../controller/product.controller');
const authMiddleware = require("../middleware/auth.middleware")
const multer = require('multer');




const router = express.Router();
const upload = multer({storage:multer.memoryStorage()})


router.post("/create-product",authMiddleware.authSeller,upload.single('productimage'),productController.createProduct);
router.get("/getProduct",productController.getAllProduct);
router.get("/getproductid/:id",productController.getProductByid)
router.put("/update-product/:id",authMiddleware.authSeller,upload.single('productimage'),productController.productUpdateDetails)
router.delete("/delete/:id",authMiddleware.authSeller,productController.deleteProduct)

module.exports = router;
