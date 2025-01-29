import React, { useState } from "react";
import Closebutton from "../../../assets/Closebutton.png";
import "./LobbyCreationPopup.css";
import LobbySettings from "./LobbySettings";
import AlertBox from "../AlertBox/AlertBox";

import StartLobbyButton from "./StartLobbyButton";

const LobbyCreationPopup = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [steps, setSteps] = useState(null);

  return (
    <>
      {showAlert && <AlertBox message={alertMessage} setShowAlert={setShowAlert} timeout={2500} />}

      <div className="createdmainboard">
        <div className="content-wrapper">
          <img src={Closebutton} onClick={() => props.hideLobby()} className="createdcloseButton" />

          <div className="lobby-code-container">
            <div className="lobby-code-title">Lobby Settings</div>
          </div>

          <input
            type="text"
            placeholder="Enter your username"
            className="createdusername-input"
            onChange={(event) => {
              props.setUsername(event.target.value);
            }}
          />

          <LobbySettings
            gameSettings={props.gameSettings}
            setGameSettings={props.setGameSettings}
          />

          <StartLobbyButton
            lobbyCode={props.lobbyCode}
            gameSettings={props.gameSettings}
            setGameSettings={props.setGameSettings}
            username={props.username}
            setAlertMessage={setAlertMessage}
            setShowAlert={setShowAlert}
          />
        </div>
      </div>
    </>
  );
};
export default LobbyCreationPopup;
