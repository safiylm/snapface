const db = require('../config/db.config.js');
const collection_abonnees = db.collection('abonnees');

exports.create = (req, res) => {

  const c1 = {

    userId: "65cd023efb273094193ac038",
    followers: ["65cd023efb273094193ac039",]
  };

  const c2 = {

    userId: "65cd023efb273094193ac039",
    followers: ["65cd023efb273094193ac038",]
  };

  const c3 = {

    userId: "65d08254cddc535b98d9833e",
    followers: ["65cd023efb273094193ac038",]
  };



  // Save Tutorial in the database
  collection_abonnees
    .insertMany([c1, c2, c3])
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
