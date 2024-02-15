var mongoose = require('mongoose');
const User = require("./user");


const Publication = new mongoose.Schema({

    title: { type: String },
    date: { type: Date },
    body: { type: String },
    createdBy: { type: String }, //User
    images: [ String ],
    videos:[ {url : String , title : String } ],
    audios: [ {url : String , title : String } ],

}, { versionKey: false });

mongoose.model('Publication', Publication);

module.exports = Publication;


// {
//     "id":"ew12-res2-234e-544f",
//     "title":"post title",
//     "date":"2016-01-01",
//     "body":"this is an awesome post stored on NoSQL",
//     "createdBy":"User",
//     "images":["https://myfirstimage.png","https://mysecondimage.png"],
//     "videos":[
//         {"url":"https://myfirstvideo.mp4", "title":"The first video"},
//         {"url":"https://mysecondvideo.mp4", "title":"The second video"}
//     ],
//     "audios":[
//         {"url":"https://myfirstaudio.mp3", "title":"The first audio"},
//         {"url":"https://mysecondaudio.mp3", "title":"The second audio"}
//     ]
// }