const db = require('../config/db.config.js');
const collection_publications = db.collection('publications');
const collection_interactionsociales = db.collection('interactionsociales');
const collection_commentaires = db.collection('commentaires');
const ObjectId = require('mongodb').ObjectId;
const collection_statistiqueusers = db.collection('statistiqueusers')
const cloudinary = require('cloudinary').v2;
const collection_user = db.collection('users');
const collection_abonnees = db.collection('abonnees');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


//create new post 
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.body && ! !req.body.userId) {
    return res.status(500).send({
      message:
        err.message || "User and body of post is empty."
    })
  }

  res.set('Access-Control-Allow-Origin', '*');
  let array_assets = []

  //const filePath = req.file.path;
  for (const file of req.files) {
    await cloudinary.uploader.upload(file.path, {
      folder: 'uploads_secure',
    }, async (error, result) => {
      if (error) return res.status(500).json({ error });
      array_assets.push(result.secure_url)
    })

  }

  const post = {
    body: req.body.body,
    userId: req.body.userId,
    assets: array_assets,
    date: Date.now(),
    commentsCount: 0,
    likesCount: 0,
    repostsCount: 0,
    savesCount: 0
  };

  // Save Tutorial in the database
  await collection_publications
    .insertOne(post)
    .then(data0 => {
      if (data0)
        collection_statistiqueusers.updateOne({ "userId": req.body.userId },
          { $inc: { "totalPosts": 1 } }).then(data => {
            if (data)
              res.send({ "message": "Votre publication a été crée avec succès!" });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while incremente totale post in SU."
            })
          })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating a post."
      });
    });
};


//Edit post 
exports.edit = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  let existingAssets = JSON.parse(req.body.existingAssets || "[]");
  let newFiles = req.files; // tes nouveaux uploads

  for (const file of newFiles) {
    await cloudinary.uploader.upload(file.path, {
      folder: 'uploads_secure',
    }, async (error, result) => {
      if (error) return res.status(500).json({ error });
      existingAssets.push(result.secure_url)
    })
  }
  const updateResult = await collection_publications.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: {
        "body": req.body.body,
        "assets": existingAssets,
      }
    });
  if (updateResult.acknowledged == true)
    res.send({ "message": "Votre publication a été modifié." });
}


// Retrieve all Posts from the database.
exports.findAll = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const users = await collection_user
    .find({ "$or": [{ isPrivate: false }, { isPrivate: null }] })
    .toArray();

  const userIds = users.map(user => user._id.toString());

  const findResult = await collection_publications.find({
    userId: { $in: userIds }
  })
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  res.send(findResult);
}



// Retrieve all Posts from the database.
exports.findAllPourMoi = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const abonnes = await collection_abonnees.find({ "userId": req.query.userId }).toArray()
  const followsIds = abonnes.map(ab => ab.follows);


  const users = await collection_user
    .find({ "$or": [{ isPrivate: false }, { isPrivate: null }] })
    .toArray();

  const userIds = users.map(user => user._id.toString());

  const findResult = await collection_publications.find({
    $or: [
      // 1. Utilisateurs publics
      {
        userId: {
          $in: userIds
        }
      },
      // 2. Utilisateurs suivis
      {
        userId: { $in: followsIds }
      }
    ]
  }).sort({ date: 1 }).toArray();
  res.send(findResult);
}

// Retrieve all Posts by userID from the database.
exports.findAllPublicationByUserId = async (req, res) => {

  res.set('Access-Control-Allow-Origin', '*');
  const findResult = await collection_publications.find({ "userId": req.query.id }).sort({ date: -1 }).toArray();
  res.send(findResult);
}



//Retrieve post by id 
exports.findOneById = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const id = req.query.id
  if (id != null && id != '' && id != undefined) {
    console.log(id)
    const result = await collection_publications.findOne({
      "$or": [{ _id: new ObjectId(id) }, { _id: id }]
    })
    res.send(result)
  }
  else
    res.send("No Post!")
};


exports.searchPostByTitle = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const name = req.query.name;
  res.send(await collection_publications.find({ "title": { $options: 'i', "$regex": name } }).toArray())
};


//Delete post 
exports.delete = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  collection_publications.deleteOne({ "_id": new ObjectId(req.body.id) }).then(data => {
    if (data) {
      collection_interactionsociales.deleteMany({ "postId": req.body.id }).then(data1 => {
        if (data1) {
          collection_commentaires.
            deleteMany({ "postId": req.body.id }).then(data2 => {
              if (data2) {

                collection_statistiqueusers.updateOne({ "userId": data.userId },
                  { $inc: { "totalPosts": -1 } })
                  .then(data2 => {
                    res.send(data2);
                  })
                  .catch(err => {
                    res.status(500).send({
                      message:
                        err.message || "Some error occurred while delete statistique user of post deleted."
                    })
                  });
              }


            }).catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while delete commentaires of post deleted."
              })
            })
        }
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while delete interactions of post deleted."
        })
      })
    }
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while delete post."
    })
  })
}
