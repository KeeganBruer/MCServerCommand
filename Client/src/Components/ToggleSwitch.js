//IMPORT REACTJS Components
import React, { Component } from "react";

//IMPORT COMPONENTS

//IMPORT CSS STYLINGS
import "./CSS/ToggleSwitch.css"

class ToggleSwitch extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			value: props.value
		}
	}
	handleClick(e) {
		e.preventDefault();
		if (this.state.value == "true") {
			this.setState({value: "false"});
			if (this.props.onChange) {
				this.props.onChange("false", this.props.i);
			}
		} else {
			this.setState({value: "true"});
			if (this.props.onChange) {
				this.props.onChange("true", this.props.i);
			}
		}
	}
	render() {
		let onCName = "box";
		let offCName = "box";
		if (this.state.value == "true") {
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