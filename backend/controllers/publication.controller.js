const db = require('../config/db.config.js');
const collection_publications = db.collection('publications');
const collection_interactionsociales = db.collection('interactionsociales');
const collection_commentaires = db.collection('commentaires');
const ObjectId = require('mongodb').ObjectId;

exports.create = (req, res) => {
    // Validate request
    //   if (!req.body.firstName) {
    //     res.status(400).send({ message: "Content can not be empty!" });
    //     return;
    //   }
  res.set('Access-Control-Allow-Origin', '*');
    
    const post = {
        title: req.body.title,
        body: req.body.body,
        userId: req.body.userId,
        images:  req.body.images,
         date: Date,
        // videos: [{ url: req.body.videos, title: "", }],
        // audios: [{ url: req.body.audios , title: "", }],
    };


    // Save Tutorial in the database
    collection_publications
        .insertOne(  post )
        .then(data => {
            collection_interactionsociales
            .insertOne( {
                postId: data.insertedId.toString() ,
                comments: 0,
                likes: 0,
                points: 0
              })
            .then(data1 => {})
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
 
    const findResult = await collection_publications.find({}).toArray();
    res.send(findResult);

}

exports.findAllPublicationByUserId = async (req, res) => {

    res.set('Access-Control-Allow-Origin', '*');
  
    const findResult = await collection_publications.find({"userId" : req.query.id }).toArray();
    res.send(findResult);

}

exports.findAllPublicationByPostId= async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
 
    const findResult = await collection_publications.findOne({"_id" : new ObjectId(req.query.postId ) });
    res.send(findResult);

}

exports.findOneById = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    const id = req.query.id;
    res.send(await collection_publications.findOne({ "_id": new ObjectId(id) }))
};


exports.edit = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

    const updateResult = await collection_publications.updateOne({ "_id": new ObjectId(req.body._id) },
      {
        $set: {
          "title": req.body.title,
          "body": req.body.body,
          "images": req.body.images,
        //   "videos": req.body.videos,
        //   "audios": req.body.audios,
         
        }
      });
    res.send(updateResult);
  }

  
exports.delete =  (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

    collection_publications.deleteOne({ "_id": new ObjectId(req.body.id) }).then(data => {
        collection_interactionsociales.deleteOne({ "postId": req.body.id }).then(data1 => {
            collection_commentaires.
            deleteMany({ "postId": req.body.id }).then(k => {
            res.send(k );
            })
        })
    });
  }