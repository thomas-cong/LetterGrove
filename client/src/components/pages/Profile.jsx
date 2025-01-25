import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../App.jsx";
import { get } from "../../utilities";
import { useParams } from "react-router-dom";
import BasicInfo from "../modules/Profile/BasicInfo";
import DetailedStats from "../modules/Profile/DetailedStats";
import MatchHistory from "../modules/Profile/MatchHistory";
import "./Profile.css";

const Profile = () => {
  const { identifier } = useParams();
  const [userStats, setUserStats] = useState(null);
  const [matchHistory, setMatchHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (identifier) {
      get("/api/user", { userId: identifier }).then((stats) => {
        setUserStats(stats);
        setLoading(false);
      });
      
      get("/api/matches", { userId: identifier }).then((matches) => {
        setMatchHistory(matches);
      });
    }
  }, [identifier]);

  if (loading || !userStats) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-top">
        <BasicInfo userStats={userStats} />
        <DetailedStats userStats={userStats} />
      </div>
      <MatchHistory matches={matchHistory} />
    </div>
  );
};

export default Profile;
