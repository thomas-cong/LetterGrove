import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "../../utilities.css";
import "../../assets/font.css";
import "./Lobby.css";
import waitingSign from "../../assets/320signs_2.png";
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
  const [reverseAnimation, setReverseAnimation] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [tooltipText, setTooltipText] = useState("Click to Copy!");
  const [socketJoined, setSocketJoined] = useState(false);

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
      get("/api/isGameStarted", { lobbyCode: lobbyId}).then((res) => {
        if (!res.gameStarted) {
          socket.emit("join socket", { lobbyCode: lobbyId, userId: user._id });
        }
      })
      setSocketJoined(true);
    });
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
    get("/api/isGameStarted", { lobbyCode: lobbyId }).then((res) => {
      console.log(res.gameStarted);
      if (res.gameStarted) {
        setLobbyState("game");
      }
    });
    get("/api/isLobbyOwner", { lobbyCode: lobbyId }).then((res) => {
      console.log(res);
      setShowButton(res);
    });
  }, []);

  useEffect(() => {
    get("/api/lobbyCheck", { lobbyCode: lobbyId }).catch((err) => {
      window.location.href = "/LobbyNotFound";
    });

    const handleLobbyToGame = () => {
      console.log("received lobby to game transition");
      setShowAnimation(true);
      setReverseAnimation(false);

      setTimeout(() => {
        post("/api/startGame", { lobbyCode: lobbyId });
      }, 0);

      // socket.on("game started", )

      setTimeout(() => {
        setLobbyState("game");
      }, 1000);

      setTimeout(() => {
        setReverseAnimation(true);
      }, 1500);
    };
    socket.on("lobby to game transition", handleLobbyToGame);

    return () => {
      socket.off("lobby to game transition", handleLobbyToGame);
    };
  }, []);

  const startGameRequest = () => {
    // setShowAnimation(true);
    // setReverseAnimation(false);

    // setTimeout(() => {
    //   setLobbyState("game");
    //   post("/api/startGame", { lobbyCode: lobbyId });
    // }, 1300);

    // setTimeout(() => {
    //   setReverseAnimation(true);
    // }, 1500);
  };

  // useEffect(() => {
  //   socket.on("initial game", () => {
  //     console.log("initial game received, playing animation");
  //     setShowCloudAnimation(true);
  //     setShowAnimation(true);
  //     setShowReverseAnimation(false);
  //     setTimeout(() => {
  //       setLobbyState("game");
  //     }, 1000);
  //     setTimeout(() => {
  //       setShowCloudAnimation(false);
  //       setShowAnimation(false);
  //       setShowReverseAnimation(true);
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

  return (
    <>
      {lobbyState === "lobby" && (
        <div className="lobby-container">
          <div className="lobby-content">
            <div
              className="lobby-code"
              onClick={() => {
                navigator.clipboard.writeText(lobbyId);
                setTooltipText("Copied!");
                setTimeout(() => {
                  setTooltipText("Click to Copy!");
                }, 2000);
              }}
              style={{ cursor: "pointer" }}
            >
              Lobby Code: {lobbyId}
              <div className="copy-tooltip">{tooltipText}</div>
            </div>
            <div className="lobby-sections">
              <div className="lobby-section">
                <div style={{ color: "var(--primary)", fontSize: "40px", alignSelf: "center" }}>PLAYERS</div>
                <LobbyUserList lobbyCode={lobbyId} userId={u_id} />
              </div>
              <div className="lobby-section">
                <div style={{ color: "var(--primary)", fontSize: "40px", alignSelf: "center" }}>GAME SETTINGS</div>
                <SettingsDisplay lobbyCode={lobbyId} />
              </div>
            </div>
            {showButton && (
              <div className="start-button-container">
                <StartGameButton
                  lobbyCode={lobbyId}
                  setLobbyState={setLobbyState}
                  lobbyState={lobbyState}
                  startGameRequest={startGameRequest}
                />
              </div>
            )}
            {!showButton && (
              <div className="waiting-button">
                <div className="waiting-sign-container">
                  <img src={waitingSign} className="waiting-sign" alt="Wooden Sign" />
                  <h2 className="waiting-sign-text">
                    Waiting
                    <span className="dot-1">.</span>
                    <span className="dot-2">.</span>
                    <span className="dot-3">.</span>
                  </h2>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <CloudAnimation
        isActive={showAnimation}
        cloudImages={cloudImages}
        reverse={reverseAnimation}
      />
      {lobbyState === "game" && u_id !== "" && (
        <div>
          <GameComponent
            lobbyCode={lobbyId}
            setLobbyState={setLobbyState}
            lobbyState={lobbyState}
            userId={u_id}
          />
        </div>
      )}
      {lobbyState === "end" && <GameEndPopup />}
    </>
  );
};

export default Lobby;
