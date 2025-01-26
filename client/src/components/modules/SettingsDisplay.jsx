import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "../../assets/font.css";
import { get } from "../../utilities";

const SettingsDisplay = (props) => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    get("/api/gameSettings", { lobbyCode: props.lobbyCode }).then((settings) => {
      setSettings(settings);
    });
  }, [props.lobbyCode]);

  if (!settings) {
    return <div>Loading settings...</div>;
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getStepsDisplay = () => {
    if (settings.mode === "Time") {
      return `Time Limit: ${formatTime(settings.steps)}`;
    } else if (settings.mode === "Words") {
      return `Words: ${settings.steps}`;
    } else {
      return `Points: ${settings.steps}`;
    }
  };

  return (
    <div className="settings-display">
      <p>Mode: {settings.mode}</p>
      <p>{getStepsDisplay()}</p>
      <p>Min Word Length: {settings.minWordLength}</p>
      <p>Difficulty: {settings.difficulty}</p>
      <p>Same Board: {settings.sameBoard ? "Yes" : "No"}</p>
    </div>
  );
};

export default SettingsDisplay;
