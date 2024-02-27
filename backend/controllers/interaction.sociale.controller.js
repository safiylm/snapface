const db = require('../config/db.config.js');
const collection_interactionsociales = db.collection('interactionsociales');

exports.create = (req, res) => {
  // Validate request
  if (!req.body.postId) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const is1 = {
    postId: req.body.postId,
    comments: req.body.comments,
    likes: req.body.likes,
    points: req.body.points,
  };


  // Save Tutorial in the database
  collection_interactionsociales
    .insertOne(is1)
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



exports.findByPublicationId = async (req, res) => {
  const id = req.query.id;
  res.send(await collection_interactionsociales.findOne({ "postId": id }))
};


