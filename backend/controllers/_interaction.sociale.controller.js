const { ElementSchemaRegistry } = require('@angular/compiler');
const db = require('../config/db.config.js');
const collection_interactionsociales = db.collection('interactionsociales');
const ObjectId = require('mongodb').ObjectId;
const collection_publications = db.collection('publications')


const isnull = (variable) => {
  if (variable == '' || variable == null || variable == undefined)
    return true;
}

//Repost/ add repost 
exports.interactionAdd = async (req, res) => {

  if (isnull(req.body.postId) || isnull(req.body.userId) || isnull(req.body.interaction)) {
    res.status(400).send(
      { error: 'param is null.' });
    return
  }
  res.set('Access-Control-Allow-Origin', '*');
  // Create a interaction
  const interaction = {
    postId: req.body.postId,
    userId: req.body.userId,
    type: req.body.interaction,
  };
  increment = {}
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
          { $inc: increment }).then((data1) => {
            if (data1)
              res.status(200).json({ "interaction": data, "publication": data1 });

          }
          ).catch(err => {
            res.status(500).send({ error: err.message })
            console.log(err)
          });
    }).catch(err => {
      res.status(500).send({ error: err.message })
      console.log(err)
    });
};


//Remove like / dislike
exports.interactionRemove = async (req, res) => {

  if (isnull(req.body.postId) || isnull(req.body.userId) || isnull(req.body.interactionId)) {
    res.status(400).send(
      { error: 'param is null.' });
    return
  }

  if (req.body.interaction == "repost")
    increment = { 'repostsCount': -1 }

  if (req.body.interaction == "like")
    increment = { 'likesCount': -1 }

  if (req.body.interaction == "enregistrement")
    increment = { 'savesCount': -1 }

  res.set('Access-Control-Allow-Origin', '*');

  // remove interaction in the database
  collection_interactionsociales
    .deleteOne({ "_id": new ObjectId(req.body.interactionId) })
    .then(data => {
      if (data) {
        collection_publications.updateOne({ "_id": new ObjectId(req.body.postId) },
          { $inc: increment }).then((data1) => {
            if (data1)
              res.status(201).send(data1)
          }
          ).catch((err) => res.status(500).send("erreur: " + err))
      }
    })

};




//Voir tous les interactions d’un post by type 
exports.getInteractionsByPostIdAndTypeI = async (req, res) => {
  const postId = req.query.postId;
  const interaction = req.query.interaction;

  if (isnull(postId) || isnull(interaction)) {
    res.status(400).send(
      { error: 'param is null.' });
    return
  }

  res.set('Access-Control-Allow-Origin', '*');
  const result = await collection_interactionsociales.find({ postId, type: interaction })
  if (result)
    res.status(200).send(result)
  else
    res.status(500).send('erreur')

};



//Voir tous les interactions faits par un user	
exports.getAllInteractionsByUserId = async (req, res) => {
  const userId = req.query.userId;
  const interactions = req.query.interactions;

  if (isnull(userId) || isnull(interactions)) {
    res.status(400).send(
      { error: 'param is null.' });
    return
  }

  res.set('Access-Control-Allow-Origin', '*');
  const result = await collection_interactionsociales.find({ userId, type: interactions }).toArray()
  if (result)
    res.status(200).send(result)
  else
    res.status(500).send('erreur')
};



//Voir le nombre de likes d’un post	Interaction.countDocuments({ postId, type: 'like' })
exports.getInteractionsCountByPostId = async (req, res) => {
  const postId = req.query.postId;
  const interaction = req.query.interaction;

  if (isnull(postId) || isnull(interaction)) {
    res.status(400).send(
      { error: 'param is null.' });
    return
  }
  res.set('Access-Control-Allow-Origin', '*');
  const result = await collection_interactionsociales.countDocuments(
    { postId: postId, type: interaction })
  if (result)
    res.status(200).json(result)
  else
    res.status(500).send('erreur')
};



exports.interactionsExist = async (req, res) => {
  const postId = req.query.postId;
  const userId = req.query.userId;

  if (isnull(postId) || isnull(userId)) {
    res.status(400).send(
      { error: 'param is null.' });
    return
  }

  res.set('Access-Control-Allow-Origin', '*');
  const result = await collection_interactionsociales.findOne({ postId, userId })
  if (result)
    res.status(200).send(result)
  else
    res.status(500).send('erreur')
};


