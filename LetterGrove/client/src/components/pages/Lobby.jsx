import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../utilities.css";
import "../../assets/font.css";
import LobbyUserList from "../modules/LobbyUserList.jsx";

const Lobby = () => {
  let { lobbyId } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // TODO: Replace with actual API call to get users
    setUsers(["Player 1", "Player 2", "Player 3", "Player 4", "Player 5"]);
  }, []);

  return (
    <div>
      <h2>Lobby Code: {lobbyId}</h2>
      <LobbyUserList userList={users} />
    </div>
  );
};

export default Lobby;
