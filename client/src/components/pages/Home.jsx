import React, { useContext, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import SummonLobbyPopup from "../modules/LobbyCreation/SummonLobbyPopup";
import lettergrovelogo from "../../assets/lettergrovelogo.gif";
import cloudanimation from "../../assets/cloudanimation000.png";
import SummonJoinPopup from "../modules/JoinLobby/SummonJoinPopup";
import SummonCreditsPopup from "../modules/Credits/SummonCreditsPopup";

import "../../utilities.css";
import "./Home.css";
import { UserContext } from "../App";
import "../../assets/font.css";

const Home = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const [showLogo, setShowLogo] = useState(true);
  const [popupShowing, setPopupShowing] = useState(false);

  return (
    <div className="home-container">
      <div
        className="background-animation"
        style={{ backgroundImage: `url(${cloudanimation})` }}
      ></div>
      {showLogo && (
        <img src={lettergrovelogo} alt="LetterGrove Logo" className="lettergrove-logo" />
      )}
      {userId && (
        <div className="buttonscontainer">
          <SummonLobbyPopup
            onShowLobby={() => setShowLogo(false)}
            onHideLobby={() => setShowLogo(true)}
            popupShowing={popupShowing}
            setPopupShowing={setPopupShowing}
          />
          <SummonJoinPopup
            onShowJoin={() => setShowLogo(false)}
            onHideJoin={() => setShowLogo(true)}
            popupShowing={popupShowing}
            setPopupShowing={setPopupShowing}
          />
          <SummonCreditsPopup
            onShowCredits={() => setShowLogo(false)}
            onHideCredits={() => setShowLogo(true)}
            popupShowing={popupShowing}
            setPopupShowing={setPopupShowing}
          />
        </div>
      )}
      <div>
        {userId && !popupShowing ? (
          <div
            className="home-logoutbutton-container"
            onClick={() => {
              googleLogout();
              handleLogout();
            }}
          >
            <div className="home-logoutButton">
              <div className="logouttext">Logout</div>
            </div>
          </div>
        ) : !userId ? (
          <div className="google-login-container">
            <GoogleLogin onSuccess={handleLogin} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
