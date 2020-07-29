//IMPORT REACTJS Components
import React, { Component } from "react";
import {Link} from "react-router-dom";

//IMPORT COMPONENTS
import NavBar from "Components/NavigationBar"
import RedirectButton from "Components/RedirectButton"

//IMPORT CSS STYLINGS
import "./CSS/UsersPage.css";


class Users extends Component {
	constructor(props) {
		super(props);
				
		this.props.App.state.socket.on("onAllUsers", (data) => {
			console.log(data);
		});
		
		this.props.App.state.socket.emit("getAllUsers", "");
	}
	render() {
		return (
			<div>
				<NavBar currentPage="Users"/>
				
			</div>
		);
	}
};
export default Users;