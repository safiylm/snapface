const db = require('../config/db.config.js');
const collection_abonnees = db.collection('abonnees');
const collection_statistiqueusers = db.collection('statistiqueusers');

exports.create = async (req, res) => {
  // Save Tutorial in the database
  collection_abonnees
    .insertOne({
      userId: req.body.userId,
      followers: []
    })
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


exports.abonneeAdd = async (req, res) => {
  await collection_statistiqueusers.findOne({ "userId": req.body.userSuiviId }).then(stuer => {
    collection_abonnees.updateOne({ "userId": req.body.userSuiviId },
      { $push: { "followers": req.body.userConnectedId } }).then(d => {
        let followerss = stuer.followers + 1;
        collection_statistiqueusers.updateOne({ "userId": req.body.userSuiviId }, {  $set: {"followers":  followerss } })
        res.send(d);
      })
  })
};


exports.abonneeRemove = async (req, res) => {
  await collection_statistiqueusers.findOne({ "userId": req.body.userSuiviId }).then(stuer => {
    collection_abonnees.updateOne({ "userId": req.body.userSuiviId },
      { $pull: { "followers": req.body.userConnectedId } }).then(d => {
        let followerss = stuer.followers - 1;
        collection_statistiqueusers.updateOne({ "userId": req.body.userSuiviId }, {  $set: {"followers": followerss }})
        res.send(d);

      })
  })
};



exports.findByUserId = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const id = req.query.id;
  const findResult = await collection_abonnees.find({ "userId": id }).toArray();
  res.send(findResult);
};
