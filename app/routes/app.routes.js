const express = require("express");

const router = express.Router();

const App = require("../controllers/app.controller.js");
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
router.get("/", App.findAll);
router.get("/:productId", App.findOne);
router.post("/", App.create);
router.put("/:productId", App.update);
router.delete("/:productId", App.delete);
module.exports = router;
