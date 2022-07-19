const User = require("../model/user.model.js");

// Create and Save a new Message
exports.create = (req, res) => {
  console.log(req.body);
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    role: req.body.role,
  });

  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Message.",
      });
    });
};

// Retrieve all messages from the database.
exports.findAll = (req, res) => {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages.",
      });
    });
};

// Find a single message with a messageId
exports.findOne = (req, res) => {
  User.findById(req.params.userId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Rent not found with id " + req.params.rentId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.rentId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving Product with id " + req.params.rentId,
      });
    });
};

// Update a message identified by the messageId in the request
exports.update = (req, res) => {
  User.findByIdAndUpdate(
    req.params.rentId,
    {
      fullName: req.body.fullName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      role: req.body.role,
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId,
        });
      }
      return res.status(500).send({
        message: "Error updating Product with id " + req.params.productId,
      });
    });
};

// Delete a product with the specified ID
exports.delete = (req, res) => {
  const user = User.findByIdAndRemove(req.params.userId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Rent not found with id " + req.params.productId,
        });
      }
      res.send(`Rent with ID ${req.params.productId} deleted`);
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId,
        });
      }
      return res.status(500).send({
        message: "Could not delete product with id " + req.params.productId,
      });
    });
};
exports.login = (req, res) => {
  User.findOne()
    .where("email")
    .equals(req.body.email)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Rent not found with id " + req.params.rentId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.rentId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving Product with id " + req.params.rentId,
      });
    });
};
