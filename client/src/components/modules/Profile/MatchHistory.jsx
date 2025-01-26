import React from "react";

const MatchHistory = ({ matches }) => {
  return (
    <div className="match-history">
      <h3>Recent Matches</h3>
      <div className="match-grid">
        {matches.map((match, index) => (
          <div key={index} className="match-card">
            <div className="match-header">
              <span className={match.won ? "victory" : "defeat"}>
                {match.won ? "Victory" : "Defeat"}
              </span>
              <span className="match-date">
                {new Date(match.date).toLocaleDateString()}
              </span>
            </div>
            <div className="match-details">
              <div className="match-stat">
                <label>Score</label>
                <span>{match.score}</span>
              </div>
              <div className="match-stat">
                <label>Words</label>
                <span>{match.words}</span>
              </div>
              <div className="match-stat">
                <label>Time</label>
                <span>{Math.floor(match.duration / 60)}:{(match.duration % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchHistory;
