import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Board from "../GameComponent/Board";

// Temporarily use a simple SVG icon since we might not have the board.png asset
const BoardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{color: 'currentColor'}}>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
    <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="2"/>
    <line x1="3" y1="15" x2="21" y2="15" stroke="currentColor" strokeWidth="2"/>
    <line x1="9" y1="3" x2="9" y2="21" stroke="currentColor" strokeWidth="2"/>
    <line x1="15" y1="3" x2="15" y2="21" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const MatchHistory = ({ matches }) => {
  const { identifier } = useParams();
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [selectedEndpoints, setSelectedEndpoints] = useState(null);
  
  useEffect(() => {
    console.log("MatchHistory mounted with matches:", matches);
    if (matches && matches.length > 0) {
      console.log("First match:", matches[0]);
      console.log("First match boards:", matches[0].boards);
      console.log("First match final rankings:", matches[0].finalRankings);
      if (matches[0].finalRankings) {
        const firstPlayer = matches[0].finalRankings[0];
        console.log("First player:", firstPlayer);
        console.log("Board for first player:", matches[0].boards?.[firstPlayer.playerId]);
      }
    }
  }, [matches]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Split matches into left and right columns
  const leftColumnMatches = matches.filter((_, index) => index % 2 === 0);
  const rightColumnMatches = matches.filter((_, index) => index % 2 === 1);

  const handleBoardClick = (match, playerId) => {
    console.log("Clicked board for player:", playerId);
    console.log("Match:", match);
    console.log("Match boards:", match.boards);
    console.log("Match endpoints:", match.endpoints);
    const boardState = match.boards?.[playerId];
    const endpointState = match.endpoints?.[playerId];
    console.log("Raw endpoint state:", endpointState);
    
    if (boardState && Array.isArray(boardState) && boardState.length > 0) {
      console.log("Found board state:", boardState);
      if (endpointState && Array.isArray(endpointState)) {
        console.log("Found endpoint state:", endpointState);
        // Make sure endpoints are in the correct format: [[x, y], [x, y], ...]
        const formattedEndpoints = endpointState.map(endpoint => {
          // If endpoint is already an array of [x, y], use it as is
          if (Array.isArray(endpoint) && endpoint.length === 2) {
            return endpoint;
          }
          // If endpoint is an object with x and y properties, convert to array
          if (endpoint.x !== undefined && endpoint.y !== undefined) {
            return [endpoint.x, endpoint.y];
          }
          return null;
        }).filter(Boolean);
        console.log("Formatted endpoints:", formattedEndpoints);
        setSelectedEndpoints(formattedEndpoints);
      } else {
        console.log("No valid endpoint state found:", endpointState);
        setSelectedEndpoints([]);
      }
      setSelectedBoard(boardState);
      setSelectedPlayerId(playerId);
    } else {
      console.log("No valid board state found for player");
    }
  };

  const renderMatch = (match, index) => {
    console.log(`Rendering match ${index}:`, match);
    return (
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
            <span>{match.words?.length || 0}</span>
          </div>
          <div className="match-stat">
            <label>Time</label>
            <span>{formatTime(match.duration)}</span>
          </div>
        </div>

        <div className="match-rankings">
          <div className="rankings-header">Final Rankings</div>
          <div className="rankings-list">
            {match.finalRankings.map((player, idx) => {
              console.log(`Player ${idx} in match ${index}:`, player);
              console.log(`Checking for board state:`, {
                hasBoards: !!match.boards,
                playerBoard: match.boards ? match.boards[player.playerId] : null,
                playerId: player.playerId
              });
              return (
                <div key={idx} className="ranking-row">
                  <span className="rank">#{idx + 1}</span>
                  <Link 
                    to={`/profile/${player.playerId}`}
                    className={`player-name ${player.playerId === identifier ? 'profile-user' : ''}`}
                  >
                    {player.username}
                  </Link>
                  <div className="player-score-container">
                    <span className="player-score">{player.score}</span>
                    {match.boards && 
                     match.boards[player.playerId] && 
                     Array.isArray(match.boards[player.playerId]) && 
                     match.boards[player.playerId].length > 0 && (
                      <button
                        className="board-icon-button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleBoardClick(match, player.playerId);
                        }}
                        title="View final board"
                      >
                        <BoardIcon />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

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
      
      {selectedBoard && (
        <div className="board-overlay" onClick={() => setSelectedBoard(null)}>
          <div className="board-modal" onClick={(e) => e.stopPropagation()}>
            <div className="board-modal-header">
              <h4>Final Board State</h4>
              <button className="close-button" onClick={() => setSelectedBoard(null)}>×</button>
            </div>
            <Board 
              board={selectedBoard}
              endpoints={selectedEndpoints ? selectedEndpoints : []}
              endPointSelected={false}
              setEndPointSelected={() => {}}
              selectedX={-1}
              selectedY={-1}
              setSelectedX={() => {}}
              setSelectedY={() => {}}
              setSuggestions={() => {}}
              setWord={() => {}}
              word=""
              isTurn={true}
              suggestions={[]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchHistory;
