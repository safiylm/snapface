const db = require('../config/db.config.js');
const collection_interactionsociales = db.collection('interactionsociales');
const ObjectId = require('mongodb').ObjectId;
const collection_statistiqueusers = db.collection('statistiqueusers')
const collection_publications = db.collection('publications')


//add point
exports.pointsAdd = (req, res) => {

  // Validate request
  if (!req.body.postId && !req.body.userId) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a point
  const interaction = {
    postId: req.body.postId,
    userId: req.body.userId,
    type: "point",
  };
  res.set('Access-Control-Allow-Origin', '*');

  // Save interaction in the database
  collection_interactionsociales
    .insertOne(interaction)
    .then(data => {
      if (data)
        collection_publications.updateOne({ "_id": new ObjectId(req.body.postId) },
          { $inc: { "pointsCount": 1 } }).then(
            (data1) => {
              if (data1)
                collection_statistiqueusers.updateOne({ "userId": req.body.userId },
                  { $inc: { "totalPoints": 1 } }, true)
                  .then(data2 => {
                    if (data2) res.send(data2);
                  })
                  .catch(err => {
                    res.status(500).send({
                      message:
                        err.message || "Some error occurred while inscremente point in statistique users."
                    })
                  });

            }
          )
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while incremente nb points."
            })
          });

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while add point."
      });
    });

};


//Remove point
exports.pointsRemove = (req, res) => {

  // Validate request
  if  (!req.body.postId && !req.body.userId && !req.body.interactionId){
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // req.body.interactionId,

  res.set('Access-Control-Allow-Origin', '*');

  // delete interaction in the database
  collection_interactionsociales
    .deleteOne({ "_id": new ObjectId(req.body.interactionId) })
    .then(data => {
      if (data)
        collection_publications.updateOne({ "_id": new ObjectId(req.body.postId) },
          { $inc: { "pointsCount": -1 } }).then(
            (data1) => {
              if (data1)
                collection_statistiqueusers.updateOne({ "userId": req.body.userId },
                  { $inc: { "totalPoints": -1 } }, true)
                  .then(data2 => {
                    if (data2) res.send(data2);
                  })
                  .catch(err => {
                    res.status(500).send({
                      message:
                        err.message || "Some error occurred while decremente point in statistique users."
                    })
                  });

            }
          )
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while incremente nb points."
            })
          });

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while remove point"
      });
    });

};


//like/ add like 
exports.likesAdd = async (req, res) => {
  // Validate request
  if (!req.body.postId && !req.body.userId) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a point
  const interaction = {
    postId: req.body.postId,
    userId: req.body.userId,
    type: 'like',
  };
  res.set('Access-Control-Allow-Origin', '*');

  // Save interaction in the database
  collection_interactionsociales
    .insertOne(interaction)
    .then(data => {
      if (data)
        collection_publications.updateOne({ "_id": new ObjectId(req.body.postId) },
          { $inc: { "likesCount": 1 } }).then(
            (data1) => {
              if (data1)
                res.send(data1)
            }
          )
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while incremente nb like."
            })
          });

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while add like ."
      });
    });



};


//Remove like / dislike
exports.likesRemove = async (req, res) => {
  // Validate request
  if (!req.body.postId && !req.body.userId && !req.body.interactionId) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  res.set('Access-Control-Allow-Origin', '*');

  // Save interaction in the database
  collection_interactionsociales
    .deleteOne({ "_id": new ObjectId(req.body.interactionId) })
    .then(data => {
      if (data)
        collection_publications.updateOne({ "_id": new ObjectId(req.body.postId) },
          { $inc: { "likesCount": -1 } }).then(
            (data1) => {
              if (data1)
                res.send(data1)
            }
          )
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while decremente nb like."
            })
          });

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while remove like ."
      });
    });


};



//Voir tous les likes d’un post	
exports.getAllLikesByPostId = async (req, res) => {
  const postId = req.query.postId;
  res.set('Access-Control-Allow-Origin', '*');
  res.send(await collection_interactionsociales.find({ postId, type: 'like' }) )
};


//Voir tous les points d’un post	
exports.getAllPointsByPostId = async (req, res) => {
  const postId = req.query.postId;
  res.set('Access-Control-Allow-Origin', '*');
  res.send(await collection_interactionsociales.find({ postId, type: 'point' }) )
};



//Voir tous les likes faits par un user	
exports.getAllLikesByUserId = async (req, res) => {
  const userId = req.query.userId;
  res.set('Access-Control-Allow-Origin', '*');
  res.send(await collection_interactionsociales.find({ userId, type: 'like' }).toArray() )
};


//Voir tous les points faits par un user	
exports.getAllPointsByUserId = async (req, res) => {
  const userId = req.query.userId;
  res.set('Access-Control-Allow-Origin', '*');
  res.send(await collection_interactionsociales.find({ userId, type: 'point' }).toArray() )
};


//Voir le nombre de likes d’un post	Interaction.countDocuments({ postId, type: 'like' })
exports.getLikesCountByPostId = async (req, res) => {
  const postId = req.query.postId;
  res.set('Access-Control-Allow-Origin', '*');
  res.send(await collection_interactionsociales.countDocuments({ postId, type: 'like' }) )
};

exports.getIfUserAlreadyLikePost = async (req, res) => {
  const postId = req.query.postId;
  const userId = req.query.userId;
  res.set('Access-Control-Allow-Origin', '*');
  res.send(await collection_interactionsociales.findOne({ postId, userId, type: 'like' }) )
};

exports.getIfUserAlreadyPointPost = async (req, res) => {
  const postId = req.query.postId;
  const userId = req.query.userId;
  res.set('Access-Control-Allow-Origin', '*');
  res.send(await collection_interactionsociales.findOne({ postId, userId, type: 'point' }) )
};


//Voir le nombre de likes d’un post	Interaction.countDocuments({ postId, type: 'like' })
exports.getPointsCountByPostId = async (req, res) => {
  const postId = req.query.postId;
  res.set('Access-Control-Allow-Origin', '*');
  res.send(await collection_interactionsociales.countDocuments({ postId, type: 'point' }) )
};

