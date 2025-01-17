import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import buttonImage from "../../assets/640signs1.png";
import "./SummonLobbyPopup.css";
import LobbyCreationPopup from "./LobbyCreationPopup";
import "../../assets/font.css";

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
    powerUps: [], // array
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
  };
  // handles hiding the button by state update
  const hideLobby = () => {
    setLobbyShowing(false);
    setLobbyCode("");
    setUsername("");
    props.onHideLobby && props.onHideLobby();
  };
  useEffect(() => {
    console.log("username: ", username);
  }, [username]);

  // Conditionally render either the create game button or the damn lobby creation popup
  return (
    <div>
      {!LobbyShowing && (
        <div onClick={showLobby} className="button-container">
          <img src={buttonImage} className="sign" alt="Wooden Sign" />
          <h2 className="text">Create Lobby</h2>
        </div>
      )}
      {LobbyShowing && (
        <LobbyCreationPopup
          lobbyCode={lobbyCode}
          hideLobby={hideLobby}
          setUsername={setUsername}
          setGameSettings={setGameSettings}
          gameSettings={gameSettings}
        />
      )}
    </div>
  );
};

export default SummonLobbyPopup;
