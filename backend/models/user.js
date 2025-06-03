var mongoose = require('mongoose');

//MODEL USER 

const User = new mongoose.Schema({

  firstName: { type: String },
  lastName: { type: String },
  photos_profil: { type: String },
  photos_background: { type: String },
  email: { type: String },
  password: { type: String },
  phoneNo: { type: String },
  isPrivate: { type: Boolean, default: false},
  isOnline: { type: Boolean},
    createdAt: { type: Date, default: Date.now },
    isEdited: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    updatedAt: Date
}, { versionKey: false });
User.index({ email : 1}, { unique: true });

mongoose.model('User', User);

module.exports = User;
