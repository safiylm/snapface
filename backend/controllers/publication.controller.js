const Publication = require("../models/publications");
const db = require('../config/db.config.js');
const collection_publications = db.collection('publications');
const User = require("../models/user");

const { DateTime } = require("mssql");
const ObjectId = require('mongodb').ObjectId;

exports.create = (req, res) => {
    // Validate request
    //   if (!req.body.firstName) {
    //     res.status(400).send({ message: "Content can not be empty!" });
    //     return;
    //   }

    // Create a Tutorial
    const user = {
        // firstName: req.body.firstName,
        title: " My first publication ",
        date: DateTime.toString(),
        body: " My body ",
        createdBy:"Lillyy",
        images: ["",],
        videos: [{ url: "", title: "", }],
        audios: [{ url: "", title: "", }],
    };

    // Save Tutorial in the database
    collection_publications
        .insertOne(user)
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

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {

    const findResult = await collection_publications.find({}).toArray();
    res.send(findResult);

}

exports.findOneById = async (req, res) => {
    const id = req.query.id;
    console.log(id)
    res.send(await collection_publications.findOne({ "_id": new ObjectId(id) }))
};


