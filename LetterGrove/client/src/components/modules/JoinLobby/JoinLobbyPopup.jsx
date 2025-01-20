import React from "react";
import Closebutton from "../../../assets/closebutton.png";
import "./JoinLobbyPopup.css";
import { post } from "../../../utilities";
import { useNavigate } from "react-router-dom";
import shortSign from "../../../assets/320signs_0.png";

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
  const navigate = useNavigate();

  return (
    <div className="mainboard">
      <img src={Closebutton} onClick={() => props.hideJoin()} className="closeButton" />
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
      <div
        className="join-lobby-container"
        onClick={() => {
          post("/api/joinLobby", {
            lobbyCode: props.lobbyCode,
            username: props.username,
          })
            .then((result) => {
              console.log("Joining lobby:", props.lobbyCode, "as", props.username);
            })
            .catch((error) => {
              console.log("Error joining lobby:", error);
            });
          navigate(`/${props.lobbyCode}`);
        }}
      >
        <img src={shortSign} alt="Start Lobby" style={{ cursor: "pointer" }} />
        <h2 className="joinlobbytext">Join Lobby</h2>
      </div>
    </div>
  );
};

export default JoinLobbyPopup;
