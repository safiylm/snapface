var mongoose = require('mongoose');

//MODEL INTERACTION SOCIALE

const InteractionSociale = new mongoose.Schema({

    postId: { type: String },
    userId: { type: String },
    type: 'like' | 'repost' | 'enregistrement',
    createdAt: { type: Date, default: Date.now },

}, { versionKey: false });

InteractionSociale.index({ postId: 1, userId: 1 , type: 1}, { unique: true });

mongoose.model('InteractionSociale', InteractionSociale);

module.exports = InteractionSociale;

