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
        sender: data['sender'],
        conversationId: data['conversationId'],
        text: data['text']
      })
      const savedMessage = response.data;

      if (savedMessage['acknowledged'] == true) 
      io.emit('newMessage', data); // broadcast to all
    } catch (error) {
      console.error('Erreur lors de l’enregistrement du message', error);
    }

  });

  socket.on('joinRoom', (userId) => {
    socket.join(userId);
  });

  socket.on("disconnect", () => {
    console.log("Utilisateur déconnecté");
  });

});

server.listen(4110, () => {
  console.log("Serveur WebSocket démarré sur le port 4110");
});
