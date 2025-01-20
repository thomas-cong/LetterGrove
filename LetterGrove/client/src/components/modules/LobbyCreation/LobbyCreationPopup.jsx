import React, { useState } from "react";
import Closebutton from "../../../assets/Closebutton.png";
import "./LobbyCreationPopup.css";
import LobbySettings from "./LobbySettings";
import StartLobbyButton from "./StartLobbyButton";

const LobbyCreationPopup = (props) => {
  return (
    <div className="createdmainboard">
      <img src={Closebutton} onClick={() => props.hideLobby()} className="createdcloseButton" />
      <div>
          <div style={{ color: "rgb(94, 129, 255)", fontSize: "40px" }}>YOUR LOBBY CODE IS: </div>
          <div className="lobbycreationlobbycode">{props.lobbyCode}</div>
          <div style={{ marginBottom: "20px" }}></div>
        <input
          type="text"
          placeholder="Enter your username"
          className="createdusername-input"
          onChange={(event) => {
            props.setUsername(event.target.value);
          }}
        />
      </div>

      <div>
        <LobbySettings gameSettings={props.gameSettings} setGameSettings={props.setGameSettings} />
      </div>
      <div>
        <StartLobbyButton
          lobbyCode={props.lobbyCode}
          gameSettings={props.gameSettings}
          setGameSettings={props.setGameSettings}
          username={props.username}
        />
      </div>
    </div>
  );
};
export default LobbyCreationPopup;
