import React, { useState } from "react";
import Closebutton from "../../../assets/Closebutton.png";
import "./JoinLobbyPopup.css";
import { post } from "../../../utilities";
import { useNavigate } from "react-router-dom";
import shortSign from "../../../assets/320signs_0.png";
import { socket } from "../../../client-socket";

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
import AlertBox from "../AlertBox/AlertBox";

const JoinLobbyPopup = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      {showAlert && <AlertBox message={alertMessage} setShowAlert={setShowAlert} timeout={1500} />}

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
            if (props.username === "") {
              setAlertMessage("A username is required to join a lobby!");
              setShowAlert(true);
              return;
            }
            socket.emit("join socket", { lobbyCode: props.lobbyCode, userId: props.currentUserId });
            socket.on("socket joined", () => {
              post("/api/joinLobby", {
                lobbyCode: props.lobbyCode,
                username: props.username,
              })
                .then((result) => {
                  setShowAlert(false);
                  console.log("Joining lobby:", props.lobbyCode, "as", props.username);
                  navigate(`/${props.lobbyCode}`);
                })
                .catch((error) => {
                  setAlertMessage("An error has occurred while joining the lobby!");
                  setShowAlert(true);
                });
            });
          }}
        >
          <img src={shortSign} alt="Start Lobby" style={{ cursor: "pointer" }} />
          <h2 className="joinlobbytext">Join Lobby</h2>
        </div>
      </div>
    </div>
  );
};

export default JoinLobbyPopup;
