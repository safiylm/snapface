const db = require('../config/db.config.js');
const collection_abonnees = db.collection('abonnees');
const collection_statistiqueusers = db.collection('statistiqueusers');

const isnull = (variable) => {
  if (variable == '' || variable == null || variable == undefined || !variable)
    return true;
}

//create abonnee 
exports.create = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  if (isnull(req.body.userId) || isnull(req.body.follows)) {
    res.status(400).send(
      { error: 'params is null.' });
    return
  }
  collection_abonnees
    .insertOne({
      userId: req.body.userId, // user qui suit 
      follows: req.body.follows, //user qui est suivi 
    })
    .then((data) => {
      if (data)
        collection_statistiqueusers.updateOne({ "userId": req.body.follows },
          { $inc: { "followers": 1 } }, true).then(
            (data1) => {
              if (data1)
                res.status(201).json({ "message": "Create abonnement", "_id": data.insertedId })
            }
          )
          .catch(err => {
            res.status(500).send({ error: err.message })
          });
    })
    .catch(err => {
      res.status(500).send({ error: err.message })
    });
};


//remove abonnee 
exports.remove = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (isnull(req.body.userId) || isnull(req.body.follows)) {
    res.status(400).send(
      { error: 'params is null.' });
    return
  }

  collection_abonnees.deleteOne({
    "userId": req.body.userId,
    "follows": req.body.follows
  })
    .then((data) => {
      if (data)
        collection_statistiqueusers.updateOne({ "userId": req.body.follows },
          { $inc: { "followers": -1 } }, true)
          .then(
            (data1) => { if (data1) res.status(200).json({ "message": "Remove abonnement" }) }
          )
          .catch(err => {
            res.status(500).send({ error: err.message })
          });
    })
    .catch(err => {
      res.status(500).send({ error: err.message })

    });
};


//get abonnement of user with id 
exports.findAbonnementByUserId = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const id = req.query.id;

  if (isnull(id)) {
    res.status(400).send(
      'user id is null.');
    return
  }

  // list des gens que suit userId
  const findResult = await collection_abonnees.find({ "userId": id }).toArray();

  if (findResult == null || findResult == [])
    res.status(404).send("Abonnements not founded.")
  else
    res.status(200).json(findResult)
};

//get followers of user with id 
exports.findFollowersByUserId = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  //get les gens qui suivent user
  const id = req.query.id;

  if (isnull(id)) {
    res.status(400).send(
      'user id is null.');
    return
  }

  const findResult = await collection_abonnees.find({ "follows": id }).toArray();
  if (findResult == null || findResult == [])
    res.status(404).send("Followers not founded.")
  else
    res.status(200).json(findResult)
};

//get if user follows "follows"
exports.checkAbonnement = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const userId = req.query.userId;
  const follows = req.query.follows;

  if (isnull(userId) || isnull(follows)) {
    res.status(400).send(
      'user id is null.');
    return
  }

  const findResult = await collection_abonnees.findOne({ "userId": userId, "follows": follows });
  if (findResult == null || findResult == [])
    res.status(404).send("Abonnement not founded.")
  else
    res.status(200).json(findResult)
};

