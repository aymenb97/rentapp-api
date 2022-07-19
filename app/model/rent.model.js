const mongoose = require("mongoose");
const { Schema } = mongoose;
const rentSchema = mongoose.Schema({
  startDate: Date,
  endDate: Date,
  total: Number,
  approve: Boolean,
  client: { type: Schema.Types.ObjectId, ref: "User" },
  owner: [{ type: Schema.Types.ObjectId, ref: "User" }],
  product: { type: Schema.Types.ObjectId, ref: "Product" },
});

module.exports = mongoose.model("Rent", rentSchema);
