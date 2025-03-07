const db = require('../config/db.config.js');
const collection_messages = db.collection('messages');

//create abonnee 
exports.create = async (req, res) => {
// res.set('Access-Control-Allow-Origin', '*');
  //const { sender, receiver, text } = req.body;
const sender = req.body.sender; 
const receiver = req.body.receiver;
const text =req.body.text

collection_messages
  .insertOne({sender, receiver, text })
  .then(data => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User."
    });
  });
};


//remove abonnee 
exports.find = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const sender = req.query.sender; 
  const receiver =  req.query.receiver; 
  
  try {
    const messages = await collection_messages.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender }
      ]
    }).sort('timestamp').toArray();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
