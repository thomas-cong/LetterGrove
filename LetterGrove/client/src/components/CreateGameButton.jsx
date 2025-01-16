import React, { useState } from "react";
import { get, post } from "../utilities";
import buttonImage from "../assets/640signs1.png";
import "./CreateGameButton.css";

const CreateGameButton = () => {
  const [LobbyShowing, setLobbyShowing] = useState(false);
  const [lobbyCode, setLobbyCode] = useState("");

  // handles showing the lobby by state update
  const showLobby = () => {
    // Generates an alphanumeric 5 char sequence for the lobby through api request
    get("/api/generateLobbyCode")
      .then((code) => {
        setLobbyCode(code.lobbyId);
        console.log(code);
      })
      .catch(setLobbyCode("ERROR"));
    setLobbyShowing(true);
  };
  // handles hiding the button by state update
  const hideLobby = () => {
    setLobbyShowing(false);
  };

  return (
    <div className="container">
      <img src={buttonImage} onClick={showLobby}></img>
      <h1 className="centered" onClick={showLobby}>
        Create Game
      </h1>
      {LobbyShowing && <button onClick={hideLobby}> Close </button>}
    </div>
  ); //this just a filler button, we want to replace with actual popup tmrw.
};

export default CreateGameButton;
