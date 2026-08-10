const express = require("express");
const cookieParser = require("cookie-parser")
const authRoutes = require('./routes/auth.routes')
const productRoutes = require("../src/routes/product.routes")
const cartRoutes = require("../src/routes/cart.routes")
const orderRoutes = require("../src/routes/order.routes")



const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/product",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/order",orderRoutes);

module.exports = app ;

