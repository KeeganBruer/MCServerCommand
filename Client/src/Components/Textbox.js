//IMPORT REACTJS Components
import React, { Component } from "react";

//IMPORT COMPONENTS

//IMPORT CSS STYLINGS
import "./CSS/Textbox.css"

class Textbox extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		e.preventDefault();
		let newValue = e.target.value;
		if (this.props.onChange) {
			this.props.onChange(newValue, this.props.i);
		}
	}
	render() {
		return (
			<div className="Dropdown">
				<input className="textbox" type="text" value={this.props.value} onChange={this.handleChange} />
			</div>
		);
	}
}
export default Textbox;