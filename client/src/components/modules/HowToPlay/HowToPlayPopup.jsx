import React from "react";
import "./HowToPlayPopup.css";
import closeButton from "../../../assets/closeButton.png";

const HowToPlayPopup = ({ hideHowToPlay, setPopupShowing }) => {
  const handleClose = () => {
    hideHowToPlay();
    setPopupShowing(false);
  };

  return (
    <div className="howtoplay-overlay">
      <div className="howtoplay-popup">
        <img src={closeButton} alt="Close" className="createdcloseButton" onClick={handleClose} />
        <div className="howtoplay-content">
          <h1>How to Play</h1>

          <section>
            <p>
              Create words by connecting letters on the board to score points. The player with the
              most points at the end wins!
            </p>
          </section>

          <section>
            <ul>
              <li>Take turns creating words by connecting adjacent letters</li>
              <li>Words must be at least 3 letters long</li>
              <li>Each letter can only be used once per word</li>
              <li>Words must be valid English words</li>
              <li>The more letters you use, the more points you earn</li>
            </ul>
          </section>

          <section>
            <ul>
              <li>3 letters: 100 points</li>
              <li>4 letters: 200 points</li>
              <li>5 letters: 400 points</li>
              <li>6+ letters: 800 points</li>
            </ul>
          </section>

          <section>
            <ul>
              <li>Look for common prefixes and suffixes</li>
              <li>Plan your moves to set up longer words</li>
              <li>Watch out for your opponents' potential moves</li>
              <li>Try to block high-scoring opportunities from your opponents</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HowToPlayPopup;
