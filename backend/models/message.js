const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: String,
  conversationId: String,
  text: String,
  postId: String,
  createdAt: { type: Date, default: Date.now },
  seen: { type: Boolean, default: false },
  isEdited: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  updatedAt: Date
});

module.exports = mongoose.model('Message', MessageSchema);
