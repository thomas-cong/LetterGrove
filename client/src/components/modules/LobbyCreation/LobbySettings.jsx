import React, { useState, useEffect } from "react";
import "./LobbySettings.css";
import DifficultySlider from "./DifficultySlider";

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

// Time input for minutes and seconds
const TimeInput = (props) => {
  const [minutes, setMinutes] = useState("03");
  const [seconds, setSeconds] = useState("00");

  const updateGameSettings = (mins, secs) => {
    const m = Math.min(59, Math.max(0, parseInt(mins) || 0));
    const s = Math.min(59, Math.max(0, parseInt(secs) || 0));
    const totalSeconds = m * 60 + s;
    props.setGameSettings({ ...props.gameSettings, [props.id]: totalSeconds });
  };

  const handleMinutesChange = (event) => {
    const value = event.target.value.slice(0, 2);
    if (value === "" || /^\d+$/.test(value)) {
      setMinutes(value);
      updateGameSettings(value, seconds);
    }
  };

  const handleSecondsChange = (event) => {
    const value = event.target.value.slice(0, 2);
    if (value === "" || /^\d+$/.test(value)) {
      setSeconds(value);
      updateGameSettings(minutes, value);
    }
  };

  return (
    <div className="settings-row">
      <span className="settings-label">{props.text}</span>
      <div className="time-input-container">
        <input
          type="text"
          value={minutes}
          placeholder="03"
          className="time-input"
          onChange={handleMinutesChange}
          maxLength={2}
        />
        <span>:</span>
        <input
          type="text"
          value={seconds}
          placeholder="00"
          className="time-input"
          onChange={handleSecondsChange}
          maxLength={2}
        />
      </div>
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
        <option value="Time">Time</option>
        <option value="Words">Words</option>
        <option value="Points">Points</option>
      </select>
    </div>
  );
};

const LobbySettings = (props) => {
  return (
    <div className="settings-container">
      <ModeSelector gameSettings={props.gameSettings} setGameSettings={props.setGameSettings} />
      {props.gameSettings.mode === "Time" ? (
        <TimeInput
          text="Time Limit"
          id="steps"
          className="steps-input"
          gameSettings={props.gameSettings}
          setGameSettings={props.setGameSettings}
        />
      ) : (
        <IntInput
          text={props.gameSettings.mode}
          id="steps"
          className="steps-input"
          gameSettings={props.gameSettings}
          setGameSettings={props.setGameSettings}
          placeholder={
            props.gameSettings.mode === "Words"
              ? 15
              : props.gameSettings.mode === "Points"
              ? 100
              : ""
          }
        />
      )}
      <IntInput
        text="Min Word Length"
        id="minWordLength"
        gameSettings={props.gameSettings}
        setGameSettings={props.setGameSettings}
        placeholder={3}
      />
      <DifficultySlider setGameSettings={props.setGameSettings} gameSettings={props.gameSettings} />
    </div>
  );
};
export default LobbySettings;
