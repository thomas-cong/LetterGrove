import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App.jsx";
import { useContext } from "react";
import buttonImage from "../../../assets/640signs_3.png";
import "../JoinLobby/SummonJoinPopup.css";

const ProfileButton = (props) => {
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);
  const [showProfile, setShowProfile] = useState(false);

  const handleClick = () => {
    if (userId) {
      props.setPopupShowing(true);
      setShowProfile(true);
      props.setShowLogo && props.setShowLogo(false);
      navigate(`/profile/${userId}`);
    }
  };

  return (
    <div>
      {!showProfile && !props.popupShowing && (
        <div onClick={handleClick} className="button-container">
          <img src={buttonImage} className="homepagesign" alt="Wooden Sign" />
          <h2 className="homepagesigntext">Profile</h2>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
