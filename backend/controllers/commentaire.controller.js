const db = require('../config/db.config.js');
const collection_commentaires = db.collection('commentaires');
const ObjectId = require('mongodb').ObjectId;

exports.create = (req, res) => {

  const c1 = {
    title: req.body.title,
    date: Date.now(),
    userId: req.body.userId,
    postId: req.body.postId,

  };

  // Save Tutorial in the database
  collection_commentaires
    .insertOne(c1)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

exports.delete = async (req, res) => {
  console.log(req.body.id);
  const deleteResult = await collection_commentaires.deleteOne({ "_id": new ObjectId(req.body.id) });
  res.send(deleteResult);

}


exports.update = async (req, res) => {
  console.log(req.body._id);
  const updateResult = await collection_commentaires.updateOne({ "_id": new ObjectId(req.body._id) },
    { $set: { "title": req.body.title } });
  res.send(updateResult);

}

//res.body.insertedId

exports.findByPublicationId = async (req, res) => {
  const id = req.query.id;
  const findResult = await collection_commentaires.find({ "postId": id }).toArray();
  res.send(findResult);
};


