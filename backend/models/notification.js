const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  userId: String,
  message: String ,
  createdAt: { type: Date, default: Date.now },
  seen: { type: Boolean, default: false },
});

module.exports = mongoose.model('Notifications', NotificationSchema);
