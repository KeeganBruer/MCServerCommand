//IMPORT REACTJS Components
import React, { Component } from "react";

//IMPORT COMPONENTS

//IMPORT CSS STYLINGS
import "./CSS/ToggleSwitch.css"

class ToggleSwitch extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		console.log(this.props.settingName + " " + this.props.value);
	}
	handleClick(e) {
		e.preventDefault();
		if (this.props.value == "true") {
			if (this.props.onChange) {
				this.props.onChange("false", this.props.i);
			}
		} else {
			if (this.props.onChange) {
				this.props.onChange("true", this.props.i);
			}
		}
	}
	render() {
		let onCName = "box";
		let offCName = "box";
		if (this.props.value == "true") {
			onCName += " white";
			offCName += " green";
		} else {
			onCName += " red";
			offCName += " white";
		}
		return (
			<div className="ToggleSwitch" onClick={this.handleClick}>
				<div className={onCName}/>
				<div className={offCName}/>
			</div>
		);
	}
}
export default ToggleSwitch;