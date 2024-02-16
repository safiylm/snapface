const db = require('../config/db.config.js');
const collection_publications = db.collection('publications');

const { DateTime } = require("mssql");
const ObjectId = require('mongodb').ObjectId;

exports.create = (req, res) => {
    // Validate request
    //   if (!req.body.firstName) {
    //     res.status(400).send({ message: "Content can not be empty!" });
    //     return;
    //   }

    // Create a Tutorial
    const p1 = {
        // firstName: req.body.firstName,
        title: " My first publication ",
        date: DateTime,
        body: " My body ",
        createdBy:"Lillyy",
        images: ["",],
        videos: [{ url: "", title: "", }],
        audios: [{ url: "", title: "", }],
    };

    const p2 = {
        title:'cafe',
        date: DateTime,
        body:'J\'adore le café',
        createdBy:"Lillyy",
     
        images: ['https://live.staticflickr.com/47/150654741_ae02588670_b.jpg',],
        videos: [{ url: "", title: "", }],
        audios: [{ url: "", title: "", }],
    };
  
    const p3 = {
        title: "Nature",
        date: DateTime,
        body: "J'adore la nature ",
        createdBy:"Lillyy",
        images:  ["https://img.freepik.com/photos-gratuite/champ-lavande-au-coucher-du-soleil-pres-valensole_268835-3910.jpg?size=626&ext=jpg&ga=GA1.2.337367146.1690124945&semt=sph",],
        videos: [{ url: "", title: "", }],
        audios: [{ url: "", title: "", }],
    };


    // Save Tutorial in the database
    collection_publications
        .insertMany( [p1, p2, p3 ] )
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

exports.findAllPublicationByUserId = async (req, res) => {

    const findResult = await collection_publications.find({"createdBy" : req.query.id }).toArray();
    res.send(findResult);

}

exports.findOneById = async (req, res) => {
    const id = req.query.id;
    res.send(await collection_publications.findOne({ "_id": new ObjectId(id) }))
};


