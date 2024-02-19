const db = require('../config/db.config.js');
const collection_statistiqueusers = db.collection('statistiqueusers');

exports.create = (req, res) => {
    // Validate request
    //   if (!req.body.firstName) {
    //     res.status(400).send({ message: "Content can not be empty!" });
    //     return;
    //   }

    // Create a Tutorial
    const us1 = {
        userId: "65cf2792020e30090d5b1313",
        followers: 7095,
        totalPosts: 145, 
        totalPoints: 139,
    };


    const us2 = {
        userId: "65cf2792020e30090d5b1313",
        followers: 365,
        totalPosts: 145, 
        totalPoints: 919,
    };
  
    const us3 = {
        userId: "65cf2792020e30090d5b1313",
        followers: 485,
        totalPosts: 145, 
        totalPoints: 125,
    };



    // Save Tutorial in the database
    collection_statistiqueusers
        .insertMany( [us1, us2, us3 ] )
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
    res.send(await collection_statistiqueusers.findOne({ "userId": id }))
};
