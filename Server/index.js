const express = require("express");
const router = express.Router();
const http = require("http");
const socketIo = require("socket.io");
const path = require('path');

const port = process.env.PORT || 3000;


const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response.toLocaleTimeString());
};

server.listen(4000, () => console.log(`Listening on port ${port}`));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))