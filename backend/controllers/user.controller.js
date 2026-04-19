const db = require('../config/db.config.js')
const collection_user = db.collection('users');
const collection_statistiqueusers = db.collection('statistiqueusers');
const nodemailer = require('nodemailer');
const ObjectId = require('mongodb').ObjectId;
const jwt_ = require('../jwt.js')
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt');
const { exit } = require('node:process');
const saltRounds = 21082000; // Facteur de travail

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


const transporter = nodemailer.createTransport({
  service: 'gmail', // ou autre fournisseur
  auth: {
    user: 'snapfaceangular@gmail.com',
    pass: 'rvcj ykvx hxeb yunm ', // Utilisez un mot de passe d'application si requis
  },
});

const isnull = (variable) => {
  if (variable == '' || variable == null || variable == undefined)
    return true;
}

const hashPassword = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Erreur lors du hachage du mot de passe :', error);
    throw error;
  }
};


//create new user
exports.create = (req, res) => {

  if (isnull(req.body.name) || isnull(req.body.email) || isnull(req.body.password)) {
    res.status(400).send(
      { error: 'user is null.' });
    return
  }

  const user = {
    name: req.body.name,
    photos_profil: "",
    photos_background: "",
    password: req.body.password,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
    isOnline: false,
    isPrivate: false
  }
  res.set('Access-Control-Allow-Origin', '*');

  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegexp.test(req.body.email))
    return res.status(400).send({ error: 'Email invalide' });

  user.password = hashPassword(req.body.password)

  collection_user.insertOne(user).then(data => {
    if (data)
      collection_statistiqueusers.insertOne({
        userId: data.insertedId.toString(),
        followers: 0, totalPosts: 0, totalPoints: 0,
      })
        .then(data1 => {
          if (data1)
            res.status(201).send({ "message": "Inscription réussie", "userId": data.insertedId });
        })
        .catch(err => {
          res.status(500).send({ error: err.message });
        });
  })
    .catch(err => {
      res.status(500).send({ error: err.message });
    });

};


//connexion
exports.connexion = async function (req, res, next) {


  if (isnull(req.body.email)) {
    res.status(400).send({ error: 'user id is null.' });
    return
  }

  if (isnull(req.body.password)) {
    res.status(400).send({ error: 'password is null.' });
    return
  }

  const resultat = await collection_user.findOne(
    { email: req.body.email })
    .catch(err => {
      res.status(500).send({ error: 'Email incorrecte' });
      return
    });

  if (resultat == null) {
    res.status(500).send({ error: 'Email incorrecte' });
    return
  } else {
    const checkpwd = await verifyPassword(req.body.password, resultat.password)
    if (checkpwd) {
      cookies(resultat['_id'].toString(), res)
      // Répondre une seule fois
      res.json({ message: 'Connexion réussie!', user: resultat });
      return
    }
    else {
      res.status(500).send({ error: 'Password incorrecte' });
      return
    }
  }

};

exports.logout = async function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.clearCookie("token");
  res.json("ok")
};

//edit user data
exports.update = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (isnull(req.body._id)) {
    res.status(400).send({ error: 'user id is null.' });
    return
  }

  if (isnull(req.body.name)) {
    res.status(400).send({ error: 'user name is null.' });
    return
  }

  await collection_user.updateOne({ "_id": new ObjectId(req.body._id) },
    { $set: { "name": req.body.name, } })
    .then(data => {
      if (data)
        res.status(200).json({ "message": "Modification réussie" });
    })
    .catch(err => {
      res.status(500).send({ error: err.message });
    });

}


//delete user 
exports.delete = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (isnull(req.body._id)) {
    res.status(400).send({ error: 'user id is null.' });
    return
  }

  collection_user.deleteOne({ "_id": new ObjectId(req.body._id) }).then((data) => {
    if (data)
      collection_statistiqueusers.deleteOne({ "userId": req.body._id }).then(
        (x) => {
          if (x) res.status(200).json({ "message": "Suppression réussie" });
        }
      );
  }).catch(err => {
    res.status(500).send({ error: err.message });
  });

}


// Retrieve all Users from the database.
exports.findAll = async (req, res) => {

  res.set('Access-Control-Allow-Origin', '*');

  const findResult = await collection_user.find({}).toArray()
    .catch(err => {
      res.status(404).send({ error: "Users not found", });
    });

  if (findResult == null) {
    res.status(404).json({ error: 'Users not found' });
  } else {
    res.status(200).json(findResult);
  }

}


exports.findByName = async (req, res) => {

  const name = req.query.name.trim();

  if (isnull(name)) {
    res.status(400).send({ error: 'user name is null.' });
    return
  }

  res.set('Access-Control-Allow-Origin', '*');

  let resultat = await collection_user.find({
    "name": { $options: 'i', "$regex": name }
  },
  ).toArray()

  res.status(200).json(resultat)


}

// Retrieve one User by id from the database.
exports.findOneById = async (req, res) => {

  const id = req.query.id;

  if (isnull(id)) {
    res.status(400).send({ error: 'user id is null.' });
    return
  }

  res.set('Access-Control-Allow-Origin', '*');
  const resultat = await collection_user.findOne({ "_id": new ObjectId(id) })
   .catch(err => {
      res.status(404).json({ error: 'User not found ' + err });
    });
  if (resultat == null) {
    res.status(404).json({ error: 'User not found' });
  }
  else {
  res.status(200).json(resultat)
  }

};
