const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200", // Autorise Angular à se connecter
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {

  console.log("Un utilisateur est connecté");

  socket.on("publicMessage", (msg) => {
    console.log("Message reçu :", msg);
    io.emit("publicMessage", msg); // Diffuse le message à tous
  });
/*
  socket.on("privateMessage", (msg) => {
    io.emit("privateMessage", msg); // Diffuse le message à tous
  });
  */

  socket.on('privateMessage', async ({ sender, receiver, conversationId, text }) => {
      //try {
        const response = await axios.post('http://localhost:4100/message/create', {
          sender,
          conversationId,
          text
         })
         const savedMessage = response.data;
         console.log(savedMessage);
      //   io.to(receiver).emit('receiveprivateMessage', savedMessage)
         io.emit('receiveprivateMessage', savedMessage);
     /*  } catch (error) {
         console.error('Erreur lors de l’enregistrement du message', error);
       }*/
  });

  /*
  Les rooms permettent d'envoyer des messages uniquement à certains utilisateurs au lieu de diffuser à tous. Cela est utile pour : ✅ Un chat privé (envoyer un message à un utilisateur spécifique).
✅ Des notifications personnalisées (alerter un utilisateur précis).
✅ Un support en ligne (un agent parle à un client spécifique).
  */

  socket.on('joinRoom', (userId) => {
    socket.join(userId);
    console.log("userId")
  });



  socket.on("disconnect", () => {
    console.log("Utilisateur déconnecté");
  });

});

server.listen(4110, () => {
  console.log("Serveur WebSocket démarré sur le port 4110");
});
