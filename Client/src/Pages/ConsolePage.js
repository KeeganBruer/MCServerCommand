//IMPORT REACTJS Components
import React, { Component } from "react";
import {Link} from "react-router-dom";

//IMPORT COMPONENTS
import NavBar from "Components/NavigationBar"
import RedirectButton from "Components/RedirectButton"
import Entry from "Components/ConsoleEntry";

//IMPORT CSS STYLINGS
import "./CSS/ConsolePage.css";

//CONFIGURABLES
const maxConsoleMessages = 20;

class ConsolePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			command: '',
			commandHistory: [],
			historyI: -1,
			entries: [],
			consoleHistoryUpToDate: false
		};
		
		//BIND CUSTOM FUNCTIONS
		this.handleChange = this.handleChange.bind(this);
		this.onConsoleCommand = this.onConsoleCommand.bind(this);
		this.addEntry = this.addEntry.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.isClientCommand = this.isClientCommand.bind(this);
		
		this.props.App.state.socket.on("onConsoleOutput", (data) => {
			console.log(data);
			this.addEntry(data);
		});
		this.props.App.state.socket.on("onConsoleHistory", (data) => {
			if (!this.state.consoleHistoryUpToDate) {
				for (let ri in data ) {
					let i = (data.length - 1) - ri;
					this.addEntry(data[i]);
				}
				this.setState({consoleHistoryUpToDate: true});
			}
		});
	}
	componentDidMount() {
		this.CommandBox.focus();
		this.props.App.state.socket.emit("getConsoleHistory", maxConsoleMessages);
	}
	handleChange(event) {
		this.setState({command: event.target.value});
	}
	addEntry(data) {
		let newEntries = this.state.entries;
		newEntries.unshift(<Entry msgType={data.msgType} timestamp={data.timestamp} body={data.body}/>);
		if (newEntries.length > maxConsoleMessages) {
			newEntries.pop();
		}
		this.setState({entries: newEntries});
	}
	onConsoleCommand(event) {
		event.preventDefault();
		let response = {msgType: "Client", timestamp: new Date().toLocaleTimeString(), body: this.state.command};
		let historyArray = this.state.commandHistory;
		historyArray.unshift(this.state.command);
		this.setState({command: "", historyI: -1, commandHistory: historyArray});
		if (this.isClientCommand(response)) {
			response.msgType = "Interface";
			this.addEntry(response);
			return;
		} else {
			this.addEntry(response)
			this.props.App.state.socket.emit("onConsoleInput", response);
		}
	}
	isClientCommand(data) {
		if (data.body.toLowerCase().indexOf("test") > -1) {
			this.props.App.state.socket.emit("onClientCommand", data);
			return true;
		}
		return false;
	}
	handleKeyDown(e) {
		if (e.key === 'Enter') {
			this.onConsoleCommand(e);
		} else if (e.key === "ArrowUp") {
			let i = parseInt(this.state.historyI) + 1;
			let previous = this.state.commandHistory[i];
			if (previous) {
				this.setState({command: previous, historyI: i});
			}
		}else if (e.key === "ArrowDown") {
			let i = parseInt(this.state.historyI) - 1;
			let previous = this.state.commandHistory[i];
			if (previous) {
				this.setState({command: previous, historyI: i});
			} else {
				this.setState({command: "", historyI: -1});
			}
		}
	}
	render() {
		return (
			<div className="PageWrapper">
				<NavBar currentPage="Console"/>
				<div className="ConsoleWrapper">
					<div className="Console">
						{this.state.entries}
					</div>
					<form className="ConsoleInput" onSubmit={this.onConsoleCommand} >
						<input type="text" className="CommandBox" value={this.state.command} onChange={this.handleChange} ref={(input) => { this.CommandBox = input; }} onKeyDown={this.handleKeyDown}/>
						<input type="submit" className="SendButton" value="Submit" />
					</form>
				</div>
			</div>
		);
	}
};
export default ConsolePage;