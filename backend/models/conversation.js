const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  speaker: [String], //list des userId qui se parlent
  nbOfNewMessages: number,
  lastMessage : String,
  senderOfLastMessage: String,
  createdAt: Date,
});

const participantsKey = [sender, receiver]
  .sort()
  .join("_");
  ConversationSchema.index(
  { participantsKey: 1 },
  { unique: true }
);

module.exports = mongoose.model('Conversation', ConversationSchema);
