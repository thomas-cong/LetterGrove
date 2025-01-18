import React, { useState } from "react";
import Closebutton from "../../assets/Closebutton.png";
import "./LobbyCreationPopup.css";
import LobbySettings from "./LobbySettings";
import StartLobbyButton from "./StartLobbyButton";

const LobbyCreationPopup = (props) => {
  return (
    <div className="createdmainboard">
      <div className="center">
      <img src={Closebutton} onClick={() => props.hideLobby()} className="createdcloseButton" />
        <div className = "createdlobbyandusername">
          <h3>
            <span style={{ color: 'rgb(94, 129, 255)' }}>YOUR LOBBY CODE IS: </span>
            <span className="lobby-code" style={{ color: 'white' }}>{props.lobbyCode}</span>
          </h3>
          <input
            type="text"
            placeholder="Enter your username"
            className="username-input"
            onChange={(event) => props.setUsername(event.target.value)}
          />
        </div>

        <div className = "createdmaincontent">
          <span>
            <LobbySettings gameSettings={props.gameSettings} setGameSettings={props.setGameSettings} />
          </span>
          <span>
            <StartLobbyButton
              lobbyCode={props.lobbyCode}
              gameSettings={props.gameSettings}
              setGameSettings={props.setGameSettings}
              username={props.username}
            />
          </span>
        </div>

      </div>
    </div>
  );
};
export default LobbyCreationPopup;
