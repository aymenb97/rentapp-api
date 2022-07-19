const express = require("express");

const rentRouter = express.Router();

const Rent = require("../controllers/rent.controller.js");
rentRouter.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
rentRouter.get("/", Rent.findAll);
rentRouter.get("/:rentId", Rent.findOne);
rentRouter.post("/", Rent.create);
rentRouter.put("/:rentId", Rent.update);
rentRouter.delete("/:rentId", Rent.delete);
module.exports = rentRouter;
