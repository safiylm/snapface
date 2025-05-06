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

}, { versionKey: false });
mongoose.model('User', User);

module.exports = User;
