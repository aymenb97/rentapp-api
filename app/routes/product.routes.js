const express = require("express");

const productRoutes = express.Router();

const Product = require("../controllers/product.controller.js");
productRoutes.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
productRoutes.get("/", Product.findAll);
productRoutes.get("/:productId", Product.findOne);
productRoutes.post("/", Product.create);
productRoutes.put("/:productId", Product.update);
productRoutes.delete("/:productId", Product.delete);
module.exports = productRoutes;
