import React from "react";
import PlayerDisplay from "../../modules/PlayerDisplay";
import "./Rankings.css";

/**
 * Rankings component displays the current rankings of players in the game
 *
 * @param {Object} props
 * @param {Array} props.rankings - Array of player rankings with usernames and scores
 * @param {string} props.currentUserId - Current user's ID
 */
const Rankings = ({ rankings = [], currentUserId }) => {
  return (
    <div className="rankings-container">
      <div className="rankings-box">
        <div className="rankings-title">Rankings</div>
        {rankings &&
          rankings.map((player, index) => (
            <div key={index} className="ranking-slip-container">
              <PlayerDisplay
                name={`${player.username} - ${player.score} pts`}
                playerId={player.playerId}
                currentUserId={currentUserId}
                isRankingSlip={true}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Rankings;
