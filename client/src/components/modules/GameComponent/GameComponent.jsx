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
import Legend from "./Legend";

// @props isTutorial: boolean

const GameComponent = (props) => {
  const [sameBoard, setSameBoard] = useState(false);
  const [word, setWord] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isTurn, setIsTurn] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [turnUsername, setTurnUsername] = useState("");
  const [showEndGamePopup, setShowEndGamePopup] = useState(false);
  const [endGameInfo, setEndGameInfo] = useState(null);
  const [endPointSelected, setEndPointSelected] = useState(true);
  const [endpoints, setEndpoints] = useState([[0, 0]]);
  const [selectedX, setSelectedX] = useState(0);
  const [selectedY, setSelectedY] = useState(0);
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
      // if (i === updatedLetters.length - 1) {
      //   if (!sameBoard) {
      //     setEndPointSelected(true);
      //     setSelectedX(x);
      //     setSelectedY(y);
      //     setWord("");
      //   } else {
      //     console.log()
      //   }
      // }
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

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     console.log("gameState.board.length: " + gameState.board.length);
  //     if (gameState.board.length > 0) {
  //       console.log("exited");
  //       get("/api/currentGame", { lobbyCode: props.lobbyCode, userId: props.userId });
  //       clearInterval(intervalId); // Stop polling once we have a board
  //     }
  //   }, 250);

  //   return () => clearInterval(intervalId);
  // }, []);

  // Set up socket listeners
  useEffect(() => {
    console.log("useEffect called");

    // Initial game state
    const handleInitialGame = (game) => {
      setGameState(game);
      setEndpoints(game.endpoints);
      setSelectedX(game.endpoints[game.endpoints.length - 1][0]);
      setSelectedY(game.endpoints[game.endpoints.length - 1][1]);
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

      setEndPointSelected(true);
      setSelectedX(info.endpoints[info.endpoints.length - 1][0]);
      setSelectedY(info.endpoints[info.endpoints.length - 1][1]);
      setWord("");
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
      setSameBoard(true);
      console.log("Turn update:", info);
      setTurnUsername(info.username); // Set username first
      setTimeout(() => {
        if (info.userId === props.userId) {
          console.log("emitted username: " + info.username);
          setIsTurn(true);
        } else {
          console.log("emitted id: " + info.userId);
          console.log("props id: " + props.userId);
          setIsTurn(false);
        }
      }, 300);
    };

    const handleBoardUpdate = (info) => {
      console.log("Board update:", info);
      setLettersUpdated(info.letterUpdates);
      setCropsUpdated(info.cropUpdates);
    };

    const handleGameOver = (info) => {
      console.log("Game over:", info);
      setShowEndGamePopup(true);
      setEndGameInfo(info);
    };

    const handleSocketJoinedGame = () => {
      console.log("HandleSocketJoinedGame  " + props.lobbyCode);
      get("/api/currentGame", { lobbyCode: props.lobbyCode, userId: props.userId });
    };

    // Set up socket connection
    socket.emit("join socket", { lobbyCode: props.lobbyCode, userId: props.userId });

    // Set up socket event handlers
    socket.on("socket joined game", handleSocketJoinedGame);
    socket.on("initial game", handleInitialGame);
    socket.on("user update", handleUserUpdate);
    socket.on("global update", handleGlobalUpdate);
    socket.on("turn update", handleTurnUpdate);
    socket.on("board update", handleBoardUpdate);
    socket.on("game over", handleGameOver);

    // Cleanup listeners on unmount
    return () => {
      socket.off("socket joined game", handleSocketJoinedGame);
      socket.off("initial game", handleInitialGame);
      socket.off("user update", handleUserUpdate);
      socket.off("global update", handleGlobalUpdate);
      socket.off("turn update", handleTurnUpdate);
      socket.off("board update", handleBoardUpdate);
      socket.off("game over", handleGameOver);
    };
  }, [props.lobbyCode, props.userId]);

  useEffect(() => {
    updateBoard({
      cropsUpdated: cropsUpdated,
      lettersUpdated: lettersUpdated,
      board: gameState.board,
      sameBoard: gameState.board.sameBoard,
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
      {showAlert && !props.isTutorial && (
        <AlertBox message={alertMessage} className="word-input-alert" />
      )}
      {showEndGamePopup && (
        <GameEndPopup
          endGameInfo={endGameInfo}
          currentUserId={props.userId}
          isTutorial={props.isTutorial}
          closeTutorial={props.closeTutorial}
        />
      )}

      <div
        className={`gamecompcontainer ${
          props.isTutorial ? "tutorialbackground" : "gamebackground"
        }`}
      >
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
                lobbyCode={props.lobbyCode}
                isTutorial={props.isTutorial}
              />
            </div>
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
        <div className="gamecomplegendcontainer">{!props.isTutorial && <Legend />}</div>
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
