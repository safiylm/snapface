var mongoose = require('mongoose');
const User = require("../models/user");


const Abonee = new mongoose.Schema({

    followersOf: { type: String },
    followers: [ String ],
   
}, { versionKey: false });

mongoose.model('Abonee', Abonee);

module.exports = Abonee;
