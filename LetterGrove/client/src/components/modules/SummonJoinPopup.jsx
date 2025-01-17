import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import buttonImage from "../../assets/640signs0.png";
import LobbyCreationPopup from "./LobbyCreationPopup";
import "../../assets/font.css";
import "./SummonJoinPopup.css";
import JoinLobbyPopup from "./JoinLobbyPopup";
/**
 * SummonJoinPopup is a component for bringing up the lobby joining popup
 *
 * Proptypes
 * @param {popUpShowing} whether any global popup is showing on menu
 * @param {setPopupShowing} setter for whether any global popup is showing on menu
 */

const SummonJoinPopup = (props) => {
  const [username, setUsername] = useState("");
  const [lobbyCode, setLobbyCode] = useState("");
  const [showJoinPopup, setShowJoinPopup] = useState(false);

  const openJoin = () => {
    props.setPopupShowing(true);
    setShowJoinPopup(true);
    props.onShowJoin && props.onShowJoin();
  };

  const closeJoin = () => {
    props.setPopupShowing(false);
    setShowJoinPopup(false);
    setUsername("");
    setLobbyCode("");
    props.onHideJoin && props.onHideJoin();
  };

  return (
    <div>
      {!showJoinPopup && !props.popupShowing && (
        <div onClick={openJoin} className="button-container">
          <img src={buttonImage} className="sign" alt="Wooden Sign" />
          <h2>Join a Lobby</h2>
        </div>
      )}
      {props.popupShowing && showJoinPopup && (
        <JoinLobbyPopup
          username={username}
          setUsername={setUsername}
          lobbyCode={lobbyCode}
          setLobbyCode={setLobbyCode}
          hideJoin={closeJoin}
          setPopupShowing={props.setPopupShowing}
        />
      )}
    </div>
  );
};

export default SummonJoinPopup;
