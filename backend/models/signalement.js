var mongoose = require('mongoose');

//MODEL PUBLICATION

const Signalement = new mongoose.Schema({

    auteur: { type: String },
    date: { type: Date },
    raison: { type: String },
    postId: { type: String }, //Signale un post 
    userId: String, //Signale un user 
    createdAt: { type: Date, default: Date.now },
 
}, { versionKey: false });
Signalement.index({ auteur : 1, raison: 1, postId: 1, userId:1}, { unique: true });

mongoose.model('Signalement', Signalement);

module.exports = Signalement;
