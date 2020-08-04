const fs = require('fs'); 

class User {
	constructor(username) {
		this.username = username;
		this.rawData = "";
		this.lastLogin = new Date();
		this.isOnline = false;
		this.isWhitelisted = false;
		this.gamemode = "Survival";
		this.forceGamemode = false;
		this.forcedGamemode = "Survival";
	}
	loadFromRawData() {
		this.loadFromString(this.rawData)
	}
	loadFromString(string) {
		let userDetails = string.split(", ");
		this.username = userDetails[0];
		this.isOnline = userDetails[1];
		this.isWhitelisted = userDetails[2];
		this.gamemode = userDetails[3];
		this.lastLogin = new Date(userDetails[4]);
	}
	getUserAsString() {
		let output = [this.username, this.isOnline, this.isWhitelisted, this.gamemode, this.lastLogin];
		return output.join(", ") + "\n"
	}
}


class LogManager {
	constructor() {
		this.users = [];
		this.currentLog = [];
		this.today = new Date();
		this.todayAsString = this.today.getDate() + "-" + (this.today.getMonth() + 1) + "-" + this.today.getFullYear(); 
		this.logs = [];
		this.logFilesMaxLines = 50;
		this.isWaitingForResponse = false;
		this.onResponseCallback;
		this.reloadLogs();
		this.saveLog();
	}
	reloadUsers() {
		this.users = this.loadUsers();
	}
	loadUsers() {
		let allUsers = fs.readFileSync('./UserData/AllUsers.txt', {encoding:'utf8', flag:'r'});
		let newUsers = this.users;
		for (let rawUser of allUsers.split("\n")) {
			let isFound = false;
			for (let user of newUsers) {
				if (user.username == rawUser) {
					isFound = true;
					break;
				}
			}
			if (!isFound) {
				console.log("RER "+ rawUser)
				this.createNewUser(newUsers, rawUser);
			}
		}
		for (let user of newUsers) {
			try {
				user.rawData = fs.readFileSync('./UserData/' + user.username + '.txt', {encoding:'utf8', flag:'r'});
				user.loadFromRawData();
			} catch (e){
				fs.writeFileSync('./UserData/' + user.username + '.txt', "");
			}
			console.log(user);
		}
		return newUsers;
	}
	createNewUser(users, rawUser) {
		console.log("REB "+ rawUser)
		users.push(new User(rawUser.trim()))
	}
	saveUsers() {
		let allUserString = "";
		for (let user of this.users) {
			allUserString += user.username + "\n";
			fs.writeFileSync('./UserData/' + user.username + '.txt', user.getUserAsString());
		}
		fs.writeFileSync("./UserData/AllUsers.txt", allUserString.slice(0, -1));
	}
	getAllUsers() {
		let filteredUsers = [];
		for (let user of this.users) {
			filteredUsers.push(user.getUserAsString());
		}
		return filteredUsers;
	}
	onUserUpdate(data) {
			
	}
	reloadLogs() {
		this.logs = this.loadLogFile();
	}
	loadLogFile() {
		let logArray = [];
		let logCount = 0;
		while(fs.existsSync('./Logs/LogPart'+ logCount +'.txt')) {
			let rawLog = fs.readFileSync('./Logs/LogPart'+ logCount +'.txt', {encoding:'utf8', flag:'r'});
			let splitLogs = rawLog.split(/\r?\n/);
			for (let logItems of splitLogs) {
				if (logItems.trim() != "") {
					let itemAsArray = logItems.split("|$| ");
					//console.log(itemAsArray)
					let msgType = itemAsArray[0].trim();
					let body = itemAsArray[1].trim();
					let timestamp = itemAsArray[2].trim();
					logArray.unshift({ //add item to front of array
						msgType: msgType,
						timestamp: timestamp,
						body: body
					});
				}
			}
			logCount += 1;
		}
		
		return logArray;
		
	}
	saveLog() {
		this.saveToLogFile(this.logs);
	}
	saveToLogFile(data) {
		let logCount = 0;
		fs.writeFileSync('./Logs/LogPart'+ logCount +'.txt', "");
		for (let ri in data) {
			let i = (data.length-1) - ri;
			
			if (data[i] != undefined && data[i].msgType != undefined && data[i].body != undefined) {
				let logAsString = data[i].msgType + "|$| " + data[i].body + "|$| " + data[i].timestamp;
				
				if ((ri%this.logFilesMaxLines == 0 && ri != 0) || i == 0) {
					fs.appendFileSync('./Logs/LogPart'+ logCount +'.txt', logAsString);
				} else {
					fs.appendFileSync('./Logs/LogPart'+ logCount +'.txt', logAsString + "\n");
				}
				
				if (ri%this.logFilesMaxLines == 0 && ri != 0) {
					logCount += 1;
					fs.writeFileSync('./Logs/LogPart'+ logCount +'.txt', "");
				} 
			}
		}
	}
	onConsoleOutput(data) {
		if (this.isWaitingForResponse) {
			this.onResponseCallback(data);
			this.isWaitingForResponse = false;
			this.onResponseCallback = undefined;
			return false;
		}
		this.reloadLogs();
		this.logs.unshift(data);
		this.saveLog();
		return true;
	}
	onConsoleInput(data, callback) {
		if (callback != undefined) {
			this.isWaitingForResponse = true;
			this.onResponseCallback = callback;
			return;
		}
		this.reloadLogs();
		this.logs.unshift(data);
		this.saveLog();
	}
	getConsoleHistory(n) {
		this.reloadLogs();
		return this.logs.slice(0, n);
	}
}

module.exports = LogManager;