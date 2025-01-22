import React from "react";
import { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import { socket } from "../../client-socket";
/**
 *  LobbyPlayerList is a component that represents a list of players in a lobby
 *
 * Proptypes
 * @param {userList} list of users in the lobby
 */

const LobbyUserList = (props) => {
  const [usernameList, setUsernameList] = useState([]);
  useEffect(() => {
    const handleUpdateLobbyUserList = (players) => {
      let tempUsernameList = [];
      for (let userId in players) {
        tempUsernameList.push(players[userId]);
      }
      setUsernameList(tempUsernameList);
    };
    socket.on("update lobby user list", handleUpdateLobbyUserList);
    return () => {
      socket.off("update lobby user list", handleUpdateLobbyUserList);
    };
  }, []);

  // useEffect(() => {
  //   console.log("User list created:");
  //   get("/api/usernames", { lobbyCode: props.lobbyCode }).then((players) => {
  //     console.log("Players in lobby:", players);
  //     setUsernameList(players);
  //   });
  // }, []);
  return (
    <div>
      <ul>
        {usernameList.map((username, index) => (
          <li key={index}>{username}</li>
        ))}
      </ul>
    </div>
  );
};
export default LobbyUserList;
