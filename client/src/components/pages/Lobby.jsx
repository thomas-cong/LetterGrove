import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "../../utilities.css";
import "../../assets/font.css";
import "./Lobby.css";
import SettingsDisplay from "../modules/SettingsDisplay.jsx";
import LobbyUserList from "../modules/LobbyUserList.jsx";
import StartGameButton from "../modules/StartGameButton.jsx";
import GameComponent from "../modules/GameComponent/GameComponent.jsx";
import GameEndPopup from "../modules/GameComponent/GameEndPopup/GameEndPopup.jsx";
import CloudAnimation from "../modules/CloudAnimation.jsx";
import { get, post } from "../../utilities.js";
import { socket } from "../../client-socket.js";

// Import cloud entering images
import firstBottomLeft from "../../assets/CLOUDENTERING/FIRST_CLOUDENTERING_BOTTOM_LEFT.png";
import firstTopRight from "../../assets/CLOUDENTERING/FIRST_CLOUDENTERING_TOP_RIGHT.png";
import secondBottomLeft from "../../assets/CLOUDENTERING/SECOND_CLOUDENTERING_BOTTOM_LEFT.png";
import secondTopRight from "../../assets/CLOUDENTERING/SECOND_CLOUDENTERING_TOP_RIGHT.png";
import thirdBottomLeft from "../../assets/CLOUDENTERING/THIRD_CLOUDENTERING_BOTTOM_LEFT.png";
import thirdTopRight from "../../assets/CLOUDENTERING/THIRD_CLOUDENTERING_TOP_RIGHT.png";
import lastBottomLeft from "../../assets/CLOUDENTERING/LAST_CLOUDENTERING_BOTTOM_LEFT.png";
import lastTopRight from "../../assets/CLOUDENTERING/LAST_CLOUDENTERING_TOP_RIGHT.png";

const Lobby = () => {
  let { lobbyId } = useParams();

  const [u_id, setU_id] = useState("");
  const [lobbyState, setLobbyState] = useState("lobby");
  const [showAnimation, setShowAnimation] = useState(false);
  const [showCloudAnimation, setShowCloudAnimation] = useState(false);

  const cloudImages = [
    { bottom: firstBottomLeft, top: firstTopRight },
    { bottom: secondBottomLeft, top: secondTopRight },
    { bottom: thirdBottomLeft, top: thirdTopRight },
    { bottom: lastBottomLeft, top: lastTopRight },
  ];

  // Check auth of user
  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (!user._id) {
        window.location.href = "/";
        console.log("not logged in");
      }
      setU_id(String(user._id));
      // Join the socket room for this lobby
      socket.emit("join socket", { lobbyCode: lobbyId });
    });
  }, []);

  useEffect(() => {
    const handleLobbyToGame = () => {
      console.log("received lobby to game transition");
      setShowCloudAnimation(true);
      setShowAnimation(true);
      setTimeout(() => {
        setLobbyState("game");
      }, 1000);
      setTimeout(() => {
        post("/api/startGame", { lobbyCode: lobbyId });
      }, 1300);
      setTimeout(() => {
        setShowCloudAnimation(false);
      }, 1500);
    };
    socket.on("lobby to game transition", handleLobbyToGame);

    return () => {
      socket.off("lobby to game transition", handleLobbyToGame);
    };
  }, []);

  const startGameRequest = () => {
    setShowCloudAnimation(true);
    setShowAnimation(true);
    setTimeout(() => {
      setLobbyState("game");
    }, 1000);
    setTimeout(() => {
      post("/api/startGame", { lobbyCode: lobbyId });
    }, 1300);
    setTimeout(() => {
      setShowCloudAnimation(false);
    }, 1500);
  }

  // useEffect(() => {
  //   socket.on("initial game", () => {
  //     console.log("initial game received, playing animation");
  //     setShowCloudAnimation(true);
  //     setShowAnimation(true);
  //     setTimeout(() => {
  //       setLobbyState("game");
  //     }, 1000);
  //     setTimeout(() => {
  //       setShowCloudAnimation(false);
  //     }, 1500);

  //     // Wait for animation to complete before changing view
  //     // setTimeout(() => {
  //     //   setLobbyState("game");
  //     // }, 1500);
  //   });

  //   return () => {
  //     socket.off("initial game");
  //   };
  // }, []);

  if (u_id) {
    get("/api/players", { lobbyCode: lobbyId }).then((players) => {
      let found = false;
      for (const value of players) {
        if (value == u_id) {
          console.log("found it");
          found = true;
        }
      }
      if (!found) {
        window.location.href = "/";
      }
    });
  }
  get("/api/lobbyCheck", { lobbyCode: lobbyId }).catch((err) => {
    window.location.href = "/LobbyNotFound";
  });

  return (
    <>
      {lobbyState === "lobby" && (
        <div className="lobby-container">
          <div className="lobby-content">
            <div className="lobby-code">Lobby Code: {lobbyId}</div>
            <div className="lobby-sections">
              <div className="lobby-section">
                <div style={{ color: "rgb(94, 129, 255)", fontSize: "40px" }}>Players</div>
                <LobbyUserList lobbyCode={lobbyId} />
              </div>
              <div className="lobby-section">
                <div style={{ color: "rgb(94, 129, 255)", fontSize: "40px" }}>Game Settings</div>
                <SettingsDisplay lobbyCode={lobbyId} />
              </div>
            </div>
            <div className="start-button-container">
              <StartGameButton
                lobbyCode={lobbyId}
                setLobbyState={setLobbyState}
                lobbyState={lobbyState}
                startGameRequest={startGameRequest}
              />
            </div>
          </div>
        </div>
      )}
      {showCloudAnimation && <CloudAnimation isActive={showAnimation} cloudImages={cloudImages} />}
      {lobbyState === "game" && (<div>
        <GameComponent lobbyCode={lobbyId} setLobbyState={setLobbyState} lobbyState={lobbyState} />
      </div>)}
      {lobbyState === "end" && <GameEndPopup />}
    </>
  );
};

export default Lobby;
