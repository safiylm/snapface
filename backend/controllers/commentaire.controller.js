const db = require('../config/db.config.js');
const collection_commentaires = db.collection('commentaires');
const collection_interactionsociales = db.collection('interactionsociales');
const ObjectId = require('mongodb').ObjectId;


//create new comments
exports.create = (req, res) => {

  collection_interactionsociales.findOne({ "postId": req.body.postId }).then(i => {

    collection_commentaires
      .insertOne({
        title: req.body.title,
        date: Date.now(),
        userId: req.body.userId,
        postId: req.body.postId

      })
      .then(data => {
        const updateResult = collection_interactionsociales.updateOne({ "postId": req.body.postId },
          { $inc: { "comments": 1 } }).then(x => {
            res.set('Access-Control-Allow-Origin', '*');
            res.send(updateResult);
          })

      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });

  })

};


//delete comment with id
exports.delete = async (req, res) => {

  collection_commentaires.
    findOne({ "_id": new ObjectId(req.body.id) }).then(c => {

      collection_interactionsociales.
        findOne({ "postId": c.postId }).then(i => {

          collection_commentaires.
            deleteOne({ "_id": new ObjectId(req.body.id) }).then(k => {

              collection_interactionsociales.
                updateOne({ "postId": c.postId },
                  { $inc: { "comments": - 1 } }).then(x => {
                    res.set('Access-Control-Allow-Origin', '*');
                    res.send(x);
                  })
            })
        })
    })
}


//update comment with id 
exports.update = async (req, res) => {

  console.log(req.body._id);
  const updateResult = await collection_commentaires.updateOne({ "_id": new ObjectId(req.body._id) },
    { $set: { "title": req.body.title } });
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
  const id = req.query.id;
  const total = req.query.comments;
  res.set('Access-Control-Allow-Origin', '*');

 collection_interactionsociales
      .updateOne({ postId: id },
        {  $set: { "comments":  total }
        }, true
      )
      .then(data => {
          res.send('Update successful!')
      })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User."
    });
  });
}
