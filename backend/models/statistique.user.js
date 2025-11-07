var mongoose = require('mongoose');

//MODEL STATISTIQUE USER 

const StatistiqueUser = new mongoose.Schema({

    userId: { type: String },
    followers: { type: Number },
    totalPosts: { type: Number },

}, { versionKey: false });
StatistiqueUser.index({ userId : 1}, { unique: true });

mongoose.model('StatistiqueUser', StatistiqueUser);

module.exports = StatistiqueUser;
