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
			entries: [],
			consoleHistoryUpToDate: false
		};
		
		//BIND CUSTOM FUNCTIONS
		this.handleChange = this.handleChange.bind(this);
		this.onConsoleCommand = this.onConsoleCommand.bind(this);
		this.addEntry = this.addEntry.bind(this);
		
		this.props.App.state.socket.on("onConsoleOutput", (data) => {
			console.log(data);
			this.addEntry(data);
		});
		this.props.App.state.socket.on("onConsoleHistory", (data) => {
			if (!this.state.consoleHistoryUpToDate) {
				for (let entry of data ) {
					this.addEntry(entry);
				}
				this.setState({consoleHistoryUpToDate: true});
			}
		});
		
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
		console.log(this.props.App.state.socket)
		let response = {msgType: "Client", timestamp: new Date().toLocaleTimeString(), body: this.state.command};
		this.props.App.state.socket.emit("onConsoleInput", response);
		this.addEntry(response)
		this.setState({command: ""});
		event.preventDefault();
	}
	render() {
		return (
			<div className="PageWrapper">
				<NavBar currentPage="Console"/>
				<div className="Console">
					{this.state.entries}
				</div>
				<div className="ConsoleInput">
					<form onSubmit={this.onConsoleCommand}>
						<input type="text" value={this.state.command} onChange={this.handleChange} />
						<input type="submit" value="Submit" />
					</form>
				</div>
			</div>
		);
	}
};
export default ConsolePage;