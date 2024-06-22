const User = require("../models/user");
const db = require('../config/db.config.js')
const collection_user = db.collection('users');
const collection_statistiqueusers = db.collection('statistiqueusers');
const collection_abonnees = db.collection('abonnees');

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
      collection_statistiqueusers
        .insertOne({
          userId: data.insertedId.toString(),
          followers: 0,
          totalPosts: 0,
          totalPoints: 0,
        })
        .then(data1 => {
          collection_abonnees
            .insertOne({

              userId: data.insertedId.toString(),
              followers: []
            })
            .then(data3 => {
              res.send(data3);
            })
        })
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
      if (data == undefined || data == null) {
        res.send( { resultat : "error connexion"})
      }
      else {
        if (data._id != null && data.email == req.body.email) {
          res.send(data)
          
        }
      }


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


exports.delete = async (req, res) => {
  const deleteResult = await collection_user.deleteOne({ "_id": new ObjectId(req.body.id) });
  res.send(deleteResult);

}



// Retrieve all Users from the database.
exports.findAll = async (req, res) => {

  // res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Origin, Accept');        
  // res.header('Access-Control-Allow-Credentials', true);
  // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  const findResult = await collection_user.find({}).toArray();
  res.send(findResult);

}

exports.findOneById = async (req, res) => {
  const id = req.query.id;

  res.send(await collection_user.findOne({ "_id": new ObjectId(id) }))
};


