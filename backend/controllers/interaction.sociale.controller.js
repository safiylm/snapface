const db = require('../config/db.config.js');
const collection_interactionsociales = db.collection('interactionsociales');
const ObjectId = require('mongodb').ObjectId;
const collection_publications = db.collection('publications')




//Repost/ add repost 
exports.interactionAdd = async (req, res) => {
  // Validate request
  if (!req.body.postId && !req.body.userId) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  res.set('Access-Control-Allow-Origin', '*');


  // Create a point
  const interaction = {
    postId: req.body.postId,
    userId: req.body.userId,
    type: req.body.interaction,
  };
  increment={}
  if (req.body.interaction == "repost")
    increment = { 'repostsCount': 1 }
 
  if (req.body.interaction == "like")
    increment = { 'likesCount': 1 }

  if (req.body.interaction == "enregistrement")
    increment = { 'savesCount': 1 }
 // Save interaction in the database
  collection_interactionsociales
    .insertOne(interaction)
    .then(data => {
      if (data)
        collection_publications.updateOne({ "_id": new ObjectId(req.body.postId) },
          { $inc: increment }).then(
            (data1) => {
              if (data1)
                res.send(data1)
            }
          )
    })

};


//Remove like / dislike
exports.interactionRemove = async (req, res) => {
  // Validate request
  if (!req.body.postId && !req.body.userId && !req.body.interactionId) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  if (req.body.interaction == "repost")
    increment = { 'repostsCount': -1 }
 
  if (req.body.interaction == "like")
    increment = { 'likesCount': -1 }

  if (req.body.interaction == "enregistrement")
    increment = { 'savesCount': -1 }


  // interaction = 'repostsCount'
  res.set('Access-Control-Allow-Origin', '*');

  // Save interaction in the database
  collection_interactionsociales
    .deleteOne({ "_id": new ObjectId(req.body.interactionId) })
    .then(data => {
      if (data)
        collection_publications.updateOne({ "_id": new ObjectId(req.body.postId) },
          { $inc: increment}).then(
            (data1) => {
              if (data1)
                res.send(data1)
            }
          )
    })
};




//Voir tous les likes d’un post	
exports.getAllLikesByPostId = async (req, res) => {
  const postId = req.query.postId;
  res.set('Access-Control-Allow-Origin', '*');
  res.send(await collection_interactionsociales.find({ postId, type: 'like' }))
};



//Voir tous les interactions faits par un user	
exports.getAllInteractionsByUserId = async (req, res) => {
  const userId = req.query.userId;
  const interactions = req.query.interactions;
  res.set('Access-Control-Allow-Origin', '*');
  res.send(await collection_interactionsociales.find({ userId, type: interactions }).toArray())
};



//Voir le nombre de likes d’un post	Interaction.countDocuments({ postId, type: 'like' })
exports.getLikesCountByPostId = async (req, res) => {
  const postId = req.query.postId;
  res.set('Access-Control-Allow-Origin', '*');
  res.send(await collection_interactionsociales.countDocuments({ postId, type: 'like' }))
};



exports.interactionsExist = async (req, res) => {
  const postId = req.query.postId;
  const userId = req.query.userId;
  res.set('Access-Control-Allow-Origin', '*');
  res.send(await collection_interactionsociales.findOne({ postId, userId }))
};


