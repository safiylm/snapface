const db = require('../config/db.config.js');
const collection_publications = db.collection('publications');
const collection_interactionsociales = db.collection('interactionsociales');
const collection_commentaires = db.collection('commentaires');
const ObjectId = require('mongodb').ObjectId;
const collection_statistiqueusers = db.collection('statistiqueusers')

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


//create new post 
exports.create = async (req, res) => {
  // Validate request
  //   if (!req.body.firstName) {
  //     res.status(400).send({ message: "Content can not be empty!" });
  //     return;
  //   }

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
    title: req.body.title,
    body: req.body.body,
    userId: req.body.userId,
    assets: array_assets,
    audio: req.body.audio,
    date: Date,
  };

  // Save Tutorial in the database
 await collection_publications
    .insertOne(post)
    .then(data => {
      collection_interactionsociales
        .insertOne({
          postId: data.insertedId.toString(),
          comments: 0,
          likes: 0,
          points: 0
        })
        .then(data1 => {

          collection_statistiqueusers.updateOne({ "userId": req.body.userId },
            { $inc: { "totalPosts": 1 } }).then(data => {
              res.send(data);
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while add like."
              })
            });

        })

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};


//Edit post 
exports.edit = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  let array_assets = []

  for (const file of req.files) {
   await cloudinary.uploader.upload(file.path, {
      folder: 'uploads_secure',
    }, async (error, result) => {
      if (error) return res.status(500).json({ error });
      array_assets.push(result.secure_url)
    })
  }
  const updateResult = await collection_publications.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: {
        "title": req.body.title,
        "body": req.body.body,
        "assets": array_assets,
        "audio": req.body.audio,

      }
    });
  res.send(updateResult);
}


// Retrieve all Posts from the database.
exports.findAll = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const findResult = await collection_publications.find({}).sort({ date: -1 }).toArray();
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
  const id = req.query.id;
  res.send(await collection_publications.findOne({ "_id": new ObjectId(id) }))
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
    collection_interactionsociales.deleteOne({ "postId": req.body.id }).then(data1 => {
      collection_commentaires.
        deleteMany({ "postId": req.body.id }).then(k => {

          collection_statistiqueusers.updateOne({ "userId": data.userId },
            { $inc: { "totalPosts": -1 } })
            .then(data2 => {
              res.send(data2);
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while add like."
              })
            });



        })
    })
  });
}