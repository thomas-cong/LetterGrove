import React from "react";
import { useState, useEffect } from "react";
import { get, post } from "../../utilities";
/**
 *  LobbyPlayerList is a component that represents a list of players in a lobby
 *
 * Proptypes
 * @param {userList} list of users in the lobby
 */

const LobbyUserList = (props) => {
  const [usernameList, setUsernameList] = useState([]);
  useEffect(() => {
    console.log("User list created:");
    get("/api/usernames", { lobbyCode: props.lobbyCode }).then((players) => {
      console.log("Players in lobby:", players);
      setUsernameList(players);
    });
  }, []);
  return (
    <div>
      <h3>Users in Lobby</h3>

      <ul>
        {usernameList.map((username, index) => (
          <li key={index}>{username}</li>
        ))}
      </ul>
    </div>
  );
};
export default LobbyUserList;
