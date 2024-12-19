var mongoose = require('mongoose');

//MODEL STATISTIQUE USER 

const StatistiqueUser = new mongoose.Schema({

    userId: { type: String },
    followers: { type: Number },
    totalPosts: { type: Number },
    totalPoints: { type: Number },

}, { versionKey: false });

mongoose.model('StatistiqueUser', StatistiqueUser);

module.exports = StatistiqueUser;
