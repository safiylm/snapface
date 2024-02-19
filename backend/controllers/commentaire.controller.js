const db = require('../config/db.config.js');
const collection_commentaires = db.collection('commentaires');

exports.create = (req, res) => {

    const c1 = {
      title: 55,
      date: Date.now(),
      userId: "65cf2792020e30090d5b1313",
      postId: "65ce41203fe7c8143274a693",

    };

    const c2 = {
      title: 55,
      date: Date.now(),
      userId: "65cf2792020e30090d5b1313",
      postId: "65cf2792020e30090d5b1311",
    };
  
    const c3 = {
      title: 55,
      date: Date.now(),
      userId: "65cf2792020e30090d5b1313",
      postId: "65cf2792020e30090d5b1312",
    };

    const c4 = {
      title: 55,
      date: Date.now(),
      userId: "65cf2792020e30090d5b1313",
      postId: "65ce41203fe7c8143274a693",
    };


    // Save Tutorial in the database
    collection_commentaires
        .insertMany( [c1, c2, c3, c4 ] )
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
    const findResult = await collection_commentaires.find({ "postId": id }).toArray();
    res.send(findResult);
  };


