import React from "react";
/**
 *  LobbyPlayerList is a component that represents a list of players in a lobby
 *
 * Proptypes
 * @param {userList} list of users in the lobby
 */

const LobbyUserList = (props) => {
  return (
    <div>
      <ul>
        {props.userList.map((userList, index) => (
          <li key={index}>{userList}</li>
        ))}
      </ul>
    </div>
  );
};
export default LobbyUserList;
