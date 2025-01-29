import React, { useState, useEffect } from "react";
import { get } from "../../../utilities";
import "./BasicInfo.css";
import ProfilePicture from "./ProfilePicture";
import ProfilePictureEditor from "./ProfilePictureEditor";
import { useNavigate, useParams } from "react-router-dom";

const BasicInfo = ({ userStats, identifier, currentUserId }) => {
  const [pfp, setPfp] = useState({
    default: true,
  });
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    if (identifier) {
      get("/api/userProfilePicture", { userId: identifier }).then((pfp) => {
        setPfp(pfp);
      });
    }
  }, [identifier]);

  const handlePfpUpdate = (newPfp) => {
    setPfp(newPfp);
  };

  return (
    <div className="profile-basic">
      <div className="profile-header">
        <ProfilePicture pfp={pfp} className="profile-picture" />
        {currentUserId === identifier && (
          <button className="edit-pfp-button" onClick={() => setShowEditor(true)}>
            Change Profile Picture
          </button>
        )}
        <div className="profile-name">{userStats.name}</div>
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
          <span>{userStats.games_played === 0 ? 0 : ((userStats.wins / userStats.games_played) * 100).toFixed(1)}%</span>
        </div>
      </div>

      {showEditor && (
        <ProfilePictureEditor
          initialPfp={pfp}
          userId={identifier}
          onClose={() => setShowEditor(false)}
          onUpdate={handlePfpUpdate}
        />
      )}
    </div>
  );
};

export default BasicInfo;
