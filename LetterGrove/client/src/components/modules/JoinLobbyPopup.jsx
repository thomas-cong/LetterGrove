import React from "react";
import Closebutton from "../../assets/closebutton.png";
import "./JoinLobbyPopup.css";
import { post } from "../../utilities";
import { useNavigate } from "react-router-dom";

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
              post("/api/joinLobby", {
                lobbyCode: props.lobbyCode,
                username: props.username,
              })
                .then((result) => {
                  console.log("Joining lobby:", props.lobbyCode, "as", props.username);
                })
                .catch((error) => {
                  // Handle the error (e.g., show an error message to the user)

                  if (error.status === 401) {
                    alert("Please log in to join a lobby");
                  } else if (error.status === 404) {
                    alert("Lobby not found");
                  } else {
                    alert("Failed to join lobby. Please try again.");
                  }
                });
              navigate(`/${props.lobbyCode}`);
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
