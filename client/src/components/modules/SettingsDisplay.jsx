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
      return [`Time Limit: `, formatTime(settings.steps)];
      // return `Time Limit: ${formatTime(settings.steps)}`;
    } else if (settings.mode === "Words") {
      return [`Words: `, settings.steps];
      // return `Words: ${settings.steps}`;
    } else {
      return [`Points: `, settings.steps];
      // return `Points: ${settings.steps}`;
    }
  };

  return (
    <div className="settings-display">
      <p style={{ color: "#666" }}>Mode: <span style={{ color: "var(--primary--dim)" }}>{settings.mode}</span></p>
      <p style={{ color: "#666" }}>{getStepsDisplay()[0]} <span style={{ color: "var(--primary--dim)" }}>{getStepsDisplay()[1]}</span></p>
      <p style={{ color: "#666" }}>Min Word Length: <span style={{ color: "var(--primary--dim)" }}>{settings.minWordLength}</span></p>
      <p style={{ color: "#666" }}>Difficulty: <span style={{ color: "var(--primary--dim)" }}>{settings.difficulty}</span></p>
      <p style={{ color: "#666" }}>Same Board: <span style={{ color: "var(--primary--dim)" }}>{settings.sameBoard ? "Yes" : "No"}</span></p>
    </div>
  );
};

export default SettingsDisplay;
