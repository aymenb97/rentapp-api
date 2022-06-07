const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./app/routes/app.routes.js");
const PORT = 8080;
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/products", {
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

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: `Server is working` });
});

app.use("/products", routes);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
