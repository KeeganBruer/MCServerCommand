const express = require("express");
const router = express.Router();
const http = require("http");
const socketIo = require("socket.io");
const path = require('path');
const MCServerClass = require(path.resolve( __dirname, "./MCServer.js"));
const LogManagerClass = require(path.resolve( __dirname, "./LogManager.js"));
const LogManager = new LogManagerClass();
const port = process.env.PORT || 3000;


const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

const io = socketIo(server);
const MCServer = new MCServerClass(io, LogManager);

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
  socket.on("onConsoleInput", (data) => {
	 MCServer.sendConsoleInput(data); 
  });
});

server.listen(4000, () => console.log(`Listening on port ${port}`));
if (false) {
	app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
}