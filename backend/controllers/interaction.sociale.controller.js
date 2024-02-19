const db = require('../config/db.config.js');
const collection_interactionsociales = db.collection('interactionsociales');

exports.create = (req, res) => {
    // Validate request
    //   if (!req.body.firstName) {
    //     res.status(400).send({ message: "Content can not be empty!" });
    //     return;
    //   }

    // Create a Tutorial
    const is1 = {
      postId: "65ce41203fe7c8143274a693",
      comments: 55,
      likes: 145, 
      points: 999,
    };

    const is2 = {
      postId: "65cf2792020e30090d5b1311",
      comments: 45,
      likes: 8000, 
      points:777,
    };
  
    const is3 = {
      postId: "65cf2792020e30090d5b1312",
      comments: 400,
      likes:89641, 
      points: 754,
    };

    const is4 = {
      postId: "65cf2792020e30090d5b1313",
      comments: 445,
      likes: 4651, 
      points:
      8754,
    };


    // Save Tutorial in the database
    collection_interactionsociales
        .insertMany( [is1, is2, is3, is4 ] )
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



exports.findByPublicationId = async (req, res) => {
    const id = req.query.id;
    res.send(await collection_interactionsociales.findOne({ "postId": id }))
};


