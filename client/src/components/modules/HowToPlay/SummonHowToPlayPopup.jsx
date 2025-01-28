import React, { useState } from "react";
import buttonImage from "../../../assets/640signs_2.png";
import "../../../assets/font.css";
import HowToPlayPopup from "./HowToPlayPopup";
import "../JoinLobby/SummonJoinPopup.css";

/**
 * SummonHowToPlayPopup is a component for bringing up the HowToPlay popup
 *
 * Proptypes
 * @param {popUpShowing} whether any global popup is showing on menu
 * @param {setPopupShowing} setter for whether any global popup is showing on menu
 */

const SummonHowToPlayPopup = (props) => {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const openHowToPlay = () => {
    props.setPopupShowing(true);
    setShowHowToPlay(true);
    props.onShowHowToPlay && props.onShowHowToPlay();
  };

  const closeHowToPlay = () => {
    props.setPopupShowing(false);
    setShowHowToPlay(false);
    props.onHideHowToPlay && props.onHideHowToPlay();
  };

  return (
    <div>
      {!showHowToPlay && !props.popupShowing && (
        <div onClick={openHowToPlay} className="button-container">
          <img src={buttonImage} className="homepagesign" alt="Wooden Sign" />
          <h2 className="homepagesigntext">How To Play</h2>
        </div>
      )}
      {props.popupShowing && showHowToPlay && (
        <HowToPlayPopup hideHowToPlay={closeHowToPlay} setPopupShowing={props.setPopupShowing} />
      )}
    </div>
  );
};

export default SummonHowToPlayPopup;
