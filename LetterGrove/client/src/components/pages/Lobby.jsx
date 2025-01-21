import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "../../utilities.css";
import "../../assets/font.css";
import "./Lobby.css";
import SettingsDisplay from "../modules/SettingsDisplay.jsx";
import LobbyUserList from "../modules/LobbyUserList.jsx";
import StartGameButton from "../modules/StartGameButton.jsx";
import GameComponent from "../modules/GameComponent/GameComponent.jsx";
import { get } from "../../utilities";
import { socket } from "../../client-socket";

const Lobby = () => {
  let { lobbyId } = useParams();
  const [u_id, setU_id] = useState("");
  const [showLobby, setShowLobby] = useState(true);

  // Check auth of user
  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (!user._id) {
        window.location.href = "/";
        console.log("not logged in");
      }
      setU_id(String(user._id));
    });
  }, []);

  if (u_id) {
    get("/api/players", { lobbyCode: lobbyId }).then((players) => {
      let found = false;
      for (const value of players) {
        if (value == u_id) {
          console.log("found it");
          found = true;
        }
      }
      if (!found) {
        window.location.href = "/";
      }
      // Join the lobby room
      socket.emit("join socket", { lobbyCode: lobbyId });
    });
  }
  get("/api/lobbyCheck", { lobbyCode: lobbyId }).catch((err) => {
    window.location.href = "/LobbyNotFound";
  });

  return (
    <>
      {showLobby ? (
        <div className="lobby-container">
          <div className="lobby-content">
            <div className="lobby-code">Lobby Code: {lobbyId}</div>
            <div className="lobby-sections">
              <div className="lobby-section">
                <div style={{ color: "rgb(94, 129, 255)", fontSize: "40px" }}>Players</div>
                <LobbyUserList lobbyCode={lobbyId} />
              </div>
              <div className="lobby-section">
                <div style={{ color: "rgb(94, 129, 255)", fontSize: "40px" }}>Game Settings</div>
                <SettingsDisplay lobbyCode={lobbyId} />
              </div>
            </div>
            <div className="start-button-container">
              <StartGameButton
                lobbyCode={lobbyId}
                setShowLobby={setShowLobby}
                showLobby={showLobby}
              />
            </div>
          </div>
        </div>
      ) : (
        <GameComponent lobbyCode={lobbyId} />
      )}
    </>
  );
};

export default Lobby;
