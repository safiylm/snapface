var mongoose = require('mongoose');

//MODEL PUBLICATION

const Publication = new mongoose.Schema({

    body: { type: String },
    userId: { type: String }, //User
    assets: [String],
    audio: String,

    commentsCount: { type: Number },
    likesCount: { type: Number },
    repostsCount: { type: Number },
    savesCount: { type: Number },
    sharesCount: { type: Number },

    createdAt: { type: Date, default: Date.now },
    isEdited: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    updatedAt: Date
    
}, { versionKey: false });

mongoose.model('Publication', Publication);

module.exports = Publication;
