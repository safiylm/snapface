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


const isnull = (variable, res) => {
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
    if (match) {
      return true
    }
    return false;
  } catch (error) {
    console.error('Erreur lors de la vérification du mot de passe :', error);
    throw error;
  }
};


//--------------------------------------------------------------
//  EDIT ONLINE
//--------------------------------------------------------------
exports.updateIsOnline = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  let online = req.body.isOnline;

  isnull(req.body._id, res)

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



//--------------------------------------------------------------
//  EDIT PHOTOS
//--------------------------------------------------------------

exports.editUserPhoto = async (req, res) => {
  const filePath = req.file.path;
  res.set('Access-Control-Allow-Origin', '*');
  const phototype = req.body.phototype

  isnull(req.body.userId, res)
  isnull(filePath, res)


  cloudinary.uploader.upload(filePath, {
    folder: 'uploads_secure',
  }, async (error, result) => {
    if (error) return res.status(500).json({ error });
    await collection_user.updateOne({ "_id": new ObjectId(req.body.userId) },
      {
        $set: {
          phototype: result.secure_url,
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



//--------------------------------------------------------------
//  EDIT EMAIL 
//  SEND CONFIRMATION MAIL
//--------------------------------------------------------------

exports.sendConfiramtionEmailForNewEmail = async function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');

  let resetLink = jwt_.generateEmailConfirmationLink(req.body._id, req.body.email)

  isnull(req.body._id, res)
  isnull(req.body.email, res)


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
    {
      $set: { "email": req.query.email, }
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




//--------------------------------------------------------------
//  EDIT PHONE NUMBER  
//--------------------------------------------------------------

exports.editPhoneNumber = async function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');

  isnull(req.body._id, res)

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





//--------------------------------------------------------------
//  EDIT PASSWORD 
//--------------------------------------------------------------

exports.editPassword = async function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');

  isnull(req.body._id, res)
  isnull(req.body.password, res)

  const newpassword = hashPassword(req.body.password);
  const mailOptions = {
    from: 'snapfaceangular@gmail.com',
    to: "safinazylm@gmail.com",
    subject: "Votre mot de passe a été modifier",
    html: `<p>Votre mot de passe a été modifier avec succès. </p>`
  };

  collection_user.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: { "password": newpassword, }
    }).then(data => {
      if (data) {
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            return res.status(500).send({
              erreur: err,
              message_: 'Erreur lors de l\'envoi de l\'e-mail'
            });
          } else {
            res.send({ message: "Votre modification a été enregistré avec succès." })
          }
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message_:
          "Some error occurred while edit password of user.",
        erreur: err.message
      });
    });
}




//--------------------------------------------------------------
// MOT DE PASSE OUBLIE 
//
// REINITALISATION DU MDP
//--------------------------------------------------------------


exports.sendLinkForReInitPasswordOublie = async function (req, res) {

  const userEmail = req.body.email;
  const resetLink = jwt_.generateResetLink(userEmail);

  isnull(userEmail, res)


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

  isnull(req.body.password, res)

  const token = jwt_.verifyResetLink(req.body.token);

  const mailOptions = {
    from: 'snapfaceangular@gmail.com',
    to: "safinazylm@gmail.com",
    subject: "Votre mot de passe a été réinitialiser",
    html: `<p>Votre mot de passe a été réinitialiser avec succès. </p>`
  };


  collection_user.updateOne({ "email": token },
    {
      $set: {
        "password": req.body.password,
      }
    }).then(data => {
      if (data) {
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            return res.status(500).send({
              erreur: err,
              message_: 'Erreur lors de l\'envoi de l\'e-mail'
            });
          } else {
            res.send({ message: "Votre mot de passe a été réinitaliser" });
          }
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message_:
          "Some error occurred while reinit user password.",
        erreur: err.message
      });
    });
}


