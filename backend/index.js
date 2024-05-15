var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var app = express();
// app.use(bodyParser());
// app.use(bodyParser.json({ limit: '5mb' }));
// app.use(bodyParser.urlencoded({ extended: true }));

const router_user = require("./routes/user.route")
const router_publication = require("./routes/publication.route")
const router_statistique_user = require("./routes/statistique.user.route")
const router_interacation_sociale = require("./routes/interaction.sociale.route")
const router_commentaires = require("./routes/commentaire.route")
const router_abonnees = require("./routes/abonnee.route")

var whiteList = {
  "http://localhost:4200": true,
  "https://snapface.onrender.com": true
};
var allowCrossDomain = function(req, res, next) {    
      if(whiteList[req.headers.origin]){            
          res.header('Access-Control-Allow-Credentials', true);
          res.header('Access-Control-Allow-Origin', req.headers.origin);
          res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
          res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Origin, Accept');        
          next();
      } 
}
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Origin', 'https://snapface.onrender.com');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(allowCrossDomain);
app.use(router_user )
app.use(router_publication )
app.use(router_statistique_user )
app.use(router_interacation_sociale )
app.use(router_commentaires )
app.use(router_abonnees )



app.use(express.static(path.join(__dirname, '../dist/snapface')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/snapface/index.html'));
});


app.listen(4200, function () {
  console.log('Example app listening on port 4200!')
})