var mongoose = require('mongoose');

//MODEL FOLLOWREQUEST 

const FollowRequest = new mongoose.Schema({

    to: { type: String },
    from: { type: String },
    status :{type: String, enum: ['pending', 'accepted', 'rejected'] , default: "pending" },
    createdAt : {type: Date, default: Date.now }, 

}, { versionKey: false });

mongoose.model('FollowRequest', FollowRequest);

module.exports = FollowRequest;
