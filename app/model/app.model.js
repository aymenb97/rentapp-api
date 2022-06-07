const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: String,
  price: Number,
  category: String,
  color: String,
});

module.exports = mongoose.model("App", productSchema);
