const db = require('../config/db.config.js');
const collection_commentaires = db.collection('commentaires');
const ObjectId = require('mongodb').ObjectId;
const collection_publications = db.collection('publications');


const isnull = (variable) => {
  if (variable == '' || variable == null || variable == undefined || !variable)
    return true;
}

//create new comments
exports.create = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (isnull(req.body.text) || isnull(req.body.userId) || isnull(req.body.postId)) {
    res.status(400).send(
      { error: 'params is null.' });
    return
  }

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
            if (data1)
              res.status(201).json({ "commentaire": data, "publication": data1.modifiedCount });
          })

    })
    .catch(err => {
      res.status(500).send({ error: err.message })
      console.log(err)
    });


};


//delete comment with id
exports.delete = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (isnull(req.body._id)) {
    res.status(400).send(
      { error: 'params is null.' });
    return
  }
  collection_commentaires.
    deleteOne({ "_id": new ObjectId(req.body._id) })
    .then(data => {
      if (data)
        collection_publications.updateOne({ "_id": new ObjectId(req.body.postId) },
          {
            $inc: { "commentsCount": -1, }
          }).then(data1 => {
            if (data1)
              res.json(data);
          })

    })

}


//update comment with id 
exports.update = async (req, res) => {
  if (isnull(req.body._id) || isnull(req.body.text)) {
    res.status(400).send(
      { error: 'params is null.' });
    return
  }
  const updateResult = await collection_commentaires.updateOne({ "_id": new ObjectId(req.body._id) },
    { $set: { "text": req.body.text } });
  res.set('Access-Control-Allow-Origin', '*');
  if (updateResult)
    res.status(200).json(updateResult);
  else
    res.status(500).send({ "error": "Une erreur est survenue" })

}


exports.findByPostId = async (req, res) => {

  const id = req.query.id;
  if (isnull(id)) {
    res.status(400).send(
      { error: 'params is null.' });
    return
  }
  const findResult = await collection_commentaires.find({ "postId": id }).toArray();
  res.set('Access-Control-Allow-Origin', '*');
  res.send(findResult);
};

