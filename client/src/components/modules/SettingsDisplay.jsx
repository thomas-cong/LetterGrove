import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "../../assets/font.css";
import { get } from "../../utilities";
import { post } from "../../utilities";

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

  return (
    <div>
      <p>Mode: {settings.mode}</p>
      <p>Steps: {settings.steps}</p>
      <p>Min Word Length: {settings.minWordLength}</p>
      <p>Difficulty: {settings.difficulty}</p>
      <p>Same Board: {settings.sameBoard ? "Yes" : "No"}</p>
    </div>
  );
};

export default SettingsDisplay;
