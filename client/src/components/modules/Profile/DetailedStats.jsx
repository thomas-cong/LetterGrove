import React from "react";

const DetailedStats = ({ userStats }) => {
  return (
    <div className="profile-detailed">
      <h3>Player Stats</h3>
      <div className="detailed-stats">
        <div className="stat-row">
          <div className="stat-box">
            <label>Total Points</label>
            <span>{userStats.points}</span>
          </div>
          <div className="stat-box">
            <label>Words Formed</label>
            <span>{userStats.words}</span>
          </div>
        </div>
        <div className="stat-row">
          <div className="stat-box">
            <label>Letters Collected</label>
            <span>{userStats.letters}</span>
          </div>
          <div className="stat-box">
            <label>Powerups Used</label>
            <span>{userStats.powerups}</span>
          </div>
        </div>
        <div className="stat-box full-width">
          <label>Score per Word</label>
          <span>{(userStats.points / userStats.words || 0).toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailedStats;
