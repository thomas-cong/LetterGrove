import React, { useState, useEffect } from "react";
import { get, post } from "../../../utilities";
import buttonImage from "../../../assets/640signs_2.png";
import "../../../assets/font.css";
import HowToPlayPopup from "./HowToPlayPopup";
import { socket } from "../../../client-socket";
import "../JoinLobby/SummonJoinPopup.css";

/**
 * SummonHowToPlayPopup is a component for bringing up the tutorial game
 *
 * Proptypes
 * @param {popUpShowing} whether any global popup is showing on menu
 * @param {setPopupShowing} setter for whether any global popup is showing on menu
 * @param {onShowHowToPlay} callback to hide logo when tutorial starts
 * @param {onHideHowToPlay} callback to show logo when tutorial ends
 */
const SummonHowToPlayPopup = (props) => {
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showTutorialGame, setShowTutorialGame] = useState(false);
  const [lobbyCode, setLobbyCode] = useState("");
  const [u_id, setU_id] = useState("");

  const [gameSettings] = useState({
    minWordLength: 3,
    mode: "Words",
    steps: 5,
    difficulty: "Easy",
    sameBoard: false,
  });

  // Get user ID on mount
  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (!user._id) {
        window.location.href = "/";
        console.log("not logged in");
      }
      setU_id(String(user._id));
    });
  }, []);

  // Show tutorial game only after we have a lobby code
  useEffect(() => {
    if (lobbyCode && lobbyCode !== "ERROR") {
      console.log("lobbyCode: ", lobbyCode);
      setShowTutorialGame(true);
      props.setPopupShowing(true);
      props.onShowHowToPlay();
    }
  }, [lobbyCode]);

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      props.setPopupShowing(false);
      props.onHideHowToPlay();
    };
  }, []);

  const closeTutorial = () => {
    props.setPopupShowing(false);
    setShowTutorialGame(false);
    props.onHideHowToPlay();
  };

  const handleClick = (event) => {
    get("/api/generateLobbyCode", { isTutorial: true })
      .then((code) => {
        if (!code || !code.lobbyCodeGenerated) {
          throw new Error("Failed to generate lobby code");
        }
        setLobbyCode(code.lobbyCodeGenerated);
        console.log(code);
        return post("/api/openLobby", {
          lobbyCode: code.lobbyCodeGenerated,
          gameSettings: gameSettings,
          username: "Shiba Inu",
        }).then((info) => {
          console.log("joining socket");
          console.log("u_id: ", u_id);
          socket.emit("join socket", { lobbyCode: code.lobbyCodeGenerated, userId: u_id });
          console.log(info);
          console.log("starting tutorial");
          return post("/api/startTutorial", { lobbyCode: code.lobbyCodeGenerated });
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        setLobbyCode("ERROR");
      });
  };

  return (
    <div>
      {!showTutorialGame && !props.popupShowing && (
        <div onClick={handleClick} className="button-container">
          <img src={buttonImage} className="homepagesign" alt="Wooden Sign" />
          <h2 className="homepagesigntext">How To Play</h2>
        </div>
      )}
      {showTutorialGame && (
        <HowToPlayPopup lobbyCode={lobbyCode} userId={u_id} closeTutorial={closeTutorial} />
      )}
    </div>
  );
};

export default SummonHowToPlayPopup;
