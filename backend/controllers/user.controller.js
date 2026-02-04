const db = require('../config/db.config.js')
const collection_user = db.collection('users');
const collection_statistiqueusers = db.collection('statistiqueusers');
const nodemailer = require('nodemailer');
const ObjectId = require('mongodb').ObjectId;
const jwt_ = require('../jwt.js')
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt');
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


const hashPassword = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    console.log('Mot de passe haché :', hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error('Erreur lors du hachage du mot de passe :', error);
    throw error;
  }
};


//create new user
exports.create = (req, res) => {

  const user = {
    name: req.body.name,
    photos_profil: "",
    photos_background: "",
    password: req.body.password,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
  }
  res.set('Access-Control-Allow-Origin', '*');

  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegexp.test(req.body.email))
    return res.status(500).send(
      'Votre email est invalide, veuillez réessayer.');

  req.body.password = hashPassword(req.body.password)

  collection_user
    .insertOne(user)
    .then(data => {
      if (data)
        collection_statistiqueusers
          .insertOne({
            userId: data.insertedId.toString(),
            followers: 0,
            totalPosts: 0,
            totalPoints: 0,
          })
          .then(data1 => {
            if (data1 && data)
              res.send({ "message": "Votre compte a été crée avec succès!", "userId": data.insertedId });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the statistique user."
            });
          });
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

  if (req.body._id == '' || req.body._id == null || req.body._id == undefined)
    return res.status(500).send(
      'User Id is null.');

  if (req.body.name == '' || req.body.name == null || req.body.name == undefined)
    return res.status(500).send(
      'User name is null.');

  const updateResult = await collection_user.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: {
        "name": req.body.name,
      }
    }).catch(err => {
      res.status(500).send({
        message_:
          "Some error occurred while edit name of user.",
        erreur: err.message
      });
    });

  res.send(updateResult);
}



//edit Online
exports.updateIsOnline = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
 let online = req.body.isOnline;
  if (req.body._id == '' || req.body._id == null || req.body._id == undefined)
    return res.status(500).send(
      'User Id is null.');


  const updateResult = await collection_user.updateOne({ "_id": new ObjectId(req.body._id) },
    { $set: { "isOnline": online, } })
    .catch(err => {
      res.status(500).send({
        message_:
          "Some error occurred while update online of user.",
        erreur: err.message
      });
    });

  res.send(updateResult);
}


exports.editPhotoDeProfil = async (req, res) => {
  const filePath = req.file.path;
  res.set('Access-Control-Allow-Origin', '*');

  if (req.body.userId == '' || req.body.userId == null || req.body.userId == undefined)
    return res.status(500).send(
      'User Id is null.');

  if (filePath == '' || filePath == null || filePath == undefined)
    return res.status(500).send(
      'File is null.');


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
          res.json({
            url: result.secure_url,
            message: "Modification de photo de profil reussi"
          });
        }
      }).catch(err => {
        res.status(500).send({
          message_:
            "Some error occurred while edit profil picture of user.",
          erreur: err.message
        });
      });
  });
}


exports.editPhotoBackground = async (req, res) => {
  const filePath = req.file.path;
  res.set('Access-Control-Allow-Origin', '*');

  if (req.body.userId == '' || req.body.userId == null || req.body.userId == undefined)
    return res.status(500).send(
      'User Id is null.');

  if (filePath == '' || filePath == null || filePath == undefined)
    return res.status(500).send(
      'File is null.');


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
          res.json({
            url: result.secure_url,
            message: "Modification de photo background reussi"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message_:
            "Some error occurred while edit background picture of user.",
          erreur: err.message
        });
      });
  });
}

exports.sendConfiramtionEmailForNewEmail = async function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');

  let resetLink = jwt_.generateEmailConfirmationLink(req.body._id, req.body.email )

    if (req.body._id == '' || req.body._id == null || req.body._id == undefined)
    return res.status(500).send( 'User Id is null.');

  if (req.body.email == '' || req.body.email == null || req.body.email == undefined)
    return res.status(500).send( 'Email is null.');


  const mailOptions = {
    from: 'snapfaceangular@gmail.com',
    to: "safinazylm@gmail.com",
    subject: "Demande de confirmation email",
    html: `<p>Cliquez sur le lien ci-dessous pour confirmer votre email :</p>
           <a href="${resetLink}">Confirmer votre email</a>`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.status(500).send({
        erreur: err,
        message_: 'Erreur lors de l\'envoi de l\'e-mail'
      });
    } else {
      res.send({ message: "Le lien pour confirmer votre email a été envoyé." })
    }
  })

}

exports.editEmail = async function (req, res) {

  res.set('Access-Control-Allow-Origin', '*');
  const token = jwt_.verifyResetLink(req.query.token);

  
  await collection_user.updateOne({ "_id": new ObjectId(token) },
    { $set: { "email": req.query.email, }
    }).then(data => {
      if (data) {
        res.status(200).send({ message: 'Votre mail est enregistré avec succès !' });
      }
    }).catch(err => {
      res.status(500).send({
        message_:
          "Some error occurred while edit email of user.",
        erreur: err.message
      });
    });

}


exports.editPhoneNumber = async function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.body._id == '' || req.body._id == null || req.body._id == undefined)
    return res.status(500).send(
      'User id is null.');

  const updateResult = await collection_user.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: {
        "phoneNo": req.body.phoneNo,
      }
    })
    .catch(err => {
      res.status(500).send({
        message_:
          "Some error occurred while edit number of phone of user.",
        erreur: err.message
      });
    });
  res.send(updateResult);
}

//edit password
exports.editPassword = async function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.body._id == '' || req.body._id == null || req.body._id == undefined)
    return res.status(500).send(
      'User id is null.');

  if (req.body.newpassword == '' || req.body.newpassword == null || req.body.newpassword == undefined)
    return res.status(500).send(
      'Password is null.');

  const newpassword = hashPassword(req.body.newpassword)

  const updateResult = await collection_user.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: { "password": newpassword, }
    }).then(data => {
      if (data)
        res.send({ message: "Votre modification a été enregistré avec succès." })
    })
    .catch(err => {
      res.status(500).send({
        message_:
          "Some error occurred while edit password of user.",
        erreur: err.message
      });
    });
  res.send(updateResult);
}


//dete user 
exports.delete = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.body._id == '' || req.body._id == null || req.body._id == undefined)
    return res.status(500).send(
      'User id is null.');

  collection_user.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: {
        "name": "Utilisateur Introuvable",
      }
    }).then((data) => {
      if (data)
        collection_statistiqueusers.deleteOne({ "userId": req.body._id }).then(
          (x) => {
            if (x)
              res.send(data);
          }
        );
    }).catch(err => {
      res.status(500).send({
        message_:
          "Some error occurred while delete user.",
        erreur: err.message
      });
    });

}


// Retrieve all Users from the database.
exports.findAll = async (req, res) => {

  res.set('Access-Control-Allow-Origin', '*');

  const findResult = await collection_user.find({}).toArray()
    .catch(err => {
      res.status(500).send({
        message_:
          "Some error occurred while get list of users.",
        erreur: err.message
      });
    });
  res.send(findResult);

}


// Retrieve one User by id from the database.
exports.findOneById = async (req, res) => {
  const id = req.query.id;

  if (id == '' || id == null || id == undefined || !id || !ObjectId.isValid(id))
    return res.status(500).send(
      'User id is null.');

  res.set('Access-Control-Allow-Origin', '*');
  const resultat = await collection_user.findOne({ "_id": new ObjectId(id) })
    .catch(err => {
      res.status(500).send({
        message_:
          "Some error occurred while find user by id.",
        erreur: err.message
      });
    });

  if (!resultat) {
    return res.status(500).json({ error: 'User not found' });
  }

  res.json(resultat)
};


exports.findByName = async (req, res) => {
  const lname = req.query.name.trim();

  let resultat = "error find user"
  res.set('Access-Control-Allow-Origin', '*');

  resultat = await collection_user.find({
    "name": { $options: 'i', "$regex": name }
  },
  ).toArray()
    .catch(err => {
      res.status(500).send({
        message_:
          "Some error occurred while search user by name.",
        erreur: err.message
      });
    });
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


const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    console.error('Erreur lors de la vérification du mot de passe :', error);
    throw error;
  }
};

//connexion
exports.connexion = async function (req, res, next) {

  if (req.body.email == '' || req.body.email == null || req.body.email == undefined
    || !req.body.email || req.body.password == '' || req.body.password == null
    || req.body.password == undefined || !req.body.password)
    return res.status(500).send(
      'EMAIL & PASSWORD is null.');


  const resultat = await collection_user.findOne(
    { email: req.body.email })
    .catch(err => {
      res.status(500).send({
        message_:
          "Some error occurred while get user by email.",
        erreur: err.message
      });
    });

  if (resultat == null) {
    return res.status(500).send(
      'Votre email est incorrecte, veuillez réessayer.');

  } else {

    if (verifyPassword(req.body.password, resultat['password'])) {
      const id = resultat['_id'].toString();

      cookies(id, res)

      // Répondre une seule fois
      return res.json({ message: 'Connexion réussie!', user: resultat });
    }
    else {
      return res.status(500).send(
        {
          message_: 'Votre mot de passe est incorrecte, veuillez réessayer.'
        });
    }
  }

};

exports.logout = async function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.clearCookie("token");
  res.json("ok")
};




//--------------------------------------------------------------
// MOT DE PASSE OUBLIE 
//--------------------------------------------------------------


exports.sendLinkForReInitPasswordOublie = async function (req, res) {

  const userEmail = req.body.email;
  const resetLink = jwt_.generateResetLink(userEmail);

  if (userEmail == '' || userEmail == null || userEmail == undefined || !userEmail)
    return res.status(500).send(
      'Email is null.');


  const mailOptions = {
    from: 'snapfaceangular@gmail.com',
    to: "safinazylm@gmail.com",
    subject: 'Réinitialisation de votre mot de passe',
    html: `<p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
           <a href="${resetLink}">Réinitialiser le mot de passe</a>
           <p>Ce lien expirera dans 1 heure.</p>`,
  };
  res.set('Access-Control-Allow-Origin', '*');

  await collection_user.findOne({ "email": userEmail }).then(data => {
    if (data != null) {

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return res.status(500).send({
            erreur: err,
            message_: 'Erreur lors de l\'envoi de l\'e-mail'
          });
        } else {
          res.send({ message: "Le lien pour reinitialiser votre mot de passe a été envoyé à votre adresse email." })
        }
      });
    } else {
      res.status(500).send("Votre mail n'est pas coorecte.")
    }
  })
}



//reinit password
exports.reinitialisePassword = async function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.body.password == '' || req.body.password == null || req.body.password == undefined || !req.body.password)
    return res.status(500).send(
      'Password is null.');

  const token = jwt_.verifyResetLink(req.body.token);

  collection_user.updateOne({ "email": token },
    {
      $set: {
        "password": req.body.password,
      }
    }).then(data => {
      if (data)
        res.send({ message: "Votre mot de passe a été réinitaliser" });
    })
    .catch(err => {
      res.status(500).send({
        message_:
          "Some error occurred while reinit user password.",
        erreur: err.message
      });
    });
}