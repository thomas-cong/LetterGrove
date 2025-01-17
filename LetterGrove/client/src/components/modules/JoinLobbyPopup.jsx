import React from "react";
import Closebutton from "../../assets/closebutton.png";
import "./JoinLobbyPopup.css";
/**
 * JoinLobbyPopup is a component that represents username input and lobby code input
 *
 * Proptypes
 * @param {username} username of the player
 * @param {setUsername} setter for username
 * @param {lobbyCode} lobby code of the player
 * @param {setLobbyCode} setter for lobby code
 * @param {hideJoin} function to hide the join lobby popup
 */

const JoinLobbyPopup = (props) => {
  return (
    <div className="mainboard">
      <div className="center">
        <img src={Closebutton} onClick={() => props.hideJoin()} className="closeButton" />
        <div className="lobbyandusername">
          <input
            type="text"
            placeholder="Lobby Code"
            value={props.lobbyCode}
            onChange={(e) => props.setLobbyCode(e.target.value)}
            className="username-input"
          />
          <input
            type="text"
            placeholder="Username"
            value={props.username}
            onChange={(e) => props.setUsername(e.target.value)}
            className="username-input"
          />
        </div>

        <div className="maincontent">
          <button
            onClick={() => {
              // TODO: Add join lobby logic here
              console.log("Joining lobby:", props.lobbyCode, "as", props.username);
            }}
          >
            Join Lobby
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinLobbyPopup;
