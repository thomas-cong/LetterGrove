import React from "react";
import "./PlayerDisplay.css";
import RankingSlip from "../../assets/Rankings_Slip.png";

/**
 * Component to display a player's information
 * @param {string} props.name - Player's name
 * @param {string} props.profilePicture - URL of the player's profile picture
 * @param {string} props.playerId - Player's ID
 * @param {string} props.currentUserId - Current user's ID
 * @param {boolean} props.isRankingSlip - Whether to use ranking slip
 */
const PlayerDisplay = (props) => {
  const isCurrentUser = props.playerId === props.currentUserId;
  const className = `playerDisplay ${isCurrentUser ? "current-user" : ""} ${
    props.isRankingSlip ? "ranking-slip" : ""
  }`.trim();

  return (
    <div className={className}>
      <img src={props.profilePicture} alt="Profile Picture" className="profilePicture" />
      <p className="playerName">{props.name}</p>
    </div>
  );
};

export default PlayerDisplay;
