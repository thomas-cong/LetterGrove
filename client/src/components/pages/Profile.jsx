import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../App.jsx";
import { get } from "../../utilities";
import { useParams, useNavigate } from "react-router-dom";
import BasicInfo from "../modules/Profile/BasicInfo";
import DetailedStats from "../modules/Profile/DetailedStats";
import MatchHistory from "../modules/Profile/MatchHistory";
import ProfileBackground from "../../assets/ProfileBackground.png";
import homebutton from "../../assets/homebutton.png";
import "./Profile.css";

const Profile = () => {
  const { identifier } = useParams();
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState(null);
  const [matchHistory, setMatchHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (identifier) {
      get("/api/user", { userId: identifier }).then((stats) => {
        setUserStats(stats);
        setLoading(false);
      });

      get("/api/completedGames", { userId: identifier }).then((matches) => {
        setMatchHistory(matches);
      });
    }
  }, [identifier]);

  if (loading || !userStats) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <img 
        src={homebutton} 
        alt="Home" 
        className="homebutton" 
        onClick={() => navigate("/")} 
      />
      <div className="profile-content">
        <div className="profile-top">
          <BasicInfo userStats={userStats} />
          <DetailedStats userStats={userStats} />
        </div>
        <MatchHistory matches={matchHistory} />
      </div>
    </div>
  );
};

export default Profile;
