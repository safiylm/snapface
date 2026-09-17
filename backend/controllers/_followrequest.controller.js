const db = require('../config/db.config.js');
const collection_followrequests = db.collection('Notifications');
const ObjectId = require('mongodb').ObjectId;
const axios = require('axios');

const isnull = (variable) => {
    if (variable == '' || variable == null || variable == undefined)
        return true;
}

//create new follow request 
exports.create = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (isnull(req.body.from) || isnull(req.body.to)) {
        res.status(400).send(
            { error: 'param is null.' });
        return
    }

    collection_followrequests
        .insertOne({
            from: req.body.from,
            to: req.body.to,
            status: "pending",
        })
        .then(data => {
            if (data)
                res.status(201).send(data)
        })
        .catch(err => {
            res.status(500).send(err.message);
        });

};


// accept a follow request 
exports.accept = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (isnull(req.body.from) || isnull(req.body.to)) {
        res.status(400).send(
            { error: 'param is null.' });
        return
    }

    collection_followrequests
        .deleteOne({
            from: req.body.from,
            to: req.body.to,
         })
        .then(async (data) => {
            if (data)

                try {
                    const response = await axios.post('http://localhost:4100/api/abonnees/create', {
                        userId: req.body.from,
                        follows: req.body.to,
                    })
                    const savedMessage = response.data;
                    if (savedMessage)
                        res.status(200).send(savedMessage)
                    else
                        res.status(500).send("erreur")

                } catch (error) {
                    res.status(500).send("erreur")
                }
        })
        .catch(err => {
            res.status(500).send(err.message );
        });

};



//reject a follow request 
exports.reject = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (isnull(req.body.from) || isnull(req.body.to)) {
        res.status(400).send(
            { error: 'param is null.' });
        return
    }

    collection_followrequests
        .deleteOne({
            from: req.body.from,
            to: req.body.to,
        })
        .then(data => {
            if (data)
                res.status(200).send(data)
        })
        .catch(err => { res.status(500).send(err.message);
        });

};


//get list of follow request by userId
exports.getListOfFollowRequestByUserId = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (isnull(req.query.userId) ) {
        res.status(400).send(
            { error: 'param is null.' });
        return
    }

    let result = await collection_followrequests
        .find({
            "to": req.query.userId,
            "status": "pending"
        }).toArray()

    res.send(result)
};

exports.dejaEnAttente = async (req, res) => {

    
    if (isnull(req.query.to) || isnull(req.query.from) ) {
        res.status(400).send(
            { error: 'param is null.' });
        return
    }


    res.set('Access-Control-Allow-Origin', '*');
    let result = await collection_followrequests
        .find({
            "to": req.query.to,
            "from": req.query.from,
            "status": "pending"
        }).toArray()

    res.send(result)
}