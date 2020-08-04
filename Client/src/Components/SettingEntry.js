//IMPORT REACTJS Components
import React, { Component } from "react";

//IMPORT COMPONENTS
import ToggleSwitch from "Components/ToggleSwitch";
import Dropdown from "Components/Dropdown";
import Counter from "Components/Counter";
import Textbox from "Components/Textbox";
//IMPORT CSS STYLINGS
import "./CSS/SettingEntry.css"

class SettingEntry extends Component {
	render() {
		let configInput;
		if (this.props.selectionType == "toggle") {
			configInput = <ToggleSwitch 
				i={this.props.i} 
				settingName={this.props.settingName}
				onChange={this.props.onChange} 
				className="Input" 
				value={this.props.value} 
				/>;
		}
		if (this.props.selectionType == "dropdown") {
			configInput = <Dropdown 
				i={this.props.i} 
				onChange={this.props.onChange} 
				className="Input" 
				value={this.props.value}
				dropDownArray={this.props.dropDownArray}
				/>;
		}
		if (this.props.selectionType == "counter") {
			configInput = <Counter 
				i={this.props.i} 
				onChange={this.props.onChange} 
				className="Input" 
				value={this.props.value}
				/>;
		}
		if (this.props.selectionType == "textbox") {
			configInput = <Textbox 
				i={this.props.i} 
				onChange={this.props.onChange} 
				className="Input" 
				value={this.props.value}
				/>;
		}
		return (
			<div className="SettingEntry">
				<h1 className="SettingsName">{this.props.settingName}</h1>
				{configInput}
			</div>
		);
	}
}
export default SettingEntry;