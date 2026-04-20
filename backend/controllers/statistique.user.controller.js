const { exit } = require('process');
const db = require('../config/db.config.js');
const collection_statistiqueusers = db.collection('statistiqueusers');


const isnull = (variable) => {
  if (variable == '' || variable == null || variable == undefined || !variable)
    return true;
}


//get user statistique by id
exports.findByUserId = async (req, res) => {
    const id = req.query.id;   
    res.set('Access-Control-Allow-Origin', '*');
    
    if(isnull(id )){
        res.status(400).send({ error: 
       'user id is null.'});
      return 
    }
    const resultat = await collection_statistiqueusers.findOne({ "userId": id })
    if (resultat == null)
        res.status(404).send({"error": "User not founded."})
    else
        res.status(200).json(resultat)
};

