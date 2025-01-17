import React, { useContext, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import SummonLobbyPopup from "../modules/SummonLobbyPopup";
import lettergrovelogo from "../../assets/lettergrovelogo.gif";
import cloudanimation from "../../assets/cloudanimation.gif";

import "../../utilities.css";
import "./Skeleton.css";
import { UserContext } from "../App";
import "../../assets/font.css";

const Skeleton = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const [showLogo, setShowLogo] = useState(true);

  return (
    <div className="skeleton-container">
      <div className="background-animation" style={{ backgroundImage: `url(${cloudanimation})` }}></div>
      {showLogo && <img src={lettergrovelogo} alt="LetterGrove Logo" className="lettergrove-logo" />}
      {userId && <SummonLobbyPopup onShowLobby={() => setShowLogo(false)} onHideLobby={() => setShowLogo(true)} />}
      {userId ? (
        <button
          className="Skeleton-logoutButton"
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <div className="google-login-container">
          <GoogleLogin onSuccess={handleLogin} />
        </div>
      )}
    </div>
  );
};

export default Skeleton;
