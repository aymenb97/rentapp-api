const express = require("express");

const userRouter = express.Router();

const User = require("../controllers/user.controller.js");
userRouter.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
userRouter.get("/", User.findAll);
userRouter.get("/:userId", User.findOne);
userRouter.post("/", User.create);
userRouter.post("/login", User.login);
userRouter.put("/:userId", User.update);
userRouter.delete("/:userId", User.delete);
module.exports = userRouter;
