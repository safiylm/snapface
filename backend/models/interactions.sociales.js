var mongoose = require('mongoose');

const InteractionSociale = new mongoose.Schema({

    postId: { type: String },
    comments: { type: Number },
    likes: { type: Number }, 
    points: { type: Number },
   
}, { versionKey: false });

mongoose.model('InteractionSociale', InteractionSociale);

module.exports = InteractionSociale;

