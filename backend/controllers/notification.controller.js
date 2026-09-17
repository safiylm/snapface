const db = require('../config/db.config.js');
const collection_notifs = db.collection('followrequest');
const ObjectId = require('mongodb').ObjectId;
const axios = require('axios');

const isnull = (variable) => {
    if (variable == '' || variable == null || variable == undefined)
        return true;
}

//create new notif 
exports.create = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (isnull(req.body.userId) || isnull(req.body.message)) {
        res.status(400).send(
            { error: 'param is null.' });
        return
    }

    collection_notifs
        .insertOne({
            userId: req.body.userId,
            message: req.body.message,
        })
        .then(data => {
            if (data)
                res.status(201).send(data)
        })
        .catch(err => {
            res.status(500).send(err.message);
        });

};


exports.getNotificationByUserId = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (isnull(req.query.userId)) {
        res.status(400).send(
            { error: 'param is null.' });
        return
    }


    collection_notifs
        .find({
            userId: req.body.userId,
        })
        .then(data => {
            if (data)
                res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send(err.message);
        });

}
