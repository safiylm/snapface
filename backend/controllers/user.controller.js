const User = require("../models/user");
const db = require('../config/db.config.js')
const collection_user = db.collection('users');
const collection_statistiqueusers = db.collection('statistiqueusers');
const collection_abonnees = db.collection('abonnees');

const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const saltRounds = 108;

//create new user
exports.create = (req, res) => {
  
  if(req.body.password != "" ){

 // bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
   
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      photos_profil: req.body.photos_profil,
      photos_background: req.body.photos_background,
      password: "hash",
      email: req.body.email,
      phoneNo: req.body.phoneNo,
    }

    res.set('Access-Control-Allow-Origin', '*');

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
  //});
    }
};


//edit user data
exports.update = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

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


//dete user 
exports.delete = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const deleteResult = await collection_user.deleteOne({ "_id": new ObjectId(req.body.id) });
  res.send(deleteResult);

}



// Retrieve all Users from the database.
exports.findAll = async (req, res) => {

  res.set('Access-Control-Allow-Origin', '*');

  const findResult = await collection_user.find({}).toArray();
  res.send(findResult);

}


// Retrieve one User by id from the database.
exports.findOneById = async (req, res) => {

  const id = req.query.id;
  res.set('Access-Control-Allow-Origin', '*');
  res.send(await collection_user.findOne({ "_id": new ObjectId(id) }))
};


//connexion
exports.connexion = async function (req, res) {

  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Methods', 'GET, POST,  OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type')

  // res.send(await collection_user.findOne({ "email": req.body.email, "password": req.body.password }));

  const user = await collection_user.findOne({ "email": req.body.email })

  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (result) {
      res.send("connexion réussie")
    } else {
      res.send("connexion échouée")

    }
  });
};