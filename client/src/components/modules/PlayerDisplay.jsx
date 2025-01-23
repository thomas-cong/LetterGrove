import React from "react";
import "./PlayerDisplay.css";

// @param {name} name of the player
// @param {profile picture} profile picture of the player
const PlayerDisplay = (props) => {
  return (
    <div className="playerDisplay">
      <img src={props.profilePicture} alt="Profile Picture" className="profilePicture" />
      <p className="playerName">{props.name}</p>
    </div>
  );
};
export default PlayerDisplay;
