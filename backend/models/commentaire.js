var mongoose = require('mongoose');

//MODEL COMMENTAIRE  

const Commentaire = new mongoose.Schema({

    text: { type: String },
    date: { type: Date },
    userId: { type: String },
    postId: { type: String },
    createdAt: Date,
    updatedAt: Date
}, { versionKey: false });

Commentaire.index({ title: 1, userId: 1, postId: 1 }, { unique: true });

mongoose.model('Commentaire', Commentaire);

module.exports = Commentaire;

//Les commentaires sur une publication