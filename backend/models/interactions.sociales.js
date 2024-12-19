var mongoose = require('mongoose');

//MODEL INTERACTION SOCIALE

const InteractionSociale = new mongoose.Schema({

    postId: { type: String },
    comments: { type: Number },
    likes: { type: Number }, 
    points: { type: Number },
    likedBy_: [ String ],
    pointedBy_: [ String ],

   
}, { versionKey: false });

mongoose.model('InteractionSociale', InteractionSociale);

module.exports = InteractionSociale;

