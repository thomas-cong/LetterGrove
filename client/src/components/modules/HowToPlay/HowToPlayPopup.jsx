import React from "react";
import "./HowToPlayPopup.css";
import GameComponent from "../GameComponent/GameComponent";

const HowToPlayPopup = ({ lobbyCode, userId }) => {
  return (
    <div className="howtoplay-container">
      <GameComponent lobbyCode={lobbyCode} userId={userId} isTutorial={true} />
    </div>
  );
};

export default HowToPlayPopup;
