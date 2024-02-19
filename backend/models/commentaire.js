var mongoose = require('mongoose');

const Commentaire = new mongoose.Schema({

    title: { type: String },
    date: { type: Date },
    userId: { type: String }, 
    postId: { type: String },
   
}, { versionKey: false });

mongoose.model('Commentaire', Commentaire);

module.exports = Commentaire;

//Les commentaires sur une publication