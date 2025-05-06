const db = require('../config/db.config.js');
const collection_followrequests = db.collection('followrequest');
const ObjectId = require('mongodb').ObjectId;
const axios = require('axios');


//create new follow request 
exports.create = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    
    collection_followrequests
        .insertOne({
            from: req.body.from,
            to: req.body.to,
            status: "pending",
        })
        .then(data => {
            if (data)
                res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the follow request."
            });
        });

};


// accept a follow request 
exports.accept = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    collection_followrequests
        .updateOne({
            from: req.body.from,
            to: req.body.to,
            status: "pending"
        }, { $set: { "status": "accepted" } })
        .then(async (data) => {
            if (data)

                try {
                    const response = await axios.post('http://localhost:4100/api/abonnees/create', {
                        userId: req.body.from,
                        follows: req.body.to,
                    })
                    const savedMessage = response.data;
                    res.send(savedMessage)

                }catch (error) {
                    console.error('Erreur lors de l acceptation du follow request', error);
                  }
            })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while accepting the follow request."
            });
        });

};



//reject a follow request 
exports.reject = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    collection_followrequests
        .updateOne({
            from: req.body.from,
            to: req.body.to,
             status: "pending"
        }, {
            $set: {
                "status": "rejected"
            }
        })
        .then(data => {
              if (data)
           
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while rejecting the follow request."
            });
        });

};


//get list of follow request by userId
exports.getListOfFollowRequestByUserId = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    let result = await collection_followrequests
        .find({
            "to": req.query.userId,
            "status": "pending"
        }).toArray()

    res.send(result)
};

exports.dejaEnAttente = async (req, res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    let result = await collection_followrequests
        .find({
            "to": req.query.to,
            "from" : req.query.from ,
            "status": "pending"
        }).toArray()

    res.send(result)
}