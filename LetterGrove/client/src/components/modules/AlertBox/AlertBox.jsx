import React from "react";
import "./AlertBox.css";
import alertSign from "../../../assets/AlertBox.png";
import closeButton from "../../../assets/closebutton.png";

// @param {message} message to be displayed
// @param {showAlert} boolean to show the alert
// @param {setShowAlert} setter for show alert
const AlertBox = (props) => {
  return (
    <div className="alert-box">
      <img src={alertSign} alt="Alert Sign" className="alert-sign" />
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
