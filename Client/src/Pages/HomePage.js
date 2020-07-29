//IMPORT REACTJS Components
import React, { Component } from "react";
import {Link} from "react-router-dom";

//IMPORT COMPONENTS
import NavBar from "Components/NavigationBar"
import RedirectButton from "Components/RedirectButton"

//IMPORT CSS STYLINGS
import "./CSS/HomePage.css"


class Home extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.App.setState({username: event.target.value});
	}
	
	render() {
		return (
			<div>
				<NavBar currentPage="Home"/>
				<h3>Current Username:
				<input type="text" value={this.props.App.state.username} onChange={this.handleChange} />
				</h3>
			</div>
		);
	}
};
export default Home;