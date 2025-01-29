import React from "react";
import { Link } from "react-router-dom";
import "./PlayerStats.css";

const PlayerStats = ({ selectedPlayer, gameResults }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // console.log("selectedPlayer:", selectedPlayer);
  // console.log("gameResults:", gameResults);

  const selectedPlayerData = gameResults?.finalRankings?.find((p) => p.playerId === selectedPlayer);
  // console.log("selectedPlayerData:", selectedPlayerData);

  return (
    <div className="stats-box">
      <h3 style={{ color: "var(--primary)" }}>Player Stats</h3>
      {selectedPlayer ? (
        <div className="player-stats">
          <h4>
            <Link
              to={`/profile/${selectedPlayer}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--primary--dim)",
                textDecoration: "underline",
                textUnderlineOffset: "2px",
              }}
            >
              <div className="playerlink">{selectedPlayerData?.username}</div>
            </Link>
          </h4>
          <div className="stats-content">
          <div className="stat-item">
              <span style={{ color: "#666" }}>Match Time</span>
              <span style={{ color: "var(--primary--dim)" }}>{formatTime(gameResults?.timeElapsed || 0)}</span>
            </div>
            <div className="stat-item">
              <span style={{ color: "#666" }}>Words Formed</span>
              <span style={{ color: "var(--primary--dim)" }}>{gameResults?.wordsFormed[selectedPlayer] || 0}</span>
            </div>
            <div className="stat-item">
              <span style={{ color: "#666" }}>Final Score</span>
              <span style={{ color: "var(--primary--dim)" }}>{selectedPlayerData?.score || 0} pts</span>
            </div>
            <div className="stat-item">
              <span style={{ color: "#666" }}>Score per Word</span>
              <span style={{ color: "var(--primary--dim)" }}>
                {(selectedPlayerData?.score / gameResults?.wordsFormed[selectedPlayer] || 0).toFixed(1)} pts
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
