import React, { useState, useEffect } from "react";
import shortSign from "../../assets/320signs_2.png";
import { post } from "../../utilities";
import AlertBox from "./AlertBox/AlertBox.jsx";
import "./StartGameButton.css";

const StartGameButton = (props) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const handleClick = () => {
    // Only send the start game request, don't set animation here
    if (buttonClicked) return;
    console.log("made it here");
    setButtonClicked(true);
    post("/api/lobbyToGameTransition", { lobbyCode: props.lobbyCode }).catch((error) => {
      setShowAlert(true);
      setAlertMessage("Please refresh the page: user not authenticated");
    });
  };

  return (
    <>
      <div className="start-game-button">
        <div className="sign-container" onClick={handleClick}>
          <img src={shortSign} className="sign" alt="Wooden Sign" />
          <h2 className="sign-text">Start Game</h2>
        </div>
      </div>
      {showAlert && <AlertBox message={alertMessage} timeout={3500} setShowAlert={setShowAlert} />}
    </>
  );
};

export default StartGameButton;
