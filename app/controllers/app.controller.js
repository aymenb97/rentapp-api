const Product = require("../model/app.model.js");

// Create and Save a new Message
exports.create = (req, res) => {
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    color: req.body.color,
  });

  product
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
  Product.find()
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
  Product.findById(req.params.productId)
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
        message: "Error retrieving Product with id " + req.params.productId,
      });
    });
};

// Update a message identified by the messageId in the request
exports.update = (req, res) => {
  Product.findByIdAndUpdate(
    req.params.productId,
    {
      title: req.body.title,
      price: req.body.price,
      category: req.body.category,
      color: req.body.color,
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
  const product = Product.findByIdAndRemove(req.params.productId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId,
        });
      }
      res.send(`Product with ID ${req.params.productId} deleted`);
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
