import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../utilities.css";
import "../../assets/font.css";
import LobbyUserList from "../modules/LobbyUserList.jsx";
import { get } from "../../utilities";

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
    });
  }

  return (
    <div>
      <h2>Lobby Code: {lobbyId}</h2>
      <LobbyUserList userList={[]} />
    </div>
  );
};

export default Lobby;
