const User = require("../models/user");
const db = require('../config/db.config.js')
const collection_user = db.collection('users');
const collection_statistiqueusers = db.collection('statistiqueusers');
const collection_abonnees = db.collection('abonnees');
const nodemailer = require('nodemailer');
const ObjectId = require('mongodb').ObjectId;
const jwt_ = require('../jwt.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


const transporter = nodemailer.createTransport({
  service: 'gmail', // ou autre fournisseur
  auth: {
    user: 'snapface2023@gmail.com',
    pass: 'rdez jsdy ehbq zvkn', // Utilisez un mot de passe d'application si requis
  },
});


//create new user
exports.create = (req, res) => {

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    photos_profil: "",
    photos_background: "",
    password: req.body.password,
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
          res.send(data1);
        })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });

};



//edit user data
exports.update = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const updateResult = await collection_user.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
      }
    });
  res.send(updateResult);
}



//edit Online
exports.updateIsOnline = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  if (req.body._id == '' || req.body._id == null || req.body._id == undefined)
    res.send("User Id is null");
  const updateResult = await collection_user.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: {
        "isOnline": true,
      }
    });
  res.send(updateResult);
}




//edit not Online
exports.updateIsNotOnline = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  if (req.body._id == '' || req.body._id == null || req.body._id == undefined)
    res.send("User Id is null");

  const updateResult = await collection_user.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: {
        "isOnline": false,
      }
    });

  res.send(updateResult);
}

exports.editPhotoDeProfil = async (req, res) => {
  const filePath = req.file.path;
  res.set('Access-Control-Allow-Origin', '*');

  cloudinary.uploader.upload(filePath, {
    folder: 'uploads_secure',
  }, async (error, result) => {
    if (error) return res.status(500).json({ error });
    await collection_user.updateOne({ "_id": new ObjectId(req.body.userId) },
      {
        $set: {
          "photos_profil": result.secure_url,
        }
      }).then(data => {
        if (data) {
          res.json({ url: result.secure_url, data: "Modification de photo de profil reussi" });

        }
      })
  });
}


exports.editPhotoBackground = async (req, res) => {
  const filePath = req.file.path;
  res.set('Access-Control-Allow-Origin', '*');

  cloudinary.uploader.upload(filePath, {
    folder: 'uploads_secure',
  }, async (error, result) => {
    if (error) return res.status(500).json({ error });
    await collection_user.updateOne({ "_id": new ObjectId(req.body.userId) },
      {
        $set: {
          "photos_background": result.secure_url,
        }
      }).then(data => {
        if (data) {
          res.json({ url: result.secure_url, data: "Modification de photo background reussi" });
        }
      })
  });
}



exports.editEmail = async function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');

  await collection_user.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: {
        "email": req.body.email,
      }
    }).then(data => {
      if (data) {

        const mailOptions = {
          from: 'snapface2023@gmail.com',
          to: "safinazyilmaz54@gmail.com",
          subject: "Email Modifier",
          text: "Email Modifier",
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res.status(500).send({ success: false, error });
          }

          res.status(200).send(data);
          // res.status(200).send({ success: true, message: 'Email envoyé avec succès !' });
        });

      }

    })

}


exports.editPhoneNumber = async function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');

  const updateResult = await collection_user.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: {
        "phoneNo": req.body.phoneNo,
      }
    });
  res.send(updateResult);
}

//edit password
exports.editPassword = async function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');

  const updateResult = await collection_user.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: {
        "password": req.body.newpassword,
      }
    });
  res.send(updateResult);
}


//dete user 
exports.delete = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  collection_user.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: {
        "firstName": "Utilisateur",
        "lastName": "Introuvable",
      }
    }).then((data) => {
      if (data)
        collection_statistiqueusers.deleteOne({ "userId": req.body._id }).then(
          (x) => {
            if (x)
              res.send(data);
          }
        );
    })

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


exports.findByName = async (req, res) => {
  const lname = req.query.lname;
  const fname = req.query.fname;
  let resultat = "error find user"
  res.set('Access-Control-Allow-Origin', '*');
  //if (lname.trim() != "" && lname != undefined && lname != null) {
  resultat = await collection_user.find({

    //$or: [
    "lastName": { $options: 'i', "$regex": lname },
    "firstName": { $options: 'i', "$regex": fname }
    // ],
  },

  ).toArray()
  //}
  res.json(resultat)

}

function cookies
  (id, res) {
  // Créer le cookie
  res.cookie('token', id, {
    httpOnly: true,
    secure: false,      // ⚠️ mettre true en prod avec HTTPS
    sameSite: 'Lax',
    maxAge: 24 * 60 * 60 * 1000,
  });
}

//connexion
exports.connexion = async function (req, res, next) {

  const resultat = await collection_user.findOne(
    { email: req.body.email });

  if (resultat != null) {

    bcrypt.compare(req.body.password, resultat['password'], function (err, ress) {
      if (ress == true) {
        const id = resultat['_id'].toString();

        cookies(id, res)

        // Répondre une seule fois
        return res.json({ message: 'Connexion réussie', user: resultat });
      }
      else{
        res.json({ message : "Votre votre mot de passe est incorrecte." }); 
      }
    });
  } else {
    // Sinon : utilisateur non trouvé
    res.json({ message: 'Votre email est incorrecte.' });
  }



};

exports.logout = async function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');

  res.clearCookie("token");

  res.json("ok")
};

exports.sendLinkForPasswordOublie = async function (req, res) {

  const userEmail = req.body.email;
  const resetLink = jwt_.generateResetLink(userEmail);


  const mailOptions = {
    from: 'snapface2023@gmail.com',
    to: "safinazylm@gmail.com",
    subject: 'Réinitialisation de votre mot de passe',
    html: `<p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
           <a href="${resetLink}">Réinitialiser le mot de passe</a>
           <p>Ce lien expirera dans 1 heure.</p>`,
  };


  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Erreur lors de l\'envoi de l\'e-mail :', err);
    } else {
      res.set('Access-Control-Allow-Origin', '*');
      res.send('E-mail envoyé :', info.response)
    }
  });
}


exports.getIfEmailExist = async function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  collection_user.findOne({ "email": req.body.email }).then(data => {
    res.send(data)
  })
}

//edit password
exports.reinitialisePassword = async function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');

  const token = jwt_.verifyResetLink(req.body.token);

  await collection_user.updateOne({ "email": token },
    {
      $set: {
        "password": req.body.password,
      }
    }).then(data => {
      res.send(data);
    })
}