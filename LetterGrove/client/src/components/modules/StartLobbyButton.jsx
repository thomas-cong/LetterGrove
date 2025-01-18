import React from "react";
import { useNavigate } from "react-router-dom";
import shortSign from "../../assets/320signs_0.png";
import { post } from "../../utilities";
import "./StartLobbyButton.css";

const StartLobbyButton = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const gameSettings = {
      minWordLength: props.gameSettings.minWordLength,
      pointsModifier: props.gameSettings.pointsModifier,
      mode: props.gameSettings.mode,
      steps: props.gameSettings.steps,
      defaultLetters: props.gameSettings.defaultLetters,
    };

    console.log("Attempting to create lobby with settings:", props.gameSettings);
    post("/api/openLobby", {
      lobbyCode: props.lobbyCode,
      gameSettings: props.gameSettings,
      username: props.username,
    })
      .then((result) => {
        console.log("Server response:", result);
        if (result.message === "Lobby Created") {
          // Lobby was created successfully
          props.onLobbyCreated && props.onLobbyCreated();
          // Navigate to the lobby page
          navigate(`/${props.lobbyCode}`);
        }
      })
      .catch((error) => {
        console.log("Error creating lobby:", error);
        // Handle the error (e.g., show an error message to the user)
        if (error.status === 401) {
          alert("Please log in to create a lobby");
        } else {
          alert("Failed to create lobby. Please try again.");
        }
      });
  };

  return (
    <div onClick={handleClick} className="start-lobby-container">
      <img src={shortSign} alt="Start Lobby" style={{ cursor: "pointer" }} />
      <h2 className="text">Start Lobby</h2>
    </div>
  );
};

export default StartLobbyButton;
