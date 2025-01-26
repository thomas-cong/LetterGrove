import React from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App.jsx";
import { useContext } from "react";
import buttonImage from "../../../assets/640signs_3.png";
import "../JoinLobby/SummonJoinPopup.css";

const ProfileButton = (props) => {
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);

  const handleClick = () => {
    if (userId) {
      props.setShowLogo && props.setShowLogo(false);
      navigate(`/profile/${userId}`);
    }
  };

  return (
    <div onClick={handleClick} className="button-container">
      <img src={buttonImage} className="homepagesign" alt="Wooden Sign" />
      <h2 className="homepagesigntext">Profile</h2>
    </div>
  );
};

export default ProfileButton;
