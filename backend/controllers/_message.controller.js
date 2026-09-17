const db = require('../config/db.config.js');
const collection_messages = db.collection('messages');
const collection_conversations = db.collection('conversations');
const ObjectId = require('mongodb').ObjectId;
const collection_publications = db.collection('publications');

const isnull = (variable) => {
  if (variable == '' || variable == null || variable == undefined)
    return true;
}


/*create Message
insertion message  
if photo is not null
post sharesCount incremente
and conversation nbOfNewMessages incremente & edit last message 

else 
conversation nbOfNewMessages incremente & edit last message 
*/
exports.createMessage = async (req, res) => {
 
  const sender = req.body.sender;
  const conversationId = req.body.conversationId;
  const text = req.body.text
  const postId = req.body.postId

  if (isnull(sender) || isnull(conversationId) || (isnull(text) && isnull(postId))) {
    res.status(400).send(
      { error: 'param is null.' });
    return
  }


  res.set('Access-Control-Allow-Origin', '*');
  collection_messages
    .insertOne({
      sender, conversationId, text, postId,
      "time_": new Date(Date.now()), "seen": false
    })
    .then(data => {
      if (data) {
        if (postId.trim() != "") {
          collection_publications.
            updateOne({ "_id": new ObjectId(postId) },
              { $inc: { "sharesCount": 1 } })
            .then(x => {
              if (x) {
                collection_conversations.updateOne({ "_id": new ObjectId(conversationId) },
                  {
                    $inc: { "nbOfNewMessages": 1 },
                    $set: {
                      lastMessage: postId,
                      senderOfLastMessage: sender
                    }
                  }
                ).then(y => {
                  if (y)
                    res.status(201).send(data);
                })
              }
            })
        } else
          collection_conversations.updateOne({ "_id": new ObjectId(conversationId) },
            {
              $inc: { "nbOfNewMessages": 1 },
              $set: {
                lastMessage: text,
                senderOfLastMessage: sender
              }
            }
          ).then(y => {
            if (y)
              res.status(201).send(data);
          })
      }
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
};


/*create Conversation with the first message 
insertion conversation 
insertion message
*/
exports.createConversationWithFirstMessage = async (req, res) => {
  const receiver = req.body.receiver;
  const sender = req.body.sender;
  const text = req.body.text;
  res.set('Access-Control-Allow-Origin', '*');

  if (isnull(sender) || isnull(receiver) || isnull(text)) {
    res.status(400).send(
      { error: 'param is null.' });
    return
  }

  collection_conversations
    .insertOne({ "speaker": [sender, receiver] })
    .then((data) => {
      if (data)
        collection_messages
          .insertOne({
            "sender": sender, "conversationId": data.insertedId.toString(), "text": text,
            postId: "", "time_": new Date(Date.now()), "seen": false
          })
          .then(data1 => {
            if (data1)
              res.status(201).json({ "message": data1, "conversation": data });
          })
          .catch(err => {
            res.status(500).send(err.message);
          });

    })
    .catch(err => {
      res.status(500).send(err.message);
    });
};

//GET conversation by id 
exports.getConversationById = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const id = req.query.id;

  if (isnull(id)) {
    res.status(400).send(
      { error: 'param is null.' });
    return
  }

  const conversations = await collection_conversations.findOne({
    "_id": new ObjectId(id)
  })
  if (conversations)
    res.status(200).send(conversations);
  else
    res.status(500).send({ "error": "Resultat de la requete est null" })

};

//Get All Messages By ConversationId
exports.getAllMessagesByConversationId = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const conversationId = req.query.conversationId;

  if (isnull(conversationId)) {
    res.status(400).send(
      { error: 'param is null.' });
    return
  }

  try {
    const messages = await collection_messages.find({
      "$or": [{ conversationId: conversationId }, { conversationId: new ObjectId(conversationId) }]
    }).toArray();
    if (messages)
      res.status(200).json(messages);
    else
      res.status(500).send({ "error": "Une erreur est survenue" })

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



/*
edit message 
*/
exports.editMessage = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const conversationId = req.body.conversationId
  const id = req.body.id
  const text = req.body.text

  if (isnull(conversationId) || isnull(id) || isnull(text)) {
    res.status(400).send(
      { error: 'param is null.' });
    return
  }

  const updateResult = await collection_messages.updateOne({ "_id": new ObjectId(id) },
    {
      $set: {
        "text": req.body.text,
        "seen": false,
        "isEdited": true
      }
    });
  if (updateResult)
    res.status(200).send(updateResult);
  else {
    res.status(500).error("resultzt null");
  }

}

/*
delete  message 
if seen false decremente nbOfNewMessages of conversation
*/
exports.deleteMessage = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  if (isnull(req.body.id)) {
    res.status(400).send(
      { error: 'param is null.' });
    return
  }

  collection_messages.deleteOne({ "_id": new ObjectId(req.body.id), "seen": true })
    .then(data => {
      if (data) {
        res.send(data)
      }
    })

  //if seen false  collection_conversations.updateOne({ "_id": new ObjectId(conversationId) }, { $inc: { nbOfNewMessages: -1 } })


}

/*
delete conversation 
& all messages */

exports.deleteConversation = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const conversationId = req.body.conversationId

  if (isnull(conversationId)) {
    res.status(400).send(
      { error: 'param is null.' });
    return
  }

  collection_conversations.deleteOne({ "_id": new ObjectId(conversationId) })
    .then(data => {
      if (data)
        collection_messages.deleteMany({ "conversationId": conversationId })
          .then(data1 => {
            if (data1)
              res.status(200).send(data1)
          })
    })
}

// get All Conversations By UserId
exports.getAllConversationsByUserId = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const userId = req.query.userId;
  if (isnull(userId)) {
    res.status(400).send(
      { error: 'param is null.' });
    return
  }

  try {
    const conversations = await collection_conversations.find({
      "speaker": { $in: [userId] }
    }).toArray()

    if (conversations)
      res.status(200).send(conversations);
    else
      res.status(500).send({ "error": "Resultat de la requete est null" })

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



/* markAsSeen
update seen = true 
reset nbOfNewMessages of conversation
*/
exports.markAsSeen = async (req, res) => {
  const conversationId = req.body.conversationId
  const userId = req.body.userId

  if (isnull(conversationId) || isnull(userId)) {
    res.status(400).send(
      { error: 'param is null.' });
    return
  }
  res.set('Access-Control-Allow-Origin', '*');

  const updateResult = await collection_messages.updateMany({ "conversationId": conversationId, sender: { $ne: userId } },
    { $set: { "seen": true } });

  if (updateResult) {
    collection_conversations.updateOne({ "_id": new ObjectId(conversationId) },
      {
        $set: {
          "nbOfNewMessages": 0
        },
      }
    ).then(y => {
      if (y)
        res.status(201).send(updateResult);
    })
  }
  else
    res.status(500).send({ "error": "Resultat de la requete est null" })

};




// --------------------------------------------------------------------------------------------------






exports.getNewMessagesByConversationId = async (req, res) => {
  const conversationId = req.query.id
  const userId = req.query.userId
  res.set('Access-Control-Allow-Origin', '*');

  if (isnull(conversationId) || isnull(userId)) {
    res.status(400).send(
      { error: 'param is null.' });
    return
  }

  const updateResult = await collection_messages.find(
    { "conversationId": conversationId, "seen": false, sender: { $ne: userId } }
  ).toArray();

  if (updateResult)
    res.status(200).send(updateResult);
  else
    res.status(500).send({ "error": "Resultat de la requete est null" })
};




exports.deleteAllConversation = (req, res) => {

  res.set('Access-Control-Allow-Origin', '*');
  collection_conversations.deleteMany({})
    .then(data => {
      res.send(data)
    })
}

exports.deleteAllMessages = (req, res) => {

  if (isnull(req.body.id)) {
    res.status(400).send(
      { error: 'param is null.' });
    return
  }

  res.set('Access-Control-Allow-Origin', '*');
  collection_messages.deleteMany({})
    .then(data => {
      res.send(data)
    })
}


//Get Messages
exports.getAllConversations = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  try {
    const messages = await collection_conversations.find({

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

  if (isnull(conversationId)) {
    res.status(400).send(
      { error: 'param is null.' });
    return
  }

  try {
    const messages = await collection_messages.find({
      "$or": [{ conversationId: conversationId }, { conversationId: new ObjectId(conversationId) }]
    }).sort({ 'time_': -1 }).toArray()
    res.json(messages[0]);//.sort({'timestamp': -1}).limit(1)

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
