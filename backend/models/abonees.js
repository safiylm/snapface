var mongoose = require('mongoose');

//MODEL ABONNEE 

const Abonee = new mongoose.Schema({

    usedId: { type: String },
    follows : {type: String }, // la personne suivie
     createdAt: Date,

}, { versionKey: false });

Abonee.index({ usedId: 1, follows: 1 }, { unique: true });

mongoose.model('Abonee', Abonee);

module.exports = Abonee;
