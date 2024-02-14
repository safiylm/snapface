const User = require("../models/user");
const collection_user = require('../config/db.config.js')
const ObjectId = require('mongodb').ObjectId;
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    photos_profil: req.body.photos_profil,
    photos_background: req.body.photos_background,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
  });

  // Save Tutorial in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {

  const findResult = await collection_user.find({}).toArray();
  res.send(findResult);

}

exports.findOneById = async (req, res) => {
  const id = req.query.id;
  console.log(id)
  res.send(await collection_user.findOne({"_id" : new ObjectId(id)}))  
};


