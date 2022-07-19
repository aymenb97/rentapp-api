const Rent = require("../model/rent.model.js");

// Create and Save a new Message
exports.create = (req, res) => {
  console.log(req.body);
  const product = new Rent({
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    approve: req.body.approve,
    client: req.body.client,
    total: req.body.total,
    owner: req.body.owner,
    product: req.body.product,
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
  Rent.find()
    .populate("product")
    .populate("client")
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
  Rent.findById(req.params.rentId)
    .populate("product")
    .populate("client")
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
  Rent.findByIdAndUpdate(
    req.params.rentId,
    {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      approve: req.body.approve,
      client: req.body.client,
      owner: req.body.owner,
      product: req.body.product,
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
  const rent = Rent.findByIdAndRemove(req.params.productId)
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
