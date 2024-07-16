var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var app = express();
const cors = require("cors");
// app.use(bodyParser());
// app.use(bodyParser.json({ limit: '5mb' }));
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
  extended: true 
}));

const router_user = require("./routes/user.route")
const router_publication = require("./routes/publication.route")
const router_statistique_user = require("./routes/statistique.user.route")
const router_interacation_sociale = require("./routes/interaction.sociale.route")
const router_commentaires = require("./routes/commentaire.route")
const router_abonnees = require("./routes/abonnee.route")

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var corsOptions = {
  origin: "*"
 // origin: "https://localhost:4200/"
};

app.use(cors(corsOptions));

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