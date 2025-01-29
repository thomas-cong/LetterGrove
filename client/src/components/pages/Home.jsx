import React, { useContext, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useLocation } from "react-router-dom";
import SummonLobbyPopup from "../modules/LobbyCreation/SummonLobbyPopup";
import lettergrovelogo from "../../assets/lettergrovelogo.gif";
import cloudanimation from "../../assets/cloudanimation000.png";
import SummonJoinPopup from "../modules/JoinLobby/SummonJoinPopup";
import SummonCreditsPopup from "../modules/Credits/SummonCreditsPopup";
import SummonHowToPlayPopup from "../modules/HowToPlay/SummonHowToPlayPopup";
import ProfileButton from "../modules/Profile/ProfileButton.jsx";
import CloudAnimation from "../modules/CloudAnimation.jsx";

import "../../utilities.css";
import "./Home.css";
import { UserContext } from "../App";
import "../../assets/font.css";

// Import cloud entering images
import firstBottomLeft from "../../assets/CLOUDENTERING/FIRST_CLOUDENTERING_BOTTOM_LEFT.png";
import firstTopRight from "../../assets/CLOUDENTERING/FIRST_CLOUDENTERING_TOP_RIGHT.png";
import secondBottomLeft from "../../assets/CLOUDENTERING/SECOND_CLOUDENTERING_BOTTOM_LEFT.png";
import secondTopRight from "../../assets/CLOUDENTERING/SECOND_CLOUDENTERING_TOP_RIGHT.png";
import thirdBottomLeft from "../../assets/CLOUDENTERING/THIRD_CLOUDENTERING_BOTTOM_LEFT.png";
import thirdTopRight from "../../assets/CLOUDENTERING/THIRD_CLOUDENTERING_TOP_RIGHT.png";
import lastBottomLeft from "../../assets/CLOUDENTERING/LAST_CLOUDENTERING_BOTTOM_LEFT.png";
import lastTopRight from "../../assets/CLOUDENTERING/LAST_CLOUDENTERING_TOP_RIGHT.png";

const cloudImages = [
  { bottom: firstBottomLeft, top: firstTopRight },
  { bottom: secondBottomLeft, top: secondTopRight },
  { bottom: thirdBottomLeft, top: thirdTopRight },
  { bottom: lastBottomLeft, top: lastTopRight },
];

const Home = () => {
  const location = useLocation();
  const { showCloudAnimation, reverse } = location.state || {};
  // console.log("Navigation state:", location.state);

  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const [showLogo, setShowLogo] = useState(true);
  const [popupShowing, setPopupShowing] = useState(false);

  return (
    <>
      <div className="home-container">
        <div
          className="background-animation"
          style={{ backgroundImage: `url(${cloudanimation})` }}
        ></div>
        <div className="homepagecontent">
          {showLogo && (
            <img src={lettergrovelogo} alt="LetterGrove Logo" className="lettergrove-logo" />
          )}
          {userId && (
            <div className="buttonscontainer">
              <SummonHowToPlayPopup
                onShowHowToPlay={() => setShowLogo(false)}
                onHideHowToPlay={() => setShowLogo(true)}
                popupShowing={popupShowing}
                setPopupShowing={setPopupShowing}
              />
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

              <ProfileButton popupShowing={popupShowing} setPopupShowing={setPopupShowing} />
              <SummonCreditsPopup
                onShowCredits={() => setShowLogo(false)}
                onHideCredits={() => setShowLogo(true)}
                popupShowing={popupShowing}
                setPopupShowing={setPopupShowing}
              />
            </div>
          )}
        </div>
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
      {showCloudAnimation && (
        <CloudAnimation isActive={true} reverse={reverse} cloudImages={cloudImages} />
      )}
    </>
  );
};

export default Home;
