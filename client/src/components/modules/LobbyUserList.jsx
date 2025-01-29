import React from "react";
import { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import { socket } from "../../client-socket";
import PlayerDisplay from "../modules/PlayerDisplay.jsx";

/**
 * LobbyPlayerList is a component that represents a list of players in a lobby
 *
 * @param {Object} props
 * @param {string} props.userId - Current user's ID
 */
const LobbyUserList = (props) => {
  const [usernameList, setUsernameList] = useState([]);
  useEffect(() => {
    get("/api/isGameStarted", { lobbyCode: props.lobbyCode }).then((res) => {
      if (!res.gameStarted) {
        console.log("no, from lobbyuserlist");
        socket.emit("join socket", { lobbyCode: props.lobbyCode, userId: props.userId });
      }
    });
    const handleSocketJoinedGame = () => {};
    socket.on("socket joined game", handleSocketJoinedGame);
    const handleUpdateLobbyUserList = (players) => {
      let tempUsernameList = [];
      for (let userId in players) {
        tempUsernameList.push({
          playerId: userId,
          username: players[userId],
        });
      }
      setUsernameList(tempUsernameList);
    };
    socket.on("update lobby user list", handleUpdateLobbyUserList);
    return () => {
      socket.off("update lobby user list", handleUpdateLobbyUserList);
      socket.off("socket joined game", handleSocketJoinedGame);
    };
  }, []);

  return (
    <div>
      {usernameList.map((player, index) => (
        <PlayerDisplay
          key={index}
          name={player.username}
          playerId={player.playerId}
          currentUserId={props.userId}
        />
      ))}
    </div>
  );
};

export default LobbyUserList;
