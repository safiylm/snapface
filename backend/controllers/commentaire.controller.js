const db = require('../config/db.config.js');
const collection_commentaires = db.collection('commentaires');

exports.create = (req, res) => {

    const c1 = {
      title: req.body.title,
      date: Date.now(),
      userId: req.body.userId,
      postId: req.body.postId,

    };

    // Save Tutorial in the database
    collection_commentaires
        .insertOne( c1 )
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

//res.body.insertedId

exports.findByPublicationId = async (req, res) => {
    const id = req.query.id;
    const findResult = await collection_commentaires.find({ "postId": id }).toArray();
    res.send(findResult);
  };


