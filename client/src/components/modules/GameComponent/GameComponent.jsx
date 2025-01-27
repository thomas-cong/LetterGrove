import React, { useState, useEffect } from "react";
import { socket } from "../../../client-socket";
import { post, get } from "../../../utilities";
import Board from "./Board";
import WordInput from "./WordInput";
import Counter from "./Counter";
import PointsCounter from "./PointsCounter";
import Rankings from "./Rankings";
import Log from "./Log";
import "./GameComponent.css";
import AlertBox from "../AlertBox/AlertBox";
import TurnDisplay from "./TurnDisplay";
import GameEndPopup from "./GameEndPopup/GameEndPopup.jsx";

const GameComponent = (props) => {
  const [word, setWord] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isTurn, setIsTurn] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [turnUsername, setTurnUsername] = useState("");
  const [showEndGamePopup, setShowEndGamePopup] = useState(false);

  // Game state management
  const [endPointSelected, setEndPointSelected] = useState(true);
  const [selectedX, setSelectedX] = useState(0);
  const [selectedY, setSelectedY] = useState(0);
  const [endpoints, setEndpoints] = useState([[0, 0]]);
  const [lettersUpdated, setLettersUpdated] = useState([]);
  const [cropsUpdated, setCropsUpdated] = useState([]);
  const [gameState, setGameState] = useState({
    lobbyCode: "",
    username: "",
    board: [],
    points: 0,
    powerups: [],
    counter: 0,
    rankings: [],
    log: [],
    endpoints: [],
  });

  //@{params} letters updated
  //@{params} board
  const updateBoard = (params) => {
    console.log(params);
    let updatedLetters = params.lettersUpdated;
    let updatedCrops = [];
    if (params.cropsUpdated) {
      updatedCrops = params.cropsUpdated;
    }

    console.log("Updated letters:");
    console.log(updatedLetters);
    console.log("Updated crops:");
    console.log(updatedCrops);

    // Create a deep copy of the board
    let newBoard = JSON.parse(JSON.stringify(params.board));

    for (let i = 0; i < updatedLetters.length; i++) {
      let x = updatedLetters[i].x;
      let y = updatedLetters[i].y;
      let letter = updatedLetters[i].letter;
      newBoard[y][x] = {
        ...newBoard[y][x], // preserve existing tile properties
        letter: letter,
        crop: null,
        powerUp: null,
        visited: true,
        isSuggestion: false,
        isSuggestionEnd: false,
      };
      if (i === updatedLetters.length - 1) {
        setEndPointSelected(true);
        setSelectedX(x);
        setSelectedY(y);
        setWord("");
      }
    }
    for (let i = 0; i < updatedCrops.length; i++) {
      let x = updatedCrops[i].x;
      let y = updatedCrops[i].y;
      let crop = updatedCrops[i].crop;
      newBoard[y][x] = {
        ...newBoard[y][x], // preserve existing tile properties
        crop: crop,
        isSuggestion: false,
        isSuggestionEnd: false,
      };
    }

    setGameState((prevState) => ({
      ...prevState,
      board: newBoard,
    }));
  };

  // Set up socket listeners
  useEffect(() => {
    console.log("useEffect called");
    socket.emit("join socket", { lobbyCode: props.lobbyCode, userId: props.userId });
    socket.on("socket joined", () => {
      get("/api/currentGame", { lobbyCode: props.lobbyCode, userId: props.userId });
      // Initial game state
      const handleInitialGame = (game) => {
        setGameState(game);
        setEndpoints(game.endpoints);
        setSelectedX(game.endpoints[0][0]);
        setSelectedY(game.endpoints[0][1]);
        console.log("GAME ENDPOINTS" + game.endpoints);
      };

      // User-specific updates (letters, points, endpoints)
      const handleUserUpdate = (info) => {
        // Reset the suggestions since this only plays on user update
        setSuggestions([]);

        console.log("User update:", info);
        setGameState((prevState) => ({
          ...prevState,
          points: info.totalPoints,
        }));
        setLettersUpdated(info.letterUpdates);
        setEndpoints(info.endpoints);
        if (info.cropUpdates) {
          console.log("Updated crops: " + info.cropUpdates);
          setCropsUpdated(info.cropUpdates);
        }
      };

      // Global game updates (rankings, log messages)
      const handleGlobalUpdate = (info) => {
        console.log("Global update:", info);
        let logMessages = [];
        for (const message of info.logMessages) {
          let { userId, username, pointsGained } = message;
          logMessages.push({
            userId: userId,
            username: username,
            pointsGained: pointsGained,
          });
        }
        setGameState((prevState) => ({
          ...prevState,
          rankings: info.updatedRankings,
          log: [...prevState.log, ...logMessages],
        }));
      };

      const handleTurnUpdate = (info) => {
        console.log("Turn update:", info);
        setTurnUsername(info.username); // Set username first
        setTimeout(() => {
          if (info.userId === props.userId) {
            console.log("emiitted username: " + info.username);
            setIsTurn(true);
          } else {
            console.log("emitted id: " + info.userId);
            console.log("props id: " + props.userId);
            setIsTurn(false);
          }
        }, 300);
      };
      // Letter updates
      const handleBoardUpdate = (info) => {
        console.log("Board update:", info);
        setLettersUpdated(info.letterUpdates);
        setCropsUpdated(info.cropUpdates);
      };
      const handleGameOver = () => {
        setShowEndGamePopup(true);
      };

      // Set up listeners
      socket.on("initial game", handleInitialGame);
      socket.on("user update", handleUserUpdate);
      socket.on("global update", handleGlobalUpdate);
      socket.on("turn update", handleTurnUpdate);
      socket.on("board update", handleBoardUpdate);
      socket.on("end game", handleEndGame);
      // Cleanup listeners on unmount
      return () => {
        socket.off("initial game", handleInitialGame);
        socket.off("user update", handleUserUpdate);
        socket.off("global update", handleGlobalUpdate);
        socket.off("turn update", handleTurnUpdate);
        socket.off("board update", handleBoardUpdate);
        socket.off("game over", handleGameOver);
      };
    });
  }, []);

  useEffect(() => {
    updateBoard({
      cropsUpdated: cropsUpdated,
      lettersUpdated: lettersUpdated,
      board: gameState.board,
    });
  }, [lettersUpdated, cropsUpdated]);
  // Add resize handler for board scaling
  useEffect(() => {
    const updateBoardScale = () => {
      const container = document.querySelector(".gamecompleftcontainer");
      const board = document.querySelector(".gamecompboard");
      const wordInput = document.querySelector(".gamecompwordinput");
      if (!container || !board || !wordInput) return;

      const containerWidth = container.clientWidth * 0.9; // 90% of container width for padding
      const boardWidth = board.scrollWidth;

      // Only scale down if board is wider than container
      const scale = boardWidth > containerWidth ? containerWidth / boardWidth : 1;
      board.style.setProperty("--board-scale", scale);

      // Position word input relative to scaled board
      const scaledBoardWidth = boardWidth * scale;
      const boardRect = board.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const leftOffset = (containerRect.width - scaledBoardWidth) / 2;

      // Set the left offset and adjust gap based on scale
      wordInput.style.left = `${leftOffset}px`;
      wordInput.style.top = `${boardRect.bottom + 2 * scale}px`; // 10px gap scaled
    };

    // Initial calculation after a short delay to ensure proper measurements
    const timeoutId = setTimeout(updateBoardScale, 0);

    // Update on window resize
    window.addEventListener("resize", updateBoardScale);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateBoardScale);
    };
  }, [gameState.board]); // Recalculate when board changes

  return (
    <>
      {showAlert && (
        <AlertBox
          message={alertMessage}
          setShowAlert={setShowAlert}
          timeout={1500}
          className="word-input-alert"
        />
      )}

      {showEndGamePopup && <GameEndPopup />}

      <div className="gamecompcontainer">
        <div className="gamecompleftcontainer">
          <div className="gamecompboardcontainer">
            <div className="gamecompboard">
              {!isTurn && <TurnDisplay username={turnUsername} />}
              <Board
                board={gameState.board}
                points={gameState.points}
                username={gameState.username}
                endpoints={endpoints}
                endPointSelected={endPointSelected}
                setEndPointSelected={setEndPointSelected}
                selectedX={selectedX}
                selectedY={selectedY}
                setSelectedX={setSelectedX}
                setSelectedY={setSelectedY}
                lettersUpdated={lettersUpdated}
                setLettersUpdated={setLettersUpdated}
                setSuggestions={setSuggestions}
                suggestions={suggestions}
                setWord={setWord}
                word={word}
                isTurn={isTurn}
              />
            </div>
            {/* <div className="gamecompbottominfo"> */}
            <div className="gamecompwordinput">
              <WordInput
                word={word}
                setWord={setWord}
                selectedX={selectedX}
                selectedY={selectedY}
                endpointSelected={endPointSelected}
                lobbyCode={props.lobbyCode}
                board={gameState.board}
                suggestions={suggestions}
                isTurn={isTurn}
                setShowAlert={setShowAlert}
                AlertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
              />
            </div>
            {/* </div> */}
            <div className="topinfo">
              <div className="gamecomppoints">
                <PointsCounter points={gameState.points} />
              </div>
              <div className="gamecompcounter">
                <Counter />
              </div>
            </div>
          </div>
        </div>
        <div className="gamecomprightcontainer">
          <div className="gamecomprankings">
            <Rankings rankings={gameState.rankings} currentUserId={props.userId} />
          </div>
          <div className="gamecomplog">
            <Log log={gameState.log} userId={props.userId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GameComponent;
