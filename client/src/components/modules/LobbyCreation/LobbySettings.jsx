import React, { useEffect, useState } from "react";
import "./LobbySettings.css";
import DifficultySlider from "./DifficultySlider";

// Creating text input for settings
const IntInput = (props) => {
  const [text, setText] = useState(props.value);

  useEffect(() => {
    props.setGameSettings({ ...props.gameSettings, [props.id]: text });
  }, []);

  useEffect(() => {
    setText("");
  }, [props.gameSettings.mode]);

  return (
    <div className="settings-row">
      <span className="settings-label">{props.text}</span>
      <input
        type="number"
        value={text}
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
  const getDefaultSteps = (selectedMode) => {
    switch (selectedMode) {
      case "Time":
        return 180;
      case "Words":
        return 15;
      case "Points":
        return 100;
      default:
        return 180;
    }
  };

  // If sameboard is enabled and mode is Time, automatically switch to Words
  const currentMode = props.gameSettings.sameBoard && props.gameSettings.mode === "Time" 
    ? "Words" 
    : props.gameSettings.mode;

  // If we had to switch modes, update the game settings
  if (props.gameSettings.sameBoard && props.gameSettings.mode === "Time") {
    props.setGameSettings({
      ...props.gameSettings,
      mode: "Words",
      steps: 15,
    });
  }

  return (
    <div className="settings-row">
      <span className="settings-label">Mode</span>
      <select
        onChange={(event) => {
          const selectedMode = event.target.value;
          props.setGameSettings({
            ...props.gameSettings,
            mode: selectedMode,
            steps: getDefaultSteps(selectedMode),
          });
        }}
        value={currentMode}
      >
        <option value="Words">Words</option>
        {!(props.gameSettings.sameBoard) && <option value="Time">Time (s)</option>}
        <option value="Points">Points</option>
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
        value={
          props.gameSettings.mode === "Time"
            ? 180
            : props.gameSettings.mode === "Words"
            ? 15
            : props.gameSettings.mode === "Points"
            ? 100
            : ""
        }
        placeholder={
          props.gameSettings.mode === "Time"
            ? 180
            : props.gameSettings.mode === "Words"
            ? 15
            : props.gameSettings.mode === "Points"
            ? 100
            : ""
        }
      />
      <IntInput
        text="Min Word Length"
        id="minWordLength"
        gameSettings={props.gameSettings}
        setGameSettings={props.setGameSettings}
        placeholder={3}
        value={3}
      />
      <DifficultySlider setGameSettings={props.setGameSettings} gameSettings={props.gameSettings} />
    </div>
  );
};
export default LobbySettings;
