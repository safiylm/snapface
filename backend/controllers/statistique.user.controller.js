const { exit } = require('process');
const db = require('../config/db.config.js');
const collection_statistiqueusers = db.collection('statistiqueusers');


const isnull = (variable) => {
  if (variable == '' || variable == null || variable == undefined || !variable)
    return true;
}

//create new user statistique
exports.create = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if(isnull(req.body.id )){
        res.status(400).send(
       'user id is null.');
      return 
    }

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


//get user statistique by id
exports.findByUserId = async (req, res) => {
    const id = req.query.id;   
    res.set('Access-Control-Allow-Origin', '*');
    
    if(isnull(id )){
        res.status(400).send(
       'user id is null.');
      return 
    }
    const resultat = await collection_statistiqueusers.findOne({ "userId": id })
    if (resultat == null && id!=null)
        res.status(404).send("User not founded.")
    else
        res.status(200).json(resultat)
};

