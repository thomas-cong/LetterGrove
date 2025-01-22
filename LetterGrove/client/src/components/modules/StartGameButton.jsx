import React, { useState } from "react";
import shortSign from "../../assets/320signs_2.png";
import { post } from "../../utilities";
import CloudAnimation from "./CloudAnimation";
import "./StartGameButton.css";

// Import cloud entering images
import firstBottomLeft from "../../assets/CLOUDENTERING/FIRST_CLOUDENTERING_BOTTOM_LEFT.png";
import firstTopRight from "../../assets/CLOUDENTERING/FIRST_CLOUDENTERING_TOP_RIGHT.png";
import secondBottomLeft from "../../assets/CLOUDENTERING/SECOND_CLOUDENTERING_BOTTOM_LEFT.png";
import secondTopRight from "../../assets/CLOUDENTERING/SECOND_CLOUDENTERING_TOP_RIGHT.png";
import thirdBottomLeft from "../../assets/CLOUDENTERING/THIRD_CLOUDENTERING_BOTTOM_LEFT.png";
import thirdTopRight from "../../assets/CLOUDENTERING/THIRD_CLOUDENTERING_TOP_RIGHT.png";
import lastBottomLeft from "../../assets/CLOUDENTERING/LAST_CLOUDENTERING_BOTTOM_LEFT.png";
import lastTopRight from "../../assets/CLOUDENTERING/LAST_CLOUDENTERING_TOP_RIGHT.png";

const StartGameButton = (props) => {
  const [showAnimation, setShowAnimation] = useState(false);

  const cloudImages = [
    { bottom: firstBottomLeft, top: firstTopRight },
    { bottom: secondBottomLeft, top: secondTopRight },
    { bottom: thirdBottomLeft, top: thirdTopRight },
    { bottom: lastBottomLeft, top: lastTopRight },
  ];

  const handleClick = () => {
    setShowAnimation(true);
    // Wait for animation to complete before changing view
    setTimeout(() => {
      post("/api/startGame", { lobbyCode: props.lobbyCode });
      props.setShowLobby(false);
    }, 1500); // Increased duration to account for all layers
  };

  return (
    <div className="start-game-button">
      <CloudAnimation isActive={showAnimation} cloudImages={cloudImages} />
      <div className="sign-container" onClick={handleClick}>
        <img src={shortSign} className="sign" alt="Wooden Sign" />
        <h2 className="sign-text">Start Game</h2>
      </div>
    </div>
  );
};

export default StartGameButton;
