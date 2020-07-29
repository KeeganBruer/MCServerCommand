//IMPORT REACTJS Components
import React, { Component } from "react";
import {Link} from "react-router-dom";

//IMPORT COMPONENTS
import NavBar from "Components/NavigationBar"
import RedirectButton from "Components/RedirectButton"

//IMPORT CSS STYLINGS
import "./CSS/UsersPage.css";


class Users extends Component {
	render() {
		return (
			<div>
				<NavBar currentPage="Users"/>
				
			</div>
		);
	}
};
export default Users;