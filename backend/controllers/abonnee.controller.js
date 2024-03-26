const db = require('../config/db.config.js');
const collection_abonnees = db.collection('abonnees');

exports.create = (req, res) => {

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


exports.abonneeAdd = (req, res) => {

  if (req.body.userConnectedId != null && req.body.userConnectedId != undefined
    && req.body.userId != null && req.body.userId != undefined) {
    const updateResult = collection_abonnees.updateOne({ "userId": req.body.userSuiviId },
      { $push: { "followers": req.body.userConnectedId } });
    res.send(updateResult);
  }


};

exports.abonneeRemove = (req, res) => {
  if (req.body.userConnectedId != null && req.body.userConnectedId != undefined
    && req.body.userId != null && req.body.userId != undefined) {
    const updateResult = collection_abonnees.updateOne({ "userId": req.body.userSuiviId },
      { $pull: { "followers": req.body.userConnectedId } });
    res.send(updateResult);
  }

};

exports.findByUserId = async (req, res) => {
  const id = req.query.id;
  const findResult = await collection_abonnees.find({ "userId": id }).toArray();
  res.send(findResult);
};
