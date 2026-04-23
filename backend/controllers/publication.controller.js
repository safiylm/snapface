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



const isnull = (variable) => {
  if (variable == '' || variable == null || variable == undefined)
    return true;
}

//create new post 
exports.create = async (req, res) => {
  // Validate request
  if (isnull(req.body.body) || isnull(req.body.userId)) {
    return res.status(400).send({
      error: "Post is empty."
    })
  }

  res.set('Access-Control-Allow-Origin', '*');
  let array_assets = []

  if(req.files != null)
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

  await collection_publications.insertOne(post)
    .then(data0 => {
      if (data0)
        collection_statistiqueusers.updateOne({ "userId": req.body.userId },
          { $inc: { "totalPosts": 1 } }).then(data => {
            if (data)
              res.status(201).send({ "message": "Création publication réussie", "postId": data0.insertedId });
          })
          .catch(err => {
            res.status(500).send({ error: err.message });
          });

    })
    .catch(err => {
      res.status(500).send({ error: err.message });
    });
};


//Edit post 
exports.edit = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  
  if (isnull(req.body._id)) {
    res.status(400).send({ error: 'user id is null.' });
    return
  }
  if (isnull(req.body.existingAssets) && isnull(req.body.body)) {
    res.status(400).send({ error: 'user id is null.' });
    return
  }


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
    res.status(200).send({ "message": "Modification réussie" });
  else
    res.status(500).send({ "error": "Erreur." });

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

  let objet = { "userId": req.query.userId }
  if (isnull(req.query.userId)) {
   objet={}
  }


  const abonnes = await collection_abonnees.find( objet ).toArray()
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

  if (isnull(req.query.id)) {
    res.status(400).send({ error: 'user id is null.' });
    return
  }

  res.set('Access-Control-Allow-Origin', '*');
  const resultat = await collection_publications.find({ "userId": req.query.id }).sort({ date: -1 }).toArray();

  if (resultat == null) {
    res.status(404).json({ error: 'Posts not found' });
  }
  else {
    res.json(resultat)
  }
}



//Retrieve post by id 
exports.findOneById = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const id = req.query.id

  if (isnull(id)) {
    res.status(400).send({ error: 'post id is null.' });
    return
  }

  const result = await collection_publications.findOne({
    "$or": [{ _id: new ObjectId(id) }, { _id: id }]
  })
  if (result == null)
    res.status(404).json({ error: 'Posts not found' });
  else
    res.send(result)
}




exports.searchPostByTitle = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const name = req.query.name;

  if (isnull(name)) {
    res.status(400).send({ error: 'user id is null.' });
    return
  }

  const result = await collection_publications.find({ "body": { $options: 'i', "$regex": name } }).toArray()

  if (result == null || result == [] || result == "")
    res.status(404).json({ error: 'Posts not found' });
  else
    res.send(result)

};



//Delete post 
exports.delete = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

    if (isnull(req.body.id)) {
    res.status(400).send({ error: 'post id is null.' });
    return
  }

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
                    res.status(500).send({ error: err.message });
                  });
              }


            }).catch(err => {
              res.status(500).send({ error: err.message });
            });
        }
      }).catch(err => {
        res.status(500).send({ error: err.message });
      });
    }
  }).catch(err => {
    res.status(500).send({ error: err.message });
  });
}
