var express = require('express');
var path = require("path");
var app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

//const websocket = require("./chat")
var corsOptions = {
  origin:// "*"
    //  "https://snapfaceangular.web.app",
    "http://localhost:4200",
  credentials: true, // ⬅️ Permet l’envoi des cookies
};
app.use(cors(corsOptions));

var bodyParser = require('body-parser');
const cookie = require('cookie');
const router_user = require("./routes/user.route")
const router_publication = require("./routes/publication.route")
const router_statistique_user = require("./routes/statistique.user.route")
const router_interacation_sociale = require("./routes/interaction.sociale.route")
const router_commentaires = require("./routes/commentaire.route")
const router_abonnees = require("./routes/abonnee.route")
const router_messages = require("./routes/message.route")
const router_signalement = require("./routes/signalement.route")
const router_followrequest = require("./routes/followrequest.route")

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Credentials", "true"); // ⬅️ obligatoire pour les cookies
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(router_followrequest)
app.use(router_signalement)
app.use(router_user)
app.use(router_publication)
app.use(router_statistique_user)
app.use(router_interacation_sociale)
app.use(router_commentaires)
app.use(router_abonnees)
app.use(router_messages)

app.use(express.static(path.join(__dirname, '../dist/snapface')));

//const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const axios = require('axios');

//const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin:
      // "*", 
      // "https://snapfaceangular.web.app",
      "http://localhost:4200",
    credentials: true,
    methods: ["GET", "POST"]
  }
});

io.on("connection", async (socket) => {


  const rawCookies = socket.handshake.headers.cookie;
  let token;

  if (rawCookies) {
    const parsedCookies = cookie.parse(rawCookies);
    token = parsedCookies.token;

    if (token) {
      const response = await axios.post('http://localhost:4100/api/user/edit/online', {
        //     const response = await axios.post('https://snapface.onrender.com/api/user/edit/online', {
        _id: token,
      })

      if (response.data['acknowledged'] == true)
        // ✅ Notifie tous les clients que cet utilisateur est en ligne
        io.emit('user-online', token);
    }

    console.log('Token depuis Socket.IO :', token);
  } else {
    console.log('Aucun cookie reçu');
  }




  socket.on("publicMessage", (msg) => {
    io.emit("publicMessage", msg); // Diffuse le message à tous
  });

  /*
  Les rooms permettent d'envoyer des messages uniquement à certains utilisateurs au lieu de diffuser à tous. Cela est utile pour : ✅ Un chat privé (envoyer un message à un utilisateur spécifique).
✅ Des notifications personnalisées (alerter un utilisateur précis).
✅ Un support en ligne (un agent parle à un client spécifique).
  */

  socket.on('privateMessage', async (data) => {

    try {
      const response = await axios.post('http://localhost:4100/message/create', {
        //     const response = await axios.post('https://snapface.onrender.com/message/create', {
        sender: data['sender'],
        conversationId: data['conversationId'],
        text: data['text'],
        postId: data['postId']
      })
      console.log(response.data)

      if (response.data['acknowledged'] == true) {
        // Envoie le message uniquement aux utilisateurs concernés
        io.to(data['receiver']).emit('newMessage', data);
      }

    } catch (error) {
      console.error('Erreur lors de l’enregistrement du message', error);
    }

  });

  socket.on('joinRoom', (userId) => {
    socket.join(userId);
  });

  socket.on('disconnect', async (reason) => {
    if (reason === 'io server disconnect') {
      // serveur a coupé : essayer de se reconnecter
      this.socket.connect();
    }
    if (token) {
      const response = await axios.post('http://localhost:4100/api/user/edit/notonline', {
        //     const response = await axios.post('https://snapface.onrender.com/api/user/edit/notonline', {
        _id: token,
      })
      if (response.data['acknowledged'] == true)
        io.emit('user-offline', token);
    }
  });
})


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/snapface/index.html'));
});


server.listen
  //app.listen
  (4100, function () {
    console.log('Example app listening on port 4100!')
  })