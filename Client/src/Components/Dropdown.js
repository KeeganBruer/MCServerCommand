//IMPORT REACTJS Components
import React, { Component } from "react";

//IMPORT COMPONENTS

//IMPORT CSS STYLINGS
import "./CSS/Dropdown.css"

class Dropdown extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			value: props.value
		}
	}
	handleChange(e) {
		e.preventDefault();
		this.setState({value: e.target.value});
		if (this.props.onChange) {
			this.props.onChange(e.target.value, this.props.i);
		}
	}
	render() {
		let options = [];
		for (let item of this.props.dropDownArray) {
			options.push(
				<option value={item}>{item}</option>
			);
		}
		return (
			<div className="Dropdown">
				<select value={this.state.value} onChange={this.handleChange}>
					{options}
				</select>
			</div>
		);
	}
}
export default Dropdown;