import React from "react";
import { useNavigate } from "react-router-dom";
import shortSign from "../../../assets/320signs_1.png";
import { post } from "../../../utilities";
import "./StartLobbyButton.css";

const StartLobbyButton = (props) => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = React.useState(false); // Set to true for testing
  const [alertMessage, setAlertMessage] = React.useState(""); // Test message

  const handleClick = () => {
    console.log("Game Settings:", props.gameSettings);
    if (props.username === "") {
      props.setAlertMessage("A username is required to create a lobby!");
      props.setShowAlert(true);
      return;
    }

    console.log("Attempting to create lobby with settings:", props.gameSettings);
    post("/api/openLobby", {
      lobbyCode: props.lobbyCode,
      gameSettings: props.gameSettings,
      username: props.username,
    })
      .then((result) => {
        setShowAlert(false);
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
          setAlertMessage("Please log in to create a lobby.");
          setShowAlert(true);
        } else {
          setAlertMessage("Failed to create lobby. Please try again.");
          setShowAlert(true);
        }
      });
  };

  return (
    <div>
      <div onClick={handleClick} className="start-lobby-container">
        <img src={shortSign} alt="Start Lobby" style={{ cursor: "pointer" }} />
        <h2 className="startlobbytext">Start Lobby</h2>
      </div>
    </div>
  );
};

export default StartLobbyButton;
