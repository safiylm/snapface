const db = require('../config/db.config.js');
const collection_commentaires = db.collection('commentaires');
const collection_interactionsociales = db.collection('interactionsociales');
const ObjectId = require('mongodb').ObjectId;
const collection_publications = db.collection('publications');


//create new comments
exports.create = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  collection_commentaires
    .insertOne({
      text: req.body.text,
      date: Date.now(),
      userId: req.body.userId,
      postId: req.body.postId

    })
    .then(data => {
      if (data)
        collection_publications.updateOne({ "_id": new ObjectId(req.body.postId) },
          {
            $inc: { "commentsCount": 1, }
          }).then(data1 => {
            res.send(data);
          })

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the comment."
      });
    });

};


//delete comment with id
exports.delete = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  collection_commentaires.
    deleteOne({ "_id": new ObjectId(req.body.id) })
    .then(data => {
      if (data)
        collection_publications.updateOne({ "_id": new ObjectId(req.body.postId) },
          {
            $inc: { "commentsCount": -1, }
          }).then(data1 => {
            console.log(data1)
            res.json(data);
          })
    })

}


//update comment with id 
exports.update = async (req, res) => {

  const updateResult = await collection_commentaires.updateOne({ "_id": new ObjectId(req.body._id) },
    { $set: { "text": req.body.text } });
  res.set('Access-Control-Allow-Origin', '*');
  res.send(updateResult);

}


exports.findByPublicationId = async (req, res) => {

  const id = req.query.id;
  const findResult = await collection_commentaires.find({ "postId": id }).toArray();
  res.set('Access-Control-Allow-Origin', '*');
  res.send(findResult);
};


exports.checkTotalComments = async (req, res) => {
  res.json('a coder ')
}
