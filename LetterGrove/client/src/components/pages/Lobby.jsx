import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "../../utilities.css";
import "../../assets/font.css";
import SettingsDisplay from "../modules/SettingsDisplay.jsx";
import LobbyUserList from "../modules/LobbyUserList.jsx";
import { get } from "../../utilities";
import { socket } from "../../client-socket";

const Lobby = () => {
  let { lobbyId } = useParams();
  const [u_id, setU_id] = useState("");

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
    <div>
      <h2>Lobby Code: {lobbyId}</h2>
      <LobbyUserList lobbyCode={lobbyId} />
      <SettingsDisplay lobbyCode={lobbyId} />
    </div>
  );
};

export default Lobby;
