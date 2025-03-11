const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  speaker: [String], //list des userId qui se parlent

});

module.exports = mongoose.model('Conversation', ConversationSchema);
