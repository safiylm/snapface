const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: String,
  conversationId: String,
  text: String,
  postId: String,
  time_: { type: Date, default: Date.now },
  seen: { type: Boolean, default: false},
});

module.exports = mongoose.model('Message', MessageSchema);
