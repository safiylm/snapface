var mongoose = require('mongoose');

//MODEL ABONNEE 

const Abonee = new mongoose.Schema({

    usedId: { type: String },
    follows : {type: String }, // la personne suivie
}, { versionKey: false });

mongoose.model('Abonee', Abonee);

module.exports = Abonee;
