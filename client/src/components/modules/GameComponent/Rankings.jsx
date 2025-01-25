import React from "react";
import PlayerDisplay from "../../modules/PlayerDisplay";
import testProfilePicture from "../../../assets/TestingPFP.png";
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
      <div className="rankings-title">Rankings</div>
      {rankings &&
        rankings.map((player, index) => (
          <PlayerDisplay
            key={index}
            name={`${player.username} - ${player.score} pts`}
            profilePicture={testProfilePicture}
            playerId={player.playerId}
            currentUserId={currentUserId}
            isRankingSlip={true}
          />
        ))}
    </div>
  );
};

export default Rankings;
