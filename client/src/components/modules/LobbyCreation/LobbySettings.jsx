import React, { useState, useEffect } from "react";
import checkedBox from "../../../assets/checkbox/checkbox1.png";
import uncheckedBox from "../../../assets/checkbox/checkbox0.png";
import "./LobbySettings.css";

// Creating checkbox for settings toggle
const Checkbox = (props) => {
  const [checked, setChecked] = useState(true);
  const handleClick = () => {
    setChecked(!checked);
    props.setGameSettings({ ...props.gameSettings, [props.id]: !checked });
  };
  return (
    <div className="settings-row">
      <span className="settings-label">{props.text}</span>
      <img src={checked ? checkedBox : uncheckedBox} onClick={handleClick} />
    </div>
  );
};

// Creating text input for settings
const IntInput = (props) => {
  const [text, setText] = useState("");

  return (
    <div className="settings-row">
      <span className="settings-label">{props.text}</span>
      <input
        type="number"
        placeholder={props.placeholder}
        className={props.className}
        onChange={(event) => {
          // update text state and change gamesettings
          setText(event.target.value);
          props.setGameSettings({ ...props.gameSettings, [props.id]: event.target.value });
        }}
      />
    </div>
  );
};
// Dropdown Input for mode selection
const ModeSelector = (props) => {
  const [mode, setMode] = useState("Time");

  //Select the necessary type of game mode, default is Time

  return (
    <div className="settings-row">
      <span className="settings-label">Mode</span>
      <select
        onChange={(event) => {
          setMode(event.target.value);
          props.setGameSettings({ ...props.gameSettings, ["mode"]: event.target.value });
        }}
        defaultValue="Time"
      >
        <option value="Time">Time (s)</option>
        <option value="Words">Words</option>
        <option value="Letters">Letters</option>
      </select>
    </div>
  );
};

const LobbySettings = (props) => {
  return (
    <div className="settings-container">
      <ModeSelector gameSettings={props.gameSettings} setGameSettings={props.setGameSettings} />
      <IntInput
        text={props.gameSettings.mode}
        id="steps"
        className="steps-input"
        gameSettings={props.gameSettings}
        setGameSettings={props.setGameSettings}
        placeholder={props.gameSettings.steps}
      />
      <Checkbox
        text="Default Letters"
        id="defaultLetters"
        gameSettings={props.gameSettings}
        setGameSettings={props.setGameSettings}
      />
      <IntInput
        text="Points Modifier"
        id="pointsModifier"
        gameSettings={props.gameSettings}
        setGameSettings={props.setGameSettings}
        placeholder={props.gameSettings.pointsModifier}
      />
      <IntInput
        text="Min Word Length"
        id="minWordLength"
        gameSettings={props.gameSettings}
        setGameSettings={props.setGameSettings}
        placeholder={props.gameSettings.minWordLength}
      />
    </div>
  );
};
export default LobbySettings;
