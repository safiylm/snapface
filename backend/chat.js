/*var express = require('express');
var app = express();
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);


io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');

  socket.on('message', (msg) => {
    io.emit('message', msg); // Diffuser à tous
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur est déconnecté');
  });
  socket.onerror = function () {
    console.log('websocket error')
  }
});
console.log("salut")


app.get("/", (req, res) => {
  res.send("Bienvenue")
});

app.listen(4400, function () {
  console.log('Example app listening on port 4400!')
})

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors");
const app = express();

const server = http.createServer(app);
//const io = socketIO(server); // Initialize socket.io
const io = new Server(server, {
  cors: { origin: '*' }
})


const port = process.env.PORT || 4100;
app.use(cors({origin: "*"}));


io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', { from: 'Server', text: 'Welcome!', createdAt: Date.now() });

    socket.on('createMessage', (message) => {
        console.log('New message:', message);
        io.emit('newMessage', message); // Send to everyone
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.get("/", (req, res) => {
  res.send("Bienvenue")
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
*/


const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

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

  socket.on("message", (msg) => {
    console.log("Message reçu :", msg);
    io.emit("message", msg); // Diffuse le message à tous
  });

  socket.on("disconnect", () => {
    console.log("Utilisateur déconnecté");
  });
});

server.listen(4110, () => {
  console.log("Serveur WebSocket démarré sur le port 4110");
});
