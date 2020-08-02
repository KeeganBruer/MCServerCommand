//IMPORT REACTJS Components
import React, { Component } from "react";
import {Link} from "react-router-dom";

//IMPORT COMPONENTS
import RedirectButton from "Components/RedirectButton";

//IMPORT CSS STYLINGS
import "./CSS/NavigationBar.css"


class NavigationBar extends Component {
	constructor (props) {
		super(props);
		let navStruct = [
		{
			location: "/",
			value: "Home"
		},
		{
			location: "/Settings",
			value: "Settings"
		},
		{
			location: "/Users",
			value: "Users"
		},
		{
			location: "/Console",
			value: "Console"
		}
		];
		let navBar = [];
		for (let nav of navStruct) {
			navBar.push(
				<RedirectButton isSelected={((this.props.currentPage == nav.value) ? true : false)} location={nav.location} value={nav.value.toUpperCase()} />
			);
		}
		this.state = {
			navBar: navBar
		};
	}
	render() {
		return (
			<div>{this.state.navBar}</div>
		);
	}
}
export default NavigationBar;