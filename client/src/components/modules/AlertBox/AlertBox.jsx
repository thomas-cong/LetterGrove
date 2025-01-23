import React from "react";
import "./AlertBox.css";
import alertSign from "../../../assets/AlertBox.png";
import closeButton from "../../../assets/Closebutton.png";
import confusionShiba from "../../../assets/confusionshiba.png";

// @param {message} message to be displayed
// @param {showAlert} boolean to show the alert
// @param {setShowAlert} setter for show alert
const AlertBox = (props) => {
  return (
    <div className="alert-box">
      <img src={alertSign} alt="Alert Sign" className="alert-sign" />
      <img src={confusionShiba} alt="Confusion Shiba" className="confusion-shiba" />
      <p>{props.message}</p>
      <img
        src={closeButton}
        alt="Close Button"
        className="close-button"
        onClick={() => props.setShowAlert(false)}
      />
    </div>
  );
};

export default AlertBox;
