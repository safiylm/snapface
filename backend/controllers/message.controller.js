const { console } = require('inspector');
const db = require('../config/db.config.js');
const collection_messages = db.collection('messages');
const collection_conversations = db.collection('conversations');
const ObjectId = require('mongodb').ObjectId;
const collection_publications = db.collection('publications');


//create Message 
exports.createMessage = async (req, res) => {

  const sender = req.body.sender;
  const conversationId = req.body.conversationId;
  const text = req.body.text
  const postId = req.body.postId

  res.set('Access-Control-Allow-Origin', '*');
  collection_messages
    .insertOne({
      sender, conversationId, text, postId,
      "time_": new Date(Date.now()), "seen": false
    })
    .then(data => {
      if (data) {
        if (postId != "") {
          collection_publications.
            updateOne({ "_id": new ObjectId(postId) },
              { $inc: { "sharesCount": 1 } })
            .then(x => {
              if (x)
              res.send(data);
            })
        }else
        res.send(data)
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error while creating the Message."
      });
    });
};


//create Conversation 
exports.createConversation = async (req, res) => {
  const receiver = req.body.receiver;
  const sender = req.body.sender;

  collection_conversations
    .insertOne({ "speaker": [sender, receiver] })
    .then((data) => {
      res.set('Access-Control-Allow-Origin', '*');
      console.log(data.insertedId)

      if (data)
        res.send(data);
      /* collection_messages
         .insertOne({ sender, conversationId: data.insertedId, text: "text" })
         .then(data1 => {
           res.set('Access-Control-Allow-Origin', '*');
           res.send(data1);
         })
         .catch(err => {
           res.status(500).send({
             message:
               err.message || "Error while creating the message."
           });
         });*/

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error while creating the conversationn."
      });
    });
};


//Get Messages
exports.getMessages = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const conversationId = req.query.conversationId;

  try {
    const messages = await collection_messages.find({
      "conversationId": conversationId

    }).sort({ 'time_': 1 }).toArray();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Get Last Message
exports.getLastMessage = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const conversationId = req.query.conversationId;

  try {
    const messages = await collection_messages.find({
      "conversationId": conversationId
    }).sort({ 'time_': -1 }).toArray()
    res.json(messages[0]);//.sort({'timestamp': -1}).limit(1)

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.editMessage = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const updateResult = await collection_messages.updateOne({ "_id": new ObjectId(req.body.id) },
    {
      $set: {
        "text": req.body.text,
        "seen": false
      }
    });
  res.send(updateResult);
}


exports.deleteMessage = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  collection_messages.deleteOne({ "_id": new ObjectId(req.body.id) })
    .then(data => {
      res.send(data)
    })
}

exports.deleteConversation = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  collection_messages.deleteMany({ "_id": new ObjectId(req.body.conversationId) })
    .then(data => {
      res.send(data)
    })
}


exports.getConversationsByUserId = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const userId = req.query.userId;

  try {
    const conversations = await collection_conversations.find({
      "speaker": { $in: [userId] }
    }).toArray()
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getConversationById = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const id = req.query.id;

  try {
    const conversations = await collection_conversations.findOne({
      "_id": new ObjectId(id)
    })
    res.send(conversations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markAsSeen = async (req, res) => {
  const conversationId = req.body.conversationId
  const updateResult = await collection_messages.updateMany({ "conversationId": conversationId },
    { $set: { "seen": true } });

  res.set('Access-Control-Allow-Origin', '*');
  res.send(updateResult);

};

exports.getNewMessagesByConversationId = async (req, res) => {
  const conversationId = req.query.id

  const updateResult = await collection_messages.find(
    { "conversationId": conversationId, "seen": false }
  ).toArray();

  res.set('Access-Control-Allow-Origin', '*');
  res.send(updateResult);

};
