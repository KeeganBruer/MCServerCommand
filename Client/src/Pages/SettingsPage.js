//IMPORT REACTJS Components
import React, { Component } from "react";
import {Link} from "react-router-dom";

//IMPORT COMPONENTS
import NavBar from "Components/NavigationBar"
import RedirectButton from "Components/RedirectButton"
import SettingEntry from "Components/SettingEntry"

//IMPORT CSS STYLINGS
import "./CSS/SettingsPage.css";


class SettingsPage extends Component {
	constructor(props) {
		super(props);
		this.onSave = this.onSave.bind(this);
		this.resetToDefaults = this.resetToDefaults.bind(this);
		this.onPropertiesChange = this.onPropertiesChange.bind(this);
		this.onGameruleChange = this.onGameruleChange.bind(this);
		let properties = this.generateProperties();
		let gamerules = this.generateGamerules();
		this.state = {
			properties: properties,
			propertiesNeedSaving: false,
			gamerules: gamerules,
			gamerulesNeedSaving: false
		}
		this.props.App.state.socket.on("onGamerules", (data) => {
			let gamerules = this.state.gamerules;
			let newGamerules = [];
			for (let i in gamerules) {
				for (let rule of data) {
					if (gamerules[i].settingValue == rule.settingValue) {
						gamerules[i].value = rule.value;
						newGamerules.push(gamerules[i]);
					}
				}
			}
			console.log(data);
			console.log(newGamerules);
			this.setState({gamerules: newGamerules, gamerulesNeedSaving: true});
		});
	}
	componentDidMount() {
		this.props.App.state.socket.emit("getGamerules", "");
	}
	onSave(e) {
		e.preventDefault();
		console.log(this.state.properties);
		this.setState({propertiesNeedSaving: false});
	}
	resetToDefaults(e) {
		let propArray = this.state.properties;
		for (let i in propArray) {
			propArray[i].value = propArray[i].defaultValue;
		}
		let ruleArray = this.state.gamerules;
		for (let i in ruleArray) {
			ruleArray[i].value = ruleArray[i].defaultValue;
		}
		this.setState({
				properties: propArray,
				gamerules: ruleArray
			});
	}
	onPropertiesChange(value, i) {
		let properties = this.state.properties;
		properties[i].value = value;
		this.setState({properties: properties, propertiesNeedSaving: true});
	}
	onGameruleChange(value, i) {
		let gamerules = this.state.gamerules;
		gamerules[i].value = value;
		this.setState({gamerules: gamerules, gamerulesNeedSaving: true});
		let command = "gamerule " + gamerules[i].settingValue + " " + value;
		let response = {msgType: "Hidden", timestamp: new Date().toLocaleTimeString(), body: command};
		this.props.App.state.socket.emit("onConsoleInput", response);
	}
	render() {
		let propertiesComponents = [];
		for (let i in this.state.properties) {
			let prop = this.state.properties[i];
			if (prop.selectionType == "dropdown") {
				propertiesComponents.push(
					<SettingEntry
						i={i}
						object={prop}
						settingValue={prop.settingValue}
						settingName={prop.settingName}
						selectionType={prop.selectionType}
						value={prop.value}
						dropDownArray={prop.dropDownArray}
						onChange={this.onPropertiesChange}
						/>
				);
			} else if (prop.selectionType == "range") {
				propertiesComponents.push(
					<SettingEntry 
						i={i}
						object={prop}
						settingValue={prop.settingValue}
						settingName={prop.settingName}
						selectionType={prop.selectionType}
						value={prop.value}
						rangeMax={prop.rangeMax}
						rangeMin={prop.rangeMin}
						onChange={this.onPropertiesChange}
						/>
				);
			} else {
				propertiesComponents.push(
					<SettingEntry 
						i={i}
						object={prop}
						settingValue={prop.settingValue}
						settingName={prop.settingName}
						selectionType={prop.selectionType}
						value={prop.value}
						onChange={this.onPropertiesChange}
						/>
				);
			}
		}
		let gamerulesComponents = [];
		for (let i in this.state.gamerules) {
			let rule = this.state.gamerules[i];
			if (rule.selectionType == "dropdown") {
				gamerulesComponents.push(
					<SettingEntry 
						i={i}
						object={rule}
						settingValue={rule.settingValue}
						settingName={rule.settingName}
						selectionType={rule.selectionType}
						value={rule.value}
						dropDownArray={rule.dropDownArray}
						onChange={this.onGameruleChange}
						/>
				);
			} else if (rule.selectionType == "range") {
				gamerulesComponents.push(
					<SettingEntry 
						i={i}
						object={rule}
						settingValue={rule.settingValue}
						settingName={rule.settingName}
						selectionType={rule.selectionType}
						value={rule.value}
						rangeMax={rule.rangeMax}
						rangeMin={rule.rangeMin}
						onChange={this.onGameruleChange}
						/>
				);
			} else {
				gamerulesComponents.push(
					<SettingEntry 
						i={i}
						object={rule}
						settingValue={rule.settingValue}
						settingName={rule.settingName}
						selectionType={rule.selectionType}
						value={rule.value}
						onChange={this.onGameruleChange}
						/>
				);
			}
		}
		let PNSClass = "";
		if (this.state.propertiesNeedSaving) {
			PNSClass = "NeedSaving"
		}
		return (
			<div>
				<NavBar currentPage="Settings"/>
				<div className="DuelPanel">
					<div className="Left">
						<div className="Footer">
							<input type="button" className={PNSClass} onClick={this.onSave} value="SAVE CHANGES"/>
							<input type="button"  onClick={this.resetToDefaults} value="RESET TO DEFAULTS"/>
						</div>
						{propertiesComponents}
					</div>
					<div className="Right">
						{gamerulesComponents}
					</div>
				</div>
			</div>
		);
	}
	
	generateProperties() {
		let properties = [
		{
			settingName: "Server Name",
			settingValue: "server-name",
			defaultValue: "Dedicated Server",
			value: "Dedicated Server",
			selectionType: "textbox",
		},
		{
			settingName: "Gamemode",
			settingValue: "gamemode",
			defaultValue: "survival",
			value: "survival",
			selectionType: "dropdown",
			dropDownArray: ["survival", "adventure", "creative"]
		},
		{
			settingName: "Difficulty",
			settingValue: "difficulty",
			defaultValue: "easy",
			value: "easy",
			selectionType: "dropdown",
			dropDownArray: ["peaceful", "easy", "normal", "hard"]
		},
		{
			settingName: "Allow Cheats",
			settingValue: "allow-cheats",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle",
		},
		{
			settingName: "Max Players",
			settingValue: "max-players",
			defaultValue: "10",
			selectionType: "counter",
			value: "10"
		},
		{
			settingName: "Online Mode",
			settingValue: "online-mode",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle",
		},
		{
			settingName: "Whitelist",
			settingValue: "white-list",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle",
		},
		{
			settingName: "Server Port",
			settingValue: "server-port",
			defaultValue: "19132",
			value: "19132",
			selectionType: "counter"
		},
		{
			settingName: "Server Port V6",
			settingValue: "server-portv6",
			defaultValue: "19133",
			value: "19133",
			selectionType: "counter"
		},
		{
			settingName: "View Distance",
			settingValue: "view-distance",
			defaultValue: "32",
			value: "32",
			selectionType: "counter"
		},
		{
			settingName: "Tick Distance",
			settingValue: "tick-distance",
			defaultValue: "4",
			value: "32",
			selectionType: "counter"
		},
		{
			settingName: "Player Idle Timeout",
			settingValue: "player-idle-timeout",
			defaultValue: "30",
			value: "32",
			selectionType: "counter"
		},
		{
			settingName: "Max Threads",
			settingValue: "max-threads",
			defaultValue: "8",
			value: "8",
			selectionType: "counter"
		},
		{
			settingName: "Level Name",
			settingValue: "level-name",
			defaultValue: "Bedrock level",
			value: "Bedrock level",
			selectionType: "textbox"
			
		},
		{
			settingName: "Level Seed",
			settingValue: "level-seed",
			defaultValue: "",
			value: "",
			selectionType: "counter"
		},
		{
			settingName: "Default Player Permission Level",
			settingValue: "default-player-permission-level",
			defaultValue: "survival",
			value: "survival",
			selectionType: "dropdown",
			dropDownArray: ["vistor", "member", "operator"]
		},
		{
			settingName: "Texturepack Required",
			settingValue: "texturepack-required",
			defaultValue: "false",
			value: "false",
			selectionType: "toggle",
		},
		{
			settingName: "Content Log File Enabled",
			settingValue: "content-log-file-enabled",
			defaultValue: "false",
			value: "false",
			selectionType: "toggle",
			
		},
		{
			settingName: "Compression Threshold",
			settingValue: "compression-threshold",
			defaultValue: "1",
			value: "1",
			selectionType: "range",
			rangeMax: 65535,
			rangeMin: 0
			
		},
		{
			settingName: "Server Authoritative Movement",
			settingValue: "server-authoritative-movement",
			defaultValue: "false",
			value: "false",
			selectionType: "toggle",
		},
		{
			settingName: "Player Movement Score Threshold",
			settingValue: "player-movement-score-threshold",
			defaultValue: "20",
			value: "20",
			selectionType: "counter"
		},
		{
			settingName: "Player Movement Duration Threshold In Ms",
			settingValue: "player-movement-duration-threshold-in-ms",
			defaultValue: "500",
			value: "500",
			selectionType: "counter"
		},
		{
			settingName: "Correct Player Movement",
			settingValue: "correct-player-movement",
			defaultValue: "false",
			value: "false",
			selectionType: "toggle",
		}
		];
		return properties;
	}
	
	generateGamerules() {
		let gamerules = [
		{
			settingName: "Commandblock Output",
			settingValue: "commandblockoutput",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		},
		{
			settingName: "Do Daylight Cycle",
			settingValue: "dodaylightcycle",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		},
		{
			settingName: "Do Entity Drops",
			settingValue: "doentitydrops",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		},
		{
			settingName: "Do Fire Tick",
			settingValue: "dofiretick",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		},
		{
			settingName: "Do Mob Loot",
			settingValue: "domobloot",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		},
		{
			settingName: "Do Mob Spawning",
			settingValue: "domobspawning",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		},
		{
			settingName: "Do Tile Drops",
			settingValue: "dotiledrops",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		},
		{
			settingName: "Do Weather Cycle",
			settingValue: "doweathercycle",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		},
		{
			settingName: "Drowning Damage",
			settingValue: "drowningdamage",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		},
		{
			settingName: "Fall Damage",
			settingValue: "falldamage",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		},
		{
			settingName: "Fire Damage",
			settingValue: "firedamage",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		},
		{
			settingName: "Keep Inventory",
			settingValue: "keepinventory",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		},
		{
			settingName: "Mob Griefing",
			settingValue: "mobgriefing",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		},
		{
			settingName: "PvP",
			settingValue: "pvp",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		},
		{
			settingName: "Show Coordinates",
			settingValue: "showcoordinates",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		},
		{
			settingName: "Natural Regeneration",
			settingValue: "naturalregeneration",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		},
		{
			settingName: "TNT Explodes",
			settingValue: "tntexplodes",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		},
		{
			settingName: "Send Command Feedback",
			settingValue: "sendcommandfeedback",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		},
		{
			settingName: "Experimental Gameplay",
			settingValue: "experimentalgameplay",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		},
		{
			settingName: "Max Command Chain Length",
			settingValue: "maxcommandchainlength",
			defaultValue: "65535",
			value: "65535",
			selectionType: "counter"
		},
		{
			settingName: "Do Insomnia",
			settingValue: "doinsomnia",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		},
		{
			settingName: "Commandblocks Enabled",
			settingValue: "commandblocksenabled",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		},
		{
			settingName: "Random Tick Speed",
			settingValue: "randomtickspeed",
			defaultValue: "1",
			value: "1",
			selectionType: "counter"
		},
		{
			settingName: "Do Immediate Respawn",
			settingValue: "doimmediaterespawn",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		},
		{
			settingName: "Show Death Messages",
			settingValue: "showdeathmessages",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		},
		{
			settingName: "Function Command Limit",
			settingValue: "functioncommandlimit",
			defaultValue: "10000",
			value: "10000",
			selectionType: "counter"
		},
		{
			settingName: "Spawn Radius",
			settingValue: "spawnradius",
			defaultValue: "5",
			value: "5",
			selectionType: "counter"
		},
		{
			settingName: "Show Tags",
			settingValue: "showtags",
			defaultValue: "true",
			value: "true",
			selectionType: "toggle"
		}
		];
		return gamerules;
	}
};
export default SettingsPage;