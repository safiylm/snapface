const db = require('../config/db.config.js');
const collection_interactionsociales = db.collection('interactionsociales');
const ObjectId = require('mongodb').ObjectId;
const collection_statistiqueusers = db.collection('statistiqueusers')

//create new interaction social for one post
exports.create = (req, res) => {

  // Validate request
  // if (!req.body.postId) {
  //   res.status(400).send({ message: "Content can not be empty!" });
  //   return;
  // }

  // Create a Tutorial
  const is1 = {
    postId: req.body.postId,
    comments: req.body.comments,
    likes: req.body.likes,
    points: req.body.points,
  };

  // Save Tutorial in the database
  collection_interactionsociales
    .insertOne(is1)
    .then(data => {
      res.set('Access-Control-Allow-Origin', '*');
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};


//Remove point
exports.pointsRemove = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  collection_interactionsociales.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: { "pointedBy_": [""] },
      $inc: { "points": -1 }
    }, true
  ).then(data => {
    collection_statistiqueusers.updateOne({ "userId": req.body.auteurId },
      { $inc: { "totalPoints": -1 } }, true)
      .then(data1 => { res.send(data1); })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while add like."
        })
      });

  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while remove point."
      })
    });

};


//add point
exports.pointsAdd = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  collection_interactionsociales.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: { "pointedBy_": [req.body.userId] },
      $inc: { "points": 1 }
    }, true
  ).then((data) => {
    collection_statistiqueusers.updateOne({ "userId": req.body.auteurId },
      { $inc: { "totalPoints": 1 } }, true)
      .then(data1 => { res.send(data1); })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while add like."
        })
      });

  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while add point."
      })
    });



};


//like/ add like 
exports.likesAdd = async (req, res) => {

  if (req.body.userId != null)

    await collection_interactionsociales.updateOne({ "_id": new ObjectId(req.body._id) },
      {
        $set: { "likedBy_": [req.body.userId] },
        $inc: { "likes": 1 }
      }, true
    ).then(data => {
      res.set('Access-Control-Allow-Origin', '*');
      res.send(data);
    })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while add like."
        })
      });

};


//Remove like / dislike
exports.likesRemove = async (req, res) => {

  const updateResult = await collection_interactionsociales.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: { "likedBy_": [""] },
      $inc: { "likes": -1 }
    }, true
  )
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while remove likes."
      })
    });
  res.set('Access-Control-Allow-Origin', '*');
  res.send(updateResult);

};


//Retrieve post by Id
exports.findByPublicationId = async (req, res) => {

  const id = req.query.id;
  res.set('Access-Control-Allow-Origin', '*');
  res.send(await collection_interactionsociales.findOne({ "postId": id }))
};


//Update total of comment in interaction social by post Id
exports.updateTotalComments = async (req, res) => {

  const id = req.body.id;
  const comments = req.body.comments;
  res.set('Access-Control-Allow-Origin', '*');

  if (comments != null || comments != undefined);

  collection_interactionsociales
    .updateOne({ postId: id },
      {
        $set: { "comments": Number(comments) }
      }, true
    )
    .then(data => {
      res.send('Update Total Comments successful!')
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

//Update total of likes in interaction social by post Id
exports.updateTotalLikes = async (req, res) => {

  const id = req.body.id;
  const likes = req.body.likes;
  res.set('Access-Control-Allow-Origin', '*');

  if (likes != null || likes != undefined);

  collection_interactionsociales
    .updateOne({ postId: id },
      {
        $set: { "likes": Number(likes) }
      }, true
    )
    .then(data => {
      res.send('Update Total likes successful!')
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

//Update total of points in interaction social by post Id
exports.updateTotalPoints = async (req, res) => {

  const id = req.body.id;
  const points = req.body.points;
  res.set('Access-Control-Allow-Origin', '*');

  if (points != null || points != undefined);

  collection_interactionsociales
    .updateOne({ postId: id },
      {
        $set: { "points": Number(points) }
      }, true
    )
    .then(data => {
      res.send('Update Total points successful!')
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};
