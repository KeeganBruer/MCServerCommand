const { exec } = require('child_process');

Array.prototype.eventPush = function(item, callback, options) {
  this.push(item);
  callback(this, options);
}

class MCServer {
	constructor(socket, LogManager) {
		this.socket = socket; //Server Socket.
		this.LogManager = LogManager;
		this.commandArray = [];
		this.commandQueue = "";
		this.playerEvents = [];
		this.startMCServer();
	}
	startMCServer() {
		//Launch Server based on Operating System
		if (process.platform.indexOf("darwin") > -1) { //MAC
			console.log("MAC");
			console.log("MAC Not Supported");
			return;
		} else if (process.platform.indexOf("win") > -1) { //Windows
			console.log("Windows");
			this.console = exec('start.bat', {cwd: "./MCServer/WMCServer"});
		} else { //Linux or Other
			console.log("Linux");
			this.console = exec('sh ./start.sh', {cwd: "./server"});
		}
		//Setup Data Streams
		this.console.stdout.setEncoding('utf8');
		this.console.stdout.on('data', (data) => {this.stdOut(data)});
		this.console.stderr.on('data', (data) => {this.onConsoleOutput(data)});
	}
	stdOut(data) {
		this.commandQueue += data.split("\r").join("\n").split("\n").join("$#$||\n");
		let commandList = this.commandQueue.split("||");
		let filteredList = [];
		for (let citem of commandList) {
			if (citem.trim() != "" && citem.trim() != "$#$") {
				filteredList.push(citem.trim());
			}
		}
		
		let leftOver = "";
		for (let citem of filteredList) {
			if (citem.indexOf("$#$") > -1) {
				this.commandArray.eventPush(citem, () => {this.onConsoleOutput()});
			} else {
				leftOver += citem;
			}
		}
		this.commandQueue = leftOver;
	}
	onConsoleOutput() {
		let data = this.commandArray.shift();
		if (data == undefined) return;
		data = data.replace("$#$", "");
		let timestamp = new Date().toLocaleTimeString();
		let body = data;
		if (data.indexOf("INFO") > -1) {
			timestamp = data.split("]")[0].replace("INFO", "").replace("[", "").trim();
			body = data.split("]")[1];
		}
		let response = {
			msgType: "Server",
			timestamp: timestamp,
			body: body
		};
		if (this.socket) {
			this.socket.emit("onConsoleOutput", response);
		}
		this.LogManager.onConsoleOutput(response);
		
		if (body.indexOf("connected") < 0) {
			return;
		}
		let playerData = body.replace("Player", "")
		console.log(playerData);
		let type= playerData.split(" ")[0].trim();
		let playerName = playerData.split(" ")[1].split(", ")[0].trim()
		let playerXuid = playerData.split(", ")[1].replace("xuid:").trim()
		this.playerEvents.eventPush({
			type: type,
			username: playerName,
			xuid: playerXuid,
			timestamp: timestamp,
			body: body
		}, this.onPlayerEvent, this);
	}
	sendConsoleInput(data) {
		//Send output with a newline character to act as pressing the enter key.
		this.console.stdin.write(data.body + "\n");
		this.LogManager.onConsoleInput(data);
	}
	onPlayerEvent(array, options) {
		let pEvent = array.pop();
		let response = {
			msgType: "User",
			timestamp: pEvent.timestamp,
			body: "Player Connected " + pEvent.username
		}
		if (options.socket) {
			options.socket.emit("onConsoleOutput", response);
		}
		options.LogManager.onConsoleOutput(response);
	}
}

module.exports = MCServer;