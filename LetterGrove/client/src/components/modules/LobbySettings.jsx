import React, { useState, useEffect } from "react";
import checkedBox from "../../assets/checkbox/checkbox1.png";
import uncheckedBox from "../../assets/checkbox/checkbox0.png";

// Creating checkbox for settings toggle
const Checkbox = (props) => {
  const [checked, setChecked] = useState(true);
  const handleClick = () => {
    setChecked(!checked);
    props.setGameSettings({ ...props.gameSettings, [props.id]: !checked });
  };
  return (
    <span>
      <span> {props.text} </span>
      <img src={checked ? checkedBox : uncheckedBox} onClick={handleClick} />
    </span>
  );
};

// Creating text input for settings
const IntInput = (props) => {
  const [text, setText] = useState("");

  return (
    <span>
      <span> {props.text} </span>
      <input
        type="number"
        placeholder={props.placeholder}
        onChange={(event) => {
          // update text state and change gamesettings
          setText(event.target.value);
          props.setGameSettings({ ...props.gameSettings, [props.id]: event.target.value });
        }}
      />
    </span>
  );
};
// Dropdown Input for mode selection
const ModeSelector = (props) => {
  const [mode, setMode] = useState("Time");

  //Select the necessary type of game mode, default is Time

  return (
    <span>
      <span> Mode </span>
      <select
        onChange={(event) => {
          setMode(event.target.value);
          props.setGameSettings({ ...props.gameSettings, ["mode"]: event.target.value });
        }}
        defaultValue="Time"
      >
        <option value="Time">Time (seconds)</option>
        <option value="Words"> Words </option>
        <option value="Letters"> Letters </option>
      </select>
    </span>
  );
};

const LobbySettings = (props) => {
  return (
    <div>
      <div>
        <ModeSelector gameSettings={props.gameSettings} setGameSettings={props.setGameSettings} />
      </div>
      <div>
        <IntInput
          text={props.gameSettings["mode"]}
          id="steps"
          gameSettings={props.gameSettings}
          setGameSettings={props.setGameSettings}
          placeholder={props.gameSettings.steps}
        />
      </div>
      <div></div>
      <div>
        <Checkbox
          text="Default Letters"
          id="defaultLetters"
          gameSettings={props.gameSettings}
          setGameSettings={props.setGameSettings}
        />
      </div>
      <div>
        <IntInput
          text="Points Modifier"
          id="pointsModifier"
          gameSettings={props.gameSettings}
          setGameSettings={props.setGameSettings}
          placeholder={props.gameSettings.pointsModifier}
        />
      </div>
      <div>
        <IntInput
          text="Min Word Length"
          id="minWordLength"
          gameSettings={props.gameSettings}
          setGameSettings={props.setGameSettings}
          placeholder={props.gameSettings.minWordLength}
        />
      </div>
      <div></div>
    </div>
  );
};
export default LobbySettings;
