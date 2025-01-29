import React, { useEffect, useState } from "react";
import "./PlayerDisplay.css";
import RankingSlip from "../../assets/Rankings_Slip.png";
import { get } from "../../utilities";
import ProfilePicture from "./Profile/ProfilePicture";

/**
 * Component to display a player's information
 * @param {string} props.name - Player's name
 * @param {string} props.score - Player's score
 * @param {string} props.pfp - URL of the player's profile picture
 * @param {string} props.playerId - Player's ID
 * @param {string} props.currentUserId - Current user's ID
 * @param {boolean} props.isRankingSlip - Whether to use ranking slip
 */
const PlayerDisplay = (props) => {
  const [pfp, setProfilePicture] = useState("");
  const isCurrentUser = props.playerId === props.currentUserId;
  const className = `playerDisplay ${isCurrentUser ? "current-user" : ""} ${
    props.isRankingSlip ? "ranking-slip" : ""
  }`.trim();
  useEffect(() => {
    console.log("PlayerDisplay playerId:", props.playerId);
    if (props.playerId) {
      get("/api/userProfilePicture", { userId: props.playerId }).then((pfp) => {
        console.log("PlayerDisplay pfp:", pfp);
        console.log("Received profile picture:", pfp);
        setProfilePicture(pfp);
      });
    }
  }, [props.playerId]);

  return (
    <div className={className}>
      <ProfilePicture pfp={pfp} className="pfp" />
      <div className="playerInfo">
        {props.isSpecialCase ? 
        <p className="playerName specialCase">{props.name}</p> :
        <p className="playerName">{props.name}</p>}
        {props.score && <p className="playerName">{props.score}</p>}
      </div>
    </div>
  );
};

export default PlayerDisplay;
