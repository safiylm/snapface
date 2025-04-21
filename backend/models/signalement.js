var mongoose = require('mongoose');

//MODEL PUBLICATION

const Signalement = new mongoose.Schema({

    auteur: { type: String },
    date: { type: Date },
    raison: { type: String },
    postId: { type: String }, //Signale un post 
    userId: String, //Signale un user 

}, { versionKey: false });

mongoose.model('Signalement', Signalement);

module.exports = Signalement;
