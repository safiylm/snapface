const db = require('../config/db.config.js');
const collection_abonnees = db.collection('abonnees');
const collection_statistiqueusers = db.collection('statistiqueusers');

exports.create = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

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
  res.set('Access-Control-Allow-Origin', '*');

  collection_abonnees.updateOne({ "userId": req.body.userSuiviId },
    { $push: { "followers": req.body.userConnectedId } }).then(() => {
      collection_statistiqueusers.updateOne({ "userId": req.body.userSuiviId },
        { $inc: { "followers": -1 } }, true)
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while incremente nb abonne."
          })
        });
      //  res.send(d);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while add abonne."
      })
    });
};


exports.abonneeRemove = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  collection_abonnees.updateOne({ "userId": req.body.userSuiviId },
    { $pull: { "followers": req.body.userConnectedId } })
    .then(() => {
      collection_statistiqueusers.updateOne({ "userId": req.body.userSuiviId },
        { $inc: { "followers": -1 } }, true)
        //  res.send(d);
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while decremente nbfollowers."
          })
        });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while remove abonne."
      })
    });
};



exports.findByUserId = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const id = req.query.id;
  const findResult = await collection_abonnees.find({ "userId": id }).toArray();
  res.send(findResult);
};
