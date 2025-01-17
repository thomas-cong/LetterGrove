import React from "react";
import shortSign from "../../assets/sign(320by64).png";
import { post } from "../../utilities";

const StartLobbyButton = (props) => {
  const handleClick = () => {
    console.log("Attempting to create lobby with settings:", props.gameSettings);
    post("/api/openLobby", { 
      lobbyCode: props.lobbyCode, 
      gameSettings: props.gameSettings, 
      username: props.username 
    })
    .then((result) => {
      console.log("Server response:", result);
      if (result.message === "Lobby Created") {
        // Lobby was created successfully
        props.onLobbyCreated && props.onLobbyCreated();
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
    <div>
      <img 
        src={shortSign} 
        onClick={handleClick} 
        alt="Start Lobby"
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
};

export default StartLobbyButton;
