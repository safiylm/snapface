var mongoose = require('mongoose');

//MODEL INTERACTION SOCIALE

const InteractionSociale = new mongoose.Schema({

    postId: { type: String },
    userId: { type: String },
    type: 'like' | 'point' | 'share' | 'comment',
    timestamp: { type: Date, default: Date.now },

}, { versionKey: false });

mongoose.model('InteractionSociale', InteractionSociale);

module.exports = InteractionSociale;

