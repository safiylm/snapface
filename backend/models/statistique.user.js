var mongoose = require('mongoose');

const StatistiqueUser = new mongoose.Schema({

    userId: { type: String },
    followers: { type: Number },
    totalPosts: { type: Number },
    totalPoints: { type: Number },

}, { versionKey: false });

mongoose.model('StatistiqueUser', StatistiqueUser);

module.exports = StatistiqueUser;

// Statistiques de l’utilisateur, vous pouvez stocker le nombre d’abonnés :
// {
//     "id":"234d-sd23-rrf2-552d",
//     "user": "dse4-qwe2-ert4-aad2",
//     "followers":55230,
//     "totalPosts":452,
//     "totalPoints":11342
// }