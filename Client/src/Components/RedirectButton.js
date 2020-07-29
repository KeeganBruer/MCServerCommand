//IMPORT REACTJS Components
import React, { Component } from "react";
import {Link} from "react-router-dom";

//IMPORT COMPONENTS

//IMPORT CSS STYLINGS
import "./CSS/RedirectButton.css"


class RedirectButton extends Component {
	render() {
		let cName = "Button";
		if (this.props.isSelected) {
			cName += " Selected";
		}
		return (
			<div className={cName}><Link to={this.props.location} className="Redirect">{this.props.value}</Link></div>
		);
	}
}
export default RedirectButton;