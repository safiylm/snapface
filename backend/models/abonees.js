var mongoose = require('mongoose');

//MODEL ABONNEE 

const Abonee = new mongoose.Schema({

    usedId: { type: String },
    follows : {type: String }, // la personne suivie
   // followers: [String], //au lieu de String[] 
   // abonnements: [String] //au lieu de String[]
}, { versionKey: false });

mongoose.model('Abonee', Abonee);

module.exports = Abonee;
