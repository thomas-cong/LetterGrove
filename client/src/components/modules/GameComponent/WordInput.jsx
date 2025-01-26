import React, { useState, useEffect, useRef } from "react";
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
  const inputRef = useRef(null);

  /**
   * Handles word submission when Enter Button is pressed
   * Only submits if an endpoint is selected
   * Emits the word and coordinates to the server and clears the input
   */
  const handleKeyPress = () => {
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

  // Focus input when endpoint is selected
  useEffect(() => {
    if (props.endpointSelected && inputRef.current) {
      inputRef.current.focus();
    }
  }, [props.selectedX, props.selectedY]);

  useEffect(() => {
    const handleGlobalKeyPress = (event) => {
      if (inputRef.current && document.activeElement !== inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleGlobalKeyPress);

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyPress);
    };
  }, []);

  useEffect(() => {
    // Focus the input when component mounts
    inputRef.current?.focus();

    // Add event listener to refocus when focus is lost
    const handleFocusOut = () => {
      inputRef.current?.focus();
    };

    document.addEventListener("click", handleFocusOut);

    // Cleanup event listener
    return () => {
      document.removeEventListener("click", handleFocusOut);
    };
  }, []);

  useEffect(() => {
    const handleInvalidWord = (info) => {
      console.log("Invalid word:", info);
      setAlertMessage(info.error);
      setShowAlert(true);
    };
    socket.on("invalid word", handleInvalidWord);

    return () => {
      socket.off("invalid word", handleInvalidWord);
    };
  }, []);

  return (
    <div className="gamecompwordinput">
      {showAlert && <AlertBox message={alertMessage} setShowAlert={setShowAlert} timeout={2500} />}
      <div className="input-group">
        <div className="word-input-container">
          <input
            ref={inputRef}
            type="text"
            value={props.word}
            disabled={props.isTurn === false}
            onChange={(e) => {
              props.setWord(e.target.value.toUpperCase());
              console.log(props.endpointSelected);
              if (!props.endpointSelected) {
                setAlertMessage("Select an endpoint first...");
                setShowAlert(true);
                return;
              }
              socket.emit("enter word", {
                lobbyCode: props.lobbyCode,
                x: props.selectedX,
                y: props.selectedY,
                word: e.target.value.toUpperCase(),
                board: props.board,
              });
            }}
            placeholder={placeholder}
            className="word-input"
            autoFocus
          />
        </div>
        {/* <div className="confirm-button" onClick={handleEnter}>
          <img src={ConfirmImage} alt="Confirm" />
        </div> */}
      </div>
    </div>
  );
};

export default WordInput;
