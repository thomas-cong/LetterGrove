import React from "react";
import { useParams, Link } from "react-router-dom";

const MatchHistory = ({ matches }) => {
  const { identifier } = useParams();
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Split matches into left and right columns
  const leftColumnMatches = matches.filter((_, index) => index % 2 === 0);
  const rightColumnMatches = matches.filter((_, index) => index % 2 === 1);

  const renderMatch = (match, index) => (
    <div key={index} className="match-card">
      <div className="match-header">
        <div className="match-result">
          <span className={match.won ? "victory" : "defeat"}>
            {match.won ? "Victory" : "Defeat"}
          </span>
          <div className="match-info">
            <span className={`match-mode-tag mode-${match.mode?.toLowerCase() || 'unknown'}`}>
              {match.mode || 'Unknown Mode'}
            </span>
            <span className={`match-difficulty-tag difficulty-${match.difficulty?.toLowerCase() || 'unknown'}`}>
              {match.difficulty || 'Unknown Difficulty'}
            </span>
          </div>
        </div>
        <span className="match-date">
          {new Date(match.date).toLocaleDateString()}
        </span>
      </div>
      
      <div className="match-stats">
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
          <span>{formatTime(match.duration)}</span>
        </div>
      </div>

      <div className="match-rankings">
        <div className="rankings-header">Final Rankings</div>
        <div className="rankings-list">
          {match.finalRankings.map((player, idx) => (
            <div key={idx} className="ranking-row">
              <span className="rank">#{idx + 1}</span>
              <Link 
                to={`/profile/${player.playerId}`}
                className={`player-name ${player.playerId === identifier ? 'profile-user' : ''}`}
              >
                {player.username}
              </Link>
              <span className="player-score">{player.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="match-history">
      <h3>Recent Matches</h3>
      <div className="match-list">
        <div className="match-column">
          {leftColumnMatches.map(renderMatch)}
        </div>
        <div className="match-column">
          {rightColumnMatches.map(renderMatch)}
        </div>
      </div>
    </div>
  );
};

export default MatchHistory;
