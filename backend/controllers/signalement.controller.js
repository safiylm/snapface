const db = require('../config/db.config.js');
const collection_signalement = db.collection('signalement');
const collection_publications = db.collection('publications');
const collection_user = db.collection('users');
const ObjectId = require('mongodb').ObjectId;

//signaler une publication 
exports.signalerUnePublication = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    // Validate request
     if (!req.body.auteur && !req.body.raison ) {
         res.status(400).send({ message: "Content can not be empty!" });
         return;
     }

console.log(req.body )
    // Save Signalement in the database
    collection_signalement
        .insertOne({
            auteur: req.body.auteur,
            date: Date,
            raison: req.body.raison,
            postId: req.body.postId, //Signale un post 
            userId: null, //Signale un user 
        }
        )
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while signaler a post."
            });
        });
};

//signaler un user 
exports.signalerUnUser = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

     // Validate request
     if (!req.body.auteur && !req.body.raison ) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }


    // Save Signalement in the database
    collection_signalement
        .insertOne({
            auteur: req.body.auteur,
            date: Date,
            raison: req.body.raison,
            postId: null, //Signale un post 
            userId: req.body.userId,  //Signale un user 

        }
        )
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while signaler a User."
            });
        });
};

exports.getAllUsersSignale = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let tab = await collection_signalement.find({ "postId": null }).toArray()
    let tab_users = []
    for (let x of tab) {
        let a = {
            "signalement": x,
            "user": await collection_user.findOne({ "_id": new ObjectId(x.userId) })
        }
        tab_users.push(a)
    }
    res.json(tab_users)
}

exports.getAllPostsSignale = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let tab = await collection_signalement.find({ "userId": null }).toArray()
    let tab_posts = []
    for (let x of tab) {
        let a = {
            "signalement": x,
            "post": await collection_publications.findOne({ "_id": new ObjectId(x.postId) })
        }
        tab_posts.push(a)
    }
    res.json(tab_posts)
}

exports.getAllPostsSignaleByAuteur = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    let tab = await collection_signalement.find({ "userId": null, "auteur": req.query.auteur  }).toArray()
    let tab_posts = []
    for (let x of tab) {
        let a = {
            "signalement": x,
            "post": await collection_publications.findOne({ "_id": new ObjectId(x.postId) })
        }
        tab_posts.push(a)
    }
    res.json(tab_posts)
}

exports.getAllUsersSignaleByAuteur = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let tab = await collection_signalement.find({ "postId": null, "auteur": req.query.auteur }).toArray()
    let tab_users = []
    for (let x of tab) {
        let a = {
            "signalement": x,
            "user": await collection_user.findOne({ "_id": new ObjectId(x.userId) })
        }
        tab_users.push(a)
    }
    res.json(tab_users)
}