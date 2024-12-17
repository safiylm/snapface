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


exports.checkTotalFollowers = async (req, res) => {
    const id = req.body.id;
    const followers = req.body.followers;

    collection_statistiqueusers
        .updateOne({ userId: id },
            {
                $set: { "followers": followers }
            }, true
        )
        .then(data => {
            if (data) {
                res.set('Access-Control-Allow-Origin', '*');
                res.send('Update total of followers successful!')
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
}


exports.checkTotalPublications = async (req, res) => {
    const id = req.body.id;
    const publications = req.body.publications;

    if(id != null && publications != null)
    collection_statistiqueusers
        .updateOne({ userId: id },
            {
                $set: { "totalPosts": publications }
            }, true
        )
        .then(data => {
            if (data) {
                res.set('Access-Control-Allow-Origin', '*');
                res.send('Update total of posts successful!')
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
}


exports.checkTotalPoints = async (req, res) => {
    const id = req.body.id;
    const points = req.body.points;

    if(id != null && points != null)

    collection_statistiqueusers
        .updateOne({ userId: id },
            {
                $set: { "totalPoints": points }
            }, true
        )
        .then(data => {
            if (data) {
                res.set('Access-Control-Allow-Origin', '*');
                res.send('Update total of points successful!')
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
}