//IMPORT REACTJS Components
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

//IMPORT LIBRARIES
import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

//IMPORT PAGES
import HomePage from "Pages/HomePage"
import SettingsPage from "Pages/SettingsPage"
import UsersPage from "Pages/UsersPage"
import ConsolePage from "Pages/ConsolePage"

//IMPORT CSS STYLINGS
import "./CSS/App.css";

//CONFIGURABLES
const ENDPOINT = "http://localhost:4000";

class App extends Component {
	constructor(props) {
		super(props);
		const socket = socketIOClient(ENDPOINT);
		this.state = {
			timestamp: 0,
			username: "",
			socket: socket
		};
	}
	componentDidMount() {
		
		// Clean up socket after unmount
		return () => this.state.socket.disconnect();
	}
	render() {
		return (
			<Router>
			  <Switch>
				<Route exact path="/" ><HomePage App={this}/></Route>
				<Route path="/Settings"><SettingsPage App={this}/></Route>
				<Route path="/Users"><UsersPage App={this}/></Route>
				<Route path="/Console"><ConsolePage App={this}/></Route>
			  </Switch>
			</Router>
		);
	}
}

export default App;