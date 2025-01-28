import React, { useState, useEffect } from "react";
import "./GameEndPopup.css";
import PlayerDisplay from "../../PlayerDisplay";
import PlayerStats from "./PlayerStats";
import testProfilePicture from "../../../../assets/TestingPFP.png";

const GameEndPopup = (props) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    console.log("Game End Popup:", props);
  }, []);

  return (
    <div className="game-end-overlay">
      <div className="game-end-popup">
        <div className="game-end-content">
          <div className="rankings-box">
            <h3>Final Rankings</h3>
            <div className="final-rankings-list">
              {props.endGameInfo?.results?.finalRankings?.map((player, index) => (
                <div
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
  );
};

export default GameEndPopup;
