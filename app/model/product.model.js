const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: String,
  price: Number,
  category: String,
  image: String,
  description: String,
  rentType: String,
});

module.exports = mongoose.model("Product", productSchema);
