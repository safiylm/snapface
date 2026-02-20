const db = require('../config/db.config.js');
const collection_abonnees = db.collection('abonnees');
const collection_statistiqueusers = db.collection('statistiqueusers');

//create abonnee 
exports.create = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  collection_abonnees
    .insertOne({
      userId: req.body.userId, // user qui suit 
      follows: req.body.follows, //user qui est suivi 
    })
    .then((data) => {
      collection_statistiqueusers.updateOne({ "userId": req.body.follows },
        { $inc: { "followers": 1 } }, true).then(
          (data1) => {
            res.send(data1)
          }
        )
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while incremente nb abonne."
          })
        });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the abonnee."
      });
    });
};


//remove abonnee 
exports.remove = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  collection_abonnees.deleteOne({ "userId": req.body.userId, "follows": req.body.follows })
    .then((data) => {
      collection_statistiqueusers.updateOne({ "userId": req.body.follows },
        { $inc: { "followers": -1 } }, true)
        .then(
          (data1) => { res.send(data1) }
        )
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


//get abonnement of user with id 
exports.findAbonnementByUserId = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

// list des gens que suit userId
  const id = req.query.id;
  const findResult = await collection_abonnees.find({ "userId": id }).toArray();
  res.send(findResult);
};

//get followers of user with id 
exports.findFollowersByUserId = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  //get les gens qui suivent user
  const id = req.query.id;
  const findResult = await collection_abonnees.find({ "follows": id }).toArray();
  res.send(findResult);
};

  //get if user follows "follows"
exports.checkAbonnement = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const userId = req.query.userId;
  const follows = req.query.follows;
  const findResult = await collection_abonnees.findOne({"userId": userId, "follows": follows });
  res.send(findResult);
};

