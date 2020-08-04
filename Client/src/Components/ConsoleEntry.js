//IMPORT REACTJS Components
import React, { Component } from "react";

//IMPORT COMPONENTS

//IMPORT CSS STYLINGS
import "./CSS/ConsoleEntry.css"

class ConsoleEntry extends Component {
	render() {
		let cName = "ConsoleEntry"; //List of Classes as a String 
		let cNameModifiers = [//Modify the list of Classes based on msg type.
		{
			msgType: "Server",
			className: "ServerType"
		},
		{
			msgType: "Client",
			className: "ClientType"
		},
		{
			msgType: "User",
			className: "UserType"
		},
		{
			msgType: "Interface",
			className: "InterfaceType"
		}
		];
		//Loop over the modifiers and apply them. Capable of multiple modifiers because of indexOf(). 
		for (let modifier of cNameModifiers) {
			if (this.props.msgType.toLowerCase().indexOf(modifier.msgType.toLowerCase()) > -1) {
				//Space seperates the class names
				cName += " " + modifier.className;
			}
		}
		return (
			<div className={cName}>
				<h1 className="Timestamp">{this.props.timestamp}</h1>
				<h3 className="Body">{this.props.body}</h3>
			</div>
		);
	}
}
export default ConsoleEntry;