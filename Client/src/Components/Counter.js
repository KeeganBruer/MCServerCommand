//IMPORT REACTJS Components
import React, { Component } from "react";

//IMPORT COMPONENTS

//IMPORT CSS STYLINGS
import "./CSS/Counter.css"

class Counter extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			value: props.value
		}
	}
	handleChange(e) {
		e.preventDefault();
		console.log(e.target.dataset.value);
		let newValue = parseInt(this.state.value) + parseInt(e.target.dataset.value);
		this.setState({value: newValue});
		if (this.props.onChange) {
			this.props.onChange(newValue, this.props.i);
		}
	}
	render() {
		
		return (
			<div className="Dropdown">
				<div className="changeButton" onClick={this.handleChange} data-value="-1"/>
				<h1>{this.state.value}</h1>
				<div className="changeButton" onClick={this.handleChange} data-value="1"/>
			</div>
		);
	}
}
export default Counter;