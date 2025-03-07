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
/*
  socket.on("publicMessage", (msg) => {
    console.log("Message reçu :", msg);
    io.emit("publicMessage", msg); // Diffuse le message à tous
  });
*/

/*
  socket.on("privateMessage", (msg) => {
    console.log("Message privé reçu :", msg);
    io.emit("privateMessage", msg); // Diffuse le message à tous
  });
  */

  socket.on('privateMessage', async ({ sender, receiver, text }) => {
      //try {
        const response = await axios.post('http://localhost:4100/message/create', {
          sender,
          receiver,
          text
         })
     
         const savedMessage = response.data;
         io.to(receiver).emit('receiveprivateMessage', savedMessage);
       // res.send(savedMessage);
     /*  } catch (error) {
         console.error('Erreur lors de l’enregistrement du message', error);
       }*/
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
