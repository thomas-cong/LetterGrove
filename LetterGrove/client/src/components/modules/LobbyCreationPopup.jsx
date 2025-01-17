import React, { useState } from "react";
import Closebutton from "../../assets/Closebutton.png";
import "./LobbyCreationPopup.css";
import LobbySettings from "./LobbySettings";
import StartLobbyButton from "./StartLobbyButton";

const LobbyCreationPopup = (props) => {
  return (
    <div className="mainboard">
      <div className="center">
      <img src={Closebutton} onClick={() => props.hideLobby()} className="closeButton" />
        <div className = "lobbyandusername">
          <h3>YOUR LOBBY CODE IS: {props.lobbyCode}</h3>
          <input
            type="text"
            placeholder="Enter your username"
            className="username-input"
            onChange={(event) => props.setUsername(event.target.value)}
          />
        </div>

        <div className = "maincontent">
          <span>
            <LobbySettings gameSettings={props.gameSettings} setGameSettings={props.setGameSettings} />
          </span>
          <span>
            <StartLobbyButton
              lobbyCode={props.lobbyCode}
              gameSettings={props.gameSettings}
              setGameSettings={props.setGameSettings}
            />
          </span>
        </div>

      </div>
    </div>
  );
};
export default LobbyCreationPopup;
