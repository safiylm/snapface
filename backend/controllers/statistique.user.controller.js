const db = require('../config/db.config.js');
const collection_statistiqueusers = db.collection('statistiqueusers');

//create new user statistique
exports.create = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Tutorial

    // Save Tutorial in the database
    collection_statistiqueusers
        .insertOne({
            userId: req.body.id,
            followers: 0,
            totalPosts: 0,
            totalPoints: 0,
        }
    )
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


//get user statistique by iy 
exports.findByUserId = async (req, res) => {
    const id = req.query.id;
    res.set('Access-Control-Allow-Origin', '*');
    res.send(await collection_statistiqueusers.findOne({ "userId": id }))
};
