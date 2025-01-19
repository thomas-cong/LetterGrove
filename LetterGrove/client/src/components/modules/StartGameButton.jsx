import React, { useState } from "react";
import shortSign from "../../assets/320signs_2.png";
import { post } from "../../utilities";
import CloudAnimation from "./CloudAnimation";

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
    post("/api/startGame", { lobbyCode: props.lobbyCode }).then((res) => {
      console.log(res);
      // Wait for animation to complete before changing view
      setTimeout(() => {
        props.setShowLobby(false);
      }, 2500); // Increased duration to account for all layers
    });
  };

  return (
    <div>
      <CloudAnimation isActive={showAnimation} cloudImages={cloudImages} />
      <img src={shortSign} onClick={handleClick} className="sign" alt="Wooden Sign" />
      <h2>Start Game</h2>
    </div>
  );
};

export default StartGameButton;
