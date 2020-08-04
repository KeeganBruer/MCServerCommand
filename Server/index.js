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
  socket.on("getConsoleHistory", (data) => {
	 socket.emit("onConsoleHistory", LogManager.getConsoleHistory(data)); 
  });
  socket.on("getAllUsers", (data) => {
	 socket.emit("onAllUsers", LogManager.getAllUsers());
  });
  socket.on("getGamerules", (data) => {
	let response = {
		msgType: "Server",
		timestamp: "",
		body: "gamerule"
	};
	 MCServer.sendConsoleInput(response, (data) => {
		 let gamerules = data.body.split(",");
		 let response = [];
		 for (let rule of gamerules) {
			 let ruleArray = rule.trim().split("=");
			 response.push({
				 settingValue: ruleArray[0].trim(),
				 value: ruleArray[1].trim()
			 });
		 }
		 socket.emit("onGamerules", response);
	 }); 
  });
  socket.on("onConsoleInput", (data) => {
	let callback;
	if (data.msgType.indexOf("Hidden") > -1) {
		callback = () => {
			
		}
	}
	MCServer.sendConsoleInput(data, callback); 
  });
  socket.on("onClientCommand", (data) => {
	let fullCommand = data.body.toLowerCase();
	let commandArray = fullCommand.split(" ");
	if (commandArray[0].indexOf("test") > -1) {
		console.log("test Command")  
	}
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(4000, () => console.log(`Listening on port ${port}`));
if (false) {
	app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
}