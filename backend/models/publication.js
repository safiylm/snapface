var mongoose = require('mongoose');

//MODEL PUBLICATION

const Publication = new mongoose.Schema({

    title: { type: String },
    date: { type: Date },
    body: { type: String },
    userId: { type: String }, //User
    assets: [String],
    audio: String,
    commentsCount: { type: Number },
    likesCount : { type: Number }, 
    pointsCount: { type: Number },
    savesCount: { type: Number },
    sharesCount: { type: Number },

}, { versionKey: false });

mongoose.model('Publication', Publication);

module.exports = Publication;
