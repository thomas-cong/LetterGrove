import React, { useState } from "react";
import buttonImage from "../../../assets/640signs_3.png";
import "../../../assets/font.css";
import CreditsPopup from "./CreditsPopup";
import "./SummonCreditsPopup.css";

/**
 * SummonCreditsPopup is a component for bringing up the credits popup
 *
 * Proptypes
 * @param {popUpShowing} whether any global popup is showing on menu
 * @param {setPopupShowing} setter for whether any global popup is showing on menu
 */

const SummonCreditsPopup = (props) => {
  const [showCredits, setShowCredits] = useState(false);

  const openCredits = () => {
    props.setPopupShowing(true);
    setShowCredits(true);
    props.onShowCredits && props.onShowCredits();
  };

  const closeCredits = () => {
    props.setPopupShowing(false);
    setShowCredits(false);
    props.onHideCredits && props.onHideCredits();
  };

  return (
    <div>
      {!showCredits && !props.popupShowing && (
        <div onClick={openCredits} className="button-container">
          <img src={buttonImage} className="summoncreditspopupsign" alt="Wooden Sign" />
          <h2 className="summoncreditspopuptext">Credits</h2>
        </div>
      )}
      {props.popupShowing && showCredits && (
        <CreditsPopup hideCredits={closeCredits} setPopupShowing={props.setPopupShowing} />
      )}
    </div>
  );
};

export default SummonCreditsPopup;
