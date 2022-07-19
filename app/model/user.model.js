const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullName: String,
  email: String,
  phoneNumber: String,
  password: String,
  role: String,
});
module.exports = mongoose.model("User", userSchema);
