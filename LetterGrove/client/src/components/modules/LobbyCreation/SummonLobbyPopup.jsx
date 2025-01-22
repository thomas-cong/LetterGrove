import React, { useState, useEffect } from "react";
import { get, post } from "../../../utilities";
import buttonImage from "../../../assets/640signs_1.png";
import "./SummonLobbyPopup.css";
import LobbyCreationPopup from "../LobbyCreation/LobbyCreationPopup";
import "../../../assets/font.css";

/**
 * SummonLobbyPopup is a component for briningup the lobby creation popup
 *
 * Proptypes
 * @param {popUpShowing} whether any global popup is showing on menu
 * @param {setPopupShowing} setter for whether any global popup is showing on menu
 */

const SummonLobbyPopup = (props) => {
  const [LobbyShowing, setLobbyShowing] = useState(false);
  const [lobbyCode, setLobbyCode] = useState("");
  const [username, setUsername] = useState("");

  const [gameSettings, setGameSettings] = useState({
    minWordLength: 3, // int
    pointsModifier: 1, // int
    mode: "Time", // string
    steps: 180, // int
    defaultLetters: true, // checkbox
    powerups: [], // array
  });

  // handles showing the lobby by state update
  const showLobby = () => {
    // Generates an alphanumeric 5 char sequence for the lobby through api request
    get("/api/generateLobbyCode")
      .then((code) => {
        setLobbyCode(code.lobbyCodeGenerated);
        console.log(code);
      })
      .catch(setLobbyCode("ERROR"));
    setLobbyShowing(true);
    props.onShowLobby && props.onShowLobby();
    props.setPopupShowing(true);
  };
  // handles hiding the button by state update
  const hideLobby = () => {
    setLobbyShowing(false);
    setLobbyCode("");
    setUsername("");
    props.onHideLobby && props.onHideLobby();
    props.setPopupShowing(false);
  };

  // Conditionally render either the create game button or the damn lobby creation popup
  return (
    <div>
      {!LobbyShowing && !props.popupShowing && (
        <div onClick={showLobby} className="button-container">
          <img src={buttonImage} className="homepagesign" alt="Wooden Sign" />
          <h2 className="homepagesigntext">Create Lobby</h2>
        </div>
      )}
      {LobbyShowing && props.popupShowing && (
        <LobbyCreationPopup
          lobbyCode={lobbyCode}
          hideLobby={hideLobby}
          setUsername={setUsername}
          setGameSettings={setGameSettings}
          gameSettings={gameSettings}
          username={username}
        />
      )}
    </div>
  );
};

export default SummonLobbyPopup;
