const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3001;

let players = [];

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinGame', (playerName) => {
    if (players.length < 8) {
      players.push({ id: socket.id, name: playerName });
      io.emit('updatePlayers', players);
    } else {
      socket.emit('gameFull');
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    players = players.filter(player => player.id !== socket.id);
    io.emit('updatePlayers', players);
  });
});

server.listen(port, () => console.log(`Backend listening on port ${port}`));