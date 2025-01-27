import React from "react";
import "./TurnDisplay.css";

// {props.username} gives the username of the current persons turn

const TurnDisplay = (props) => {
  return (
    <div className="turn-display-container">
      <p className="turn-display-text">
        <span className="turn-display-username">{props.username}</span>'s turn
      </p>
    </div>
  );
};
export default TurnDisplay;
