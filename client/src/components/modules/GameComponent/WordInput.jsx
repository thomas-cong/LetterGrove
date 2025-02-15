import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../../client-socket.js";
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
 * @param {string} props.AlertMessage - Message to display in the alert box
 * @param {boolean} props.showAlert - Whether to show the alert box
 */
const WordInput = (props) => {
  const [placeholder, setPlaceholder] = useState("Enter a word");
  const [alertMessage, setAlertMessage] = useState("");
  const inputRef = useRef(null);

  /**
   * Handles word submission when Enter Button is pressed
   * Only submits if an endpoint is selected
   * Emits the word and coordinates to the server and clears the input
   */
  const handleKeyPress = () => {
    // console.log(props.endpointSelected);
    if (!props.endpointSelected) {
      setAlertMessage("Select a golden tile first...");
      setShowAlert(true);
      return;
    }

    // console.log("Submitting word:", props.word);
    if (socket) {
      socket.emit("enter word", {
        lobbyCode: props.lobbyCode,
        x: props.selectedX,
        y: props.selectedY,
        word: props.word,
        board: props.board,
      });
    }
  };

  /**
   * Updates placeholder text based on endpoint selection status
   * Provides feedback to user about whether they can submit a word
   */
  useEffect(() => {
    if (props.endpointSelected) {
      setPlaceholder("Enter a word");
    } else {
      setPlaceholder("Select a golden tile first...");
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
      // console.log("Invalid word:", info);
      props.setAlertMessage(info.error);
      props.setShowAlert(true);
      // Keep focus on input and clear the word
      inputRef.current?.focus();
    };
    socket.on("invalid word", handleInvalidWord);

    return () => {
      socket.off("invalid word", handleInvalidWord);
    };
  }, [props.setWord]);

  return (
    <div className="gamecompwordinput">
      <div className="input-group">
        <div className="word-input-container">
          <input
            ref={inputRef}
            type="text"
            value={props.word}
            disabled={props.isTurn === false}
            onChange={(e) => {
              // Only allow letters
              const lettersOnly = e.target.value.replace(/[^A-Za-z]/g, "");
              if (lettersOnly !== e.target.value) {
                return; // Don't update if non-letters were entered
              }

              props.setWord(lettersOnly.toUpperCase());
              // console.log(props.endpointSelected);
              if (!props.endpointSelected) {
                props.setAlertMessage("Select a golden tile first...");
                props.setShowAlert(true);
                return;
              }
              socket.emit("enter word", {
                lobbyCode: props.lobbyCode,
                x: props.selectedX,
                y: props.selectedY,
                word: lettersOnly.toUpperCase(),
                board: props.board,
              });
            }}
            placeholder={placeholder}
            className="word-input"
            autoFocus
            pattern="[A-Za-z]*"
          />
        </div>
      </div>
    </div>
  );
};

export default WordInput;
