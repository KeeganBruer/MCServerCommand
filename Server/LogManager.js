const fs = require('fs'); 

class User {
	constructor(username) {
		this.username = username;
		this.rawData = "";
		this.lastLogin = new Date();
		this.isOnline = false;
		this.isWhitelisted = false;
		this.gamemode = "Survival";
		
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
		this.reloadUsers();
		this.saveUsers();
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
	
	onConsoleOutput(data) {
		
	}
	onConsoleInput(data) {
		
	}
	
}

module.exports = LogManager;