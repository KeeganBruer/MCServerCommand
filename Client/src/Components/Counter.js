//IMPORT REACTJS Components
import React, { Component } from "react";

//IMPORT COMPONENTS

//IMPORT CSS STYLINGS
import "./CSS/Counter.css"

class Counter extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleCount = this.handleCount.bind(this);
	}
	handleCount(e) {
		e.preventDefault();
		let newValue = parseInt(this.props.value) + parseInt(e.target.dataset.value);
		if (this.props.onChange) {
			this.props.onChange(newValue, this.props.i);
		}
	}
	handleChange(e) {
		e.preventDefault();
		let newValue = e.target.value;
		console.log(newValue);
		if (this.props.onChange) {
			this.props.onChange(newValue, this.props.i);
		}
	}
	render() {
		
		return (
			<div className="Dropdown">
				<div className="changeButton" onClick={this.handleCount} data-value="-1"/>
				<input className="count" type="text" value={this.props.value} onChange={this.handleChange} />
				<div className="changeButton" onClick={this.handleCount} data-value="1"/>
			</div>
		);
	}
}
export default Counter;