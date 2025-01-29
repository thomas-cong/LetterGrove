import React, { useState, useEffect } from "react";
import { get } from "../../../utilities";
import "./BasicInfo.css";
import ProfilePicture from "./ProfilePicture";

const BasicInfo = ({ userStats }) => {
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    setProfilePicture({
      Accessory: 0,
      Hair: 0,
      Eyes: 0,
      Face: 0,
      Shirt: 0
    })
    // if (userStats._id) {
    //   get("/api/userProfilePicture", { userId: userStats._id }).then((pfp) => {
    //     setProfilePicture(pfp);
    //   });
    // }
  }, [userStats._id]);

  return (
    <div className="profile-basic">
      <div className="profile-header">
        <ProfilePicture profilePicture={profilePicture} className="profile-picture" />
        {/* <h2 className="profile-name">{userStats.name}</h2> */}
      </div>
      <div className="profile-stats-basic">
        <div className="stat-item">
          <label>Time Played</label>
          <span>
            {Math.floor(userStats.timePlayed / 3600)}h{" "}
            {Math.floor((userStats.timePlayed % 3600) / 60)}m{" "}
            {userStats.timePlayed % 60}s
          </span>
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
