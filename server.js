const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const productRoutes = require("./app/routes/product.routes.js");
const userRoutes = require("./app/routes/user.routes");
const cors = require("cors");
const rentRoutes = require("./app/routes/rent.routes.js");
const PORT = 3001;
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/rentapp", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database.", err);
    process.exit();
  });

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: `Server is working` });
});

app.use("/rents", rentRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
