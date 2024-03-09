const User = require("../models/user");
const db = require('../config/db.config.js')
const collection_user = db.collection('users');
const ObjectId = require('mongodb').ObjectId;


exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    photos_profil: req.body.photos_profil,
    photos_background: req.body.photos_background,
    password: req.body.password,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
  }
  console.log("back controller :" + user)


  // Save Tutorial in the database
  collection_user
    .insertOne(user)
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


exports.connexion = async function (req, res) {

  const findResult = await collection_user.findOne({ "email": req.body.email, "password": req.body.password }).then(
    data => {
      res.send(data)
    }
  ).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while connexion the User."
    });
  });
};


exports.update = async (req, res) => {


  const updateResult = await collection_user.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "photos_profil": req.body.photos_profil,
        "password": req.body.password,
        "photos_background": req.body.photos_background,
        "email": req.body.email,
        "phoneNo": req.body.phoneNo,
      }
    });
  res.send(updateResult);


}


// Retrieve all Users from the database.
exports.findAll = async (req, res) => {

  const findResult = await collection_user.find({}).toArray();
  res.send(findResult);

}

exports.findOneById = async (req, res) => {
  const id = req.query.id;

  res.send(await collection_user.findOne({ "_id": new ObjectId(id) }))
};


