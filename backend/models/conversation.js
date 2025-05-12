const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  speaker: [String], //list des userId qui se parlent

});

ConversationSchema.index({ speaker : 1 }, { unique: true });

module.exports = mongoose.model('Conversation', ConversationSchema);
