const db = require('../config/db.config.js');
const collection_abonnees = db.collection('abonnees');

exports.create = (req, res) => {


  // Save Tutorial in the database
  collection_abonnees
    .insertOne( {

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



exports.findByUserId = async (req, res) => {
  const id = req.query.id;
  const findResult = await collection_abonnees.find({ "userId": id }).toArray();
  res.send(findResult);
};
