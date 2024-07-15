const db = require('../config/db.config.js');
const collection_commentaires = db.collection('commentaires');
const collection_interactionsociales = db.collection('interactionsociales');

const ObjectId = require('mongodb').ObjectId;

exports.create = (req, res) => {
 // res.set('Access-Control-Allow-Origin', '*');

  const c1 = {
    title: req.body.title,
    date: Date.now(),
    userId: req.body.userId,
    postId: req.body.postId,

  };

  collection_interactionsociales.findOne({ "postId": req.body.postId }).then(i => {

    collection_commentaires
      .insertOne(c1)
      .then(data => {
        const updateResult = collection_interactionsociales.updateOne({ "postId": req.body.postId },
          { $set: { "comments": i.comments + 1 } }).then(x => {
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



exports.delete = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  collection_commentaires.
    findOne({  "_id": new ObjectId(req.body.id) }).then(c => {
      collection_interactionsociales.
        findOne({ "postId": c.postId }).then(i => {
          collection_commentaires.
            deleteOne({ "_id": new ObjectId(req.body.id) }).then(k => {
              const updateResult = collection_interactionsociales.
              updateOne({ "postId": c.postId },
                { $set: { "comments": i.comments - 1 } }).then(x => {
                  res.send(updateResult);
                })
            })
        })
    })
}


exports.update = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  console.log(req.body._id);
  const updateResult = await collection_commentaires.updateOne({ "_id": new ObjectId(req.body._id) },
    { $set: { "title": req.body.title } });
  res.send(updateResult);

}

//res.body.insertedId

exports.findByPublicationId = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const id = req.query.id;
  const findResult = await collection_commentaires.find({ "postId": id }).toArray();
  res.send(findResult);
};


