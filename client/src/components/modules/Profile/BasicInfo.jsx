
import React from "react";
import "./BasicInfo.css";

const BasicInfo = ({ userStats }) => {
  return (
    <div className="profile-basic">
      <div className="profile-header">
        <img 
          src={userStats.profilePicture || "default-avatar.png"} 
          alt="Profile" 
          className="profile-picture"
        />
        <h2 className="profile-name">{userStats.name}</h2>
      </div>
      <div className="profile-stats-basic">
        <div className="stat-item">
          <label>Time Played</label>
          <span>{Math.floor(userStats.timePlayed / 3660)}h {Math.floor(userStats.timePlayed / 60)}m {userStats.timePlayed % 60}s</span>
        </div>
        <div className="stat-item">
          <label>Games Played</label>
          <span>{userStats.games_played}</span>
        </div>
        <div className="stat-item">
          <label>Win Rate</label>
          <span>{((userStats.wins / userStats.games_played) * 100).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
