var mongoose = require('mongoose');


const User = new mongoose.Schema({

  firstName: { type: String },
  lastName: { type: String },
  photos_profil: { type: String },
  photos_background: { type: String },
  email: { type: String },
  password: { type: String },
  phoneNo: { type: String },
}, { versionKey: false });
mongoose.model('User', User);

module.exports = User;
