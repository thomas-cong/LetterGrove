import React, { useState } from "react";
import { get } from "../../../utilities";
import buttonImage from "../../../assets/640signs_1.png";
import "./SummonLobbyPopup.css";
import LobbyCreationPopup from "./LobbyCreationPopup";
import BoardSelection from "./BoardSelection";
import "../../../assets/font.css";

/**
 * SummonLobbyPopup is a component for bringing up the lobby creation popup
 *
 * Proptypes
 * @param {popUpShowing} whether any global popup is showing on menu
 * @param {setPopupShowing} setter for whether any global popup is showing on menu
 */

const SummonLobbyPopup = (props) => {
  const [LobbyShowing, setLobbyShowing] = useState(false);
  const [showBoardSelection, setShowBoardSelection] = useState(false);
  const [lobbyCode, setLobbyCode] = useState("");
  const [username, setUsername] = useState("");

  const [gameSettings, setGameSettings] = useState({
    minWordLength: 3, // int
    mode: "Time", // string
    steps: 180, // int
    difficulty: "Easy", // slider
    sameBoard: true, // boolean
  });

  // handles showing the board selection by state update
  const showSelection = () => {
    setShowBoardSelection(true);
    props.onShowLobby && props.onShowLobby();
    props.setPopupShowing(true);
  };

  // handles board type selection
  const handleBoardSelect = (isSameBoard) => {
    setGameSettings(prev => ({
      ...prev,
      sameBoard: isSameBoard
    }));
    setShowBoardSelection(false);
    
    // After selecting board type, generate lobby code and show lobby popup
    get("/api/generateLobbyCode")
      .then((code) => {
        setLobbyCode(code.lobbyCodeGenerated);
        console.log(code);
      })
      .catch(setLobbyCode("ERROR"));
    setLobbyShowing(true);
  };

  // handles hiding all popups
  const hideLobby = () => {
    setShowBoardSelection(false);
    setLobbyShowing(false);
    setLobbyCode("");
    setUsername("");
    props.onHideLobby && props.onHideLobby();
    props.setPopupShowing(false);
  };

  return (
    <div>
      {!LobbyShowing && !showBoardSelection && !props.popupShowing && (
        <div onClick={showSelection} className="button-container">
          <img src={buttonImage} className="homepagesign" alt="Wooden Sign" />
          <h2 className="homepagesigntext">Create Lobby</h2>
        </div>
      )}

      {showBoardSelection && props.popupShowing && (
        <BoardSelection
          onClose={hideLobby}
          onSelect={handleBoardSelect}
        />
      )}

      {LobbyShowing && props.popupShowing && (
        <LobbyCreationPopup
          lobbyCode={lobbyCode}
          hideLobby={hideLobby}
          setUsername={setUsername}
          setGameSettings={setGameSettings}
          gameSettings={gameSettings}
          username={username}
        />
      )}
    </div>
  );
};

export default SummonLobbyPopup;
