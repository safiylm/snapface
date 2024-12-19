var mongoose = require('mongoose');

//MODEL FLUX DE PERTINANCE  

const FluxPertinence = new mongoose.Schema({

    relevance: { type: Number },
    post: { type: String },

}, { versionKey: false });

mongoose.model('FluxPertinence', FluxPertinence);

module.exports = FluxPertinence;


// La création de flux consiste simplement à créer des documents qui peuvent contenir une liste des ID des publications avec un ordre de pertinence donné :

// [
//     {"relevance":9, "post":"ew12-res2-234e-544f"},
//     {"relevance":8, "post":"fer7-mnb6-fgh9-2344"},
//     {"relevance":7, "post":"w34r-qeg6-ref6-8565"}
// ]