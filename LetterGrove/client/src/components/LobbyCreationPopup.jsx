import React, { useState } from "react";
import Closebutton from "../assets/Closebutton.png";
import "./LobbyCreationPopup.css";
import LobbySettings from "./LobbySettings";

const LobbyCreationPopup = (props) => {
  return (
    <div className="center">
      <div>
        <img src={Closebutton} onClick={() => props.hideLobby()} className="closeButton" />
        <h3> Your lobby code is: {props.lobbyCode}</h3>
        <input
          type="text"
          placeholder="Enter your username"
          onChange={(event) => props.setUsername(event.target.value)}
        ></input>
      </div>
      <span>
        <LobbySettings gameSettings={props.gameSettings} setGameSettings={props.setGameSettings} />
      </span>
    </div>
  );
};
export default LobbyCreationPopup;
