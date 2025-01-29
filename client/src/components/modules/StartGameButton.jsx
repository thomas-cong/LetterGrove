import React, { useState, useEffect } from "react";
import shortSign from "../../assets/320signs_2.png";
import { post } from "../../utilities";
import { socket } from "../../client-socket";
import "./StartGameButton.css";

const StartGameButton = (props) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const handleClick = () => {
    // Only send the start game request, don't set animation here
    if (buttonClicked) return;
    // console.log("made it here");
    setButtonClicked(true);
    post("/api/lobbyToGameTransition", { lobbyCode: props.lobbyCode });
  };

  return (
    <div className="start-game-button">
      <div className="sign-container" onClick={handleClick}>
        <img src={shortSign} className="sign" alt="Wooden Sign" />
        <h2 className="sign-text">Start Game</h2>
      </div>
    </div>
  );
};

export default StartGameButton;
