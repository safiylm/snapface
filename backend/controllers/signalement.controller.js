const db = require('../config/db.config.js');
const collection_signalement = db.collection('signalement');
const collection_publications = db.collection('publications');
const collection_user = db.collection('users');
const ObjectId = require('mongodb').ObjectId;

const isnull = (variable) => {
    if (variable == '' || variable == null || variable == undefined || !variable)
        return true;
}

//signaler une publication 
exports.signalerUnePublication = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (isnull(req.body.auteur) ||
        isnull(req.body.raison) ||
        isnull(req.body.postId)) {
        res.status(400).send({ error: 'param is null.' });
        return
    }

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
            if (data)
                res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
};

//signaler un user 
exports.signalerUnUser = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (isnull(req.body.auteur) ||
        isnull(req.body.raison) ||
        isnull(req.body.userId)) {
        res.status(400).send({ error: 'param is null.' });
        return
    }

    // Save Signalement in the database
    collection_signalement
        .insertOne({
            auteur: req.body.auteur,
            date: Date,
            raison: req.body.raison,
            postId: null, //Signale un post 
            userId: req.body.userId,  //Signale un user 
        })
        .then(data => {
            if (data)
                res.status(201).send(data);

        })
        .catch(err => {
            res.status(500).send({ error: err.message });
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
    res.status(200).json(tab_users)
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
    res.status(200).json(tab_posts)
}

exports.getAllPostsSignaleByAuteur = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    if (isnull(req.query.auteur)) {
        res.status(400).send({ error: 'param is null.' });
        return
    }
    let tab = await collection_signalement.find({ "userId": null, "auteur": req.query.auteur }).toArray()
    let tab_posts = []
    for (let x of tab) {
        let a = {
            "signalement": x,
            "post": await collection_publications.findOne({ "_id": new ObjectId(x.postId) })
        }
        tab_posts.push(a)
    }
    if (tab_posts == null || tab_posts == [])
        res.status(404).send("List of posts signaled not founded.")
    else
        res.status(200).json(tab_posts)
};


exports.getAllUsersSignaleByAuteur = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (isnull(req.query.auteur)) {
        res.status(400).send(
            'auteur is null.');
        return
    }

    let tab = await collection_signalement.find({ "postId": null, "auteur": req.query.auteur }).toArray()
    let tab_users = []
    for (let x of tab) {
        let a = {
            "signalement": x,
            "user": await collection_user.findOne({ "_id": new ObjectId(x.userId) })
        }
        tab_users.push(a)
    }
    if (tab_users == null || tab_users == [])
        res.status(404).send("List of users signaled not founded.")
    else
        res.status(200).json(tab_users)
}



//delete user 
exports.delete = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (isnull(req.body._id)) {
        res.status(400).send({ error: 'user id is null.' });
        return
    }

    collection_user.deleteOne({ "_id": new ObjectId(req.body._id) }).then((data) => {
        if (data)
            res.status(200).json({ "message": "Suppression réussie" });
    }).catch(err => {
        res.status(500).send({ error: err.message });
    });

}