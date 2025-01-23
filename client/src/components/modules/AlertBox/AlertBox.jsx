import React, { useEffect, useState } from "react";
import "./AlertBox.css";
import alertSign from "../../../assets/AlertBox.png";
import closeButton from "../../../assets/Closebutton.png";
import confusionShiba from "../../../assets/confusionshiba.png";

// @param {message} message to be displayed
// @param {showAlert} boolean to show the alert
// @param {setShowAlert} setter for show alert
// @param {timeout} timeout to hide the alert (milliseconds)
const AlertBox = (props) => {
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handleHide();
      }
    };

    document.addEventListener("keydown", handleEscape);

    // Add timeout to hide alert
    const timeoutId = setTimeout(handleHide, props.timeout || 3000);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      clearTimeout(timeoutId);
    };
  }, [props.timeout]);

  const handleHide = () => {
    if (!isHiding) {
      setIsHiding(true);
      setTimeout(() => {
        props.setShowAlert(false);
      }, 800); // Match the animation duration
    }
  };

  return (
    <div className={`alert-box ${isHiding ? 'hiding' : ''}`}>
      <img src={alertSign} alt="Alert Sign" className="alert-sign" />
      <img src={confusionShiba} alt="Confusion Shiba" className="confusion-shiba" />
      <p>{props.message}</p>
    </div>
  );
};

export default AlertBox;
