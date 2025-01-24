import React, { useState, useEffect } from "react";
import { socket } from "../../../client-socket.js";
import ConfirmImage from "../../../assets/Confirm.png";
import AlertBox from "../AlertBox/AlertBox";
import "./WordInput.css";

/**
 * WordInput Component - Handles word input and submission for the game
 *
 * @param {Object} props
 * @param {string} props.word - Current word in the input field
 * @param {Function} props.setWord - Function to update the word state
 * @param {number} props.x - X coordinate of the selected endpoint
 * @param {number} props.y - Y coordinate of the selected endpoint
 * @param {string} props.lobbyCode - Current game lobby identifier
 * @param {boolean} props.endpointSelected - Whether a valid endpoint tile is selected
 * @param {Array} props.suggestions - Array of word suggestions currently on the board
 */
const WordInput = (props) => {
  const [placeholder, setPlaceholder] = useState("Enter a word");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  /**
   * Handles word submission when Enter Button is pressed
   * Only submits if an endpoint is selected
   * Emits the word and coordinates to the server and clears the input
   */
  const handleEnter = () => {
    console.log(props.endpointSelected);
    if (!props.endpointSelected) {
      setAlertMessage("Select an endpoint first...");
      setShowAlert(true);
      return;
    }

    console.log("Submitting word:", props.word);
    socket.emit("enter word", {
      lobbyCode: props.lobbyCode,
      x: props.selectedX,
      y: props.selectedY,
      word: props.word,
      board: props.board,
    });
  };

  /**
   * Updates placeholder text based on endpoint selection status
   * Provides feedback to user about whether they can submit a word
   */
  useEffect(() => {
    if (props.endpointSelected) {
      setPlaceholder("Enter a word");
    } else {
      setPlaceholder("Select an endpoint first...");
    }
  }, [props.endpointSelected]);

  return (
    <div className="gamecompwordinput">
      {showAlert && (
        <AlertBox message={alertMessage} setShowAlert={setShowAlert} timeout={2500} />
      )}
      <div className="input-group">
        <div className="word-input-container">
          <input
            type="text"
            value={props.word}
            onChange={(e) => props.setWord(e.target.value.toUpperCase())}
            placeholder={placeholder}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleEnter();
              }
            }}
          />
        </div>
        <div className="confirm-button" onClick={handleEnter}>
          <img src={ConfirmImage} alt="Confirm" />
        </div>
      </div>
    </div>
  );
};

export default WordInput;
