import React from "react";
import "./PlayerStats.css";

const PlayerStats = ({ selectedPlayer, gameResults }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const selectedPlayerData = gameResults?.finalRankings?.find((p) => p.playerId === selectedPlayer);

  return (
    <div className="stats-box">
      <h3>Player Stats</h3>
      {selectedPlayer ? (
        <div className="player-stats">
          <h4>{selectedPlayerData?.username}</h4>
          <div className="stats-content">
            <div className="stat-item">
              <span>Words Formed</span>
              <span>{gameResults?.wordsFormed[selectedPlayer] || 0}</span>
            </div>
            <div className="stat-item">
              <span>Final Score</span>
              <span>{selectedPlayerData?.score || 0} pts</span>
            </div>
            <div className="stat-item">
              <span>Time Played</span>
              <span>{formatTime(gameResults?.timeElapsed || 0)}</span>
            </div>
            <div className="stat-item">
              <span>Score per Word</span>
              <span>
                {(
                  selectedPlayerData?.score / gameResults?.wordsFormed[selectedPlayer] || 0
                ).toFixed(1)}
                pts
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-player-selected">Click a player to view their stats</div>
      )}
    </div>
  );
};

export default PlayerStats;
