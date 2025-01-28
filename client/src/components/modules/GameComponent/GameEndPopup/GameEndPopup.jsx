import React, { useState, useEffect } from "react";
import "./GameEndPopup.css";
import PlayerDisplay from "../../PlayerDisplay";
import PlayerStats from "./PlayerStats";
import testProfilePicture from "../../../../assets/TestingPFP.png";
import closeButton from "../../../../assets/Closebutton.png";
import { useNavigate } from "react-router-dom";
import CloudAnimation from "../../CloudAnimation.jsx";

// Import cloud entering images
import firstBottomLeft from "../../../../assets/CLOUDENTERING/FIRST_CLOUDENTERING_BOTTOM_LEFT.png";
import firstTopRight from "../../../../assets/CLOUDENTERING/FIRST_CLOUDENTERING_TOP_RIGHT.png";
import secondBottomLeft from "../../../../assets/CLOUDENTERING/SECOND_CLOUDENTERING_BOTTOM_LEFT.png";
import secondTopRight from "../../../../assets/CLOUDENTERING/SECOND_CLOUDENTERING_TOP_RIGHT.png";
import thirdBottomLeft from "../../../../assets/CLOUDENTERING/THIRD_CLOUDENTERING_BOTTOM_LEFT.png";
import thirdTopRight from "../../../../assets/CLOUDENTERING/THIRD_CLOUDENTERING_TOP_RIGHT.png";
import lastBottomLeft from "../../../../assets/CLOUDENTERING/LAST_CLOUDENTERING_BOTTOM_LEFT.png";
import lastTopRight from "../../../../assets/CLOUDENTERING/LAST_CLOUDENTERING_TOP_RIGHT.png";

const cloudImages = [
  { bottom: firstBottomLeft, top: firstTopRight },
  { bottom: secondBottomLeft, top: secondTopRight },
  { bottom: thirdBottomLeft, top: thirdTopRight },
  { bottom: lastBottomLeft, top: lastTopRight },
];

// @props.isTutorial - is tutorial game

const GameEndPopup = (props) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showCloud, setShowCloud] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [reverseAnimation, setReverseAnimation] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setIsClosing(true);
    // Start fade out
    setTimeout(() => {
      // After fade out, show cloud animation
      setShowCloud(true);
      // After cloud animation, navigate
      setTimeout(() => {
        setReverseAnimation(true);
        navigate("/");
      }, 1500); // Increased time to ensure cloud animation completes
    }, 500);
  };

  return (
    <>
      <div className={`game-end-overlay ${isClosing ? "fade-out" : ""}`}>
        <div className={`game-end-popup ${isClosing ? "fade-out" : ""}`}>
          <img src={closeButton} alt="Close" className="close-button" onClick={handleClose} />
          <div className="game-end-content">
            <div className="final-rankings-box">
              <h3 style={{ color: "var(--primary)" }}>Final Rankings</h3>
              <div className="final-rankings-list">
                {props.endGameInfo?.results?.finalRankings?.map((player, index) => (
                  <div
                    key={player.playerId}
                    className={`final-ranking-item ${
                      selectedPlayer === player.playerId ? "selected" : ""
                    }`}
                    onClick={() => setSelectedPlayer(player.playerId)}
                  >
                    <span className="rank">{index + 1}</span>
                    <PlayerDisplay
                      playerId={player.playerId}
                      currentUserId={props.currentUserId}
                      name={player.username}
                      profilePicture={testProfilePicture}
                    />
                    <span className="score">{player.score} pts</span>
                  </div>
                ))}
              </div>
            </div>

            <PlayerStats selectedPlayer={selectedPlayer} gameResults={props.endGameInfo?.results} />
          </div>
        </div>
      </div>
      {showCloud && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 9999, // Increased z-index to be above everything
          }}
        >
          <CloudAnimation isActive={true} reverse={reverseAnimation} cloudImages={cloudImages} />
        </div>
      )}
    </>
  );
};

export default GameEndPopup;
