import React, { useState, useEffect } from "react";
import { socket } from "../../../client-socket";
import { post } from "../../../utilities";
import Board from "./Board";
import WordInput from "./WordInput";
import Counter from "./Counter";
import PointsCounter from "./PointsCounter";

const GameComponent = (props) => {
  const [word, setWord] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Game state management
  const [endPointSelected, setEndPointSelected] = useState(true);
  const [selectedX, setSelectedX] = useState(0);
  const [selectedY, setSelectedY] = useState(0);
  const [endpoints, setEndpoints] = useState([[0, 0]]);
  const [lettersUpdated, setLettersUpdated] = useState([]);
  const [gameState, setGameState] = useState({
    lobbyCode: "",
    username: "",
    board: [],
    points: 0,
    powerups: [],
    counter: 0,
    rankings: [],
    log: [],
  });

  //@{params} letters updated
  //@{params} board
  const updateLetters = (params) => {
    let updatedLetters = params.lettersUpdated;
    console.log("Updated letters:");
    console.log(updatedLetters);

    // Create a deep copy of the board
    let newBoard = JSON.parse(JSON.stringify(params.board));

    for (let i = 0; i < updatedLetters.length; i++) {
      let x = updatedLetters[i].x;
      let y = updatedLetters[i].y;
      let letter = updatedLetters[i].letter;
      newBoard[y][x] = {
        ...newBoard[y][x], // preserve existing tile properties
        letter: letter,
        crop: "",
        powerup: "",
        visited: true,
        default: false,
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
    // Initial game state
    const handleInitialGame = (game) => {
      setGameState(game);
      console.log("POOP " + game.board);
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
    };

    // Global game updates (rankings, log messages)
    const handleGlobalUpdate = (info) => {
      setGameState((prevState) => ({
        ...prevState,
        rankings: info.updatedRankings,
        log: [...prevState.log, info.logMessage],
      }));
    };

    // Set up listeners
    socket.on("initial game", handleInitialGame);
    socket.on("user update", handleUserUpdate);
    socket.on("global update", handleGlobalUpdate);

    // Cleanup listeners on unmount
    return () => {
      socket.off("initial game", handleInitialGame);
      socket.off("user update", handleUserUpdate);
      socket.off("global update", handleGlobalUpdate);
    };
  }, []); // Empty dependency array since we want to set up listeners only once

  useEffect(() => {
    updateLetters({ lettersUpdated: lettersUpdated, board: gameState.board });
  }, [lettersUpdated]);
  return (
    <div>
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
      />
      <WordInput
        word={word}
        setWord={setWord}
        selectedX={selectedX}
        selectedY={selectedY}
        endpointSelected={endPointSelected}
        lobbyCode={props.lobbyCode}
        board={gameState.board}
        suggestions={suggestions}
      />
      <Counter />
      <PointsCounter points={gameState.points} />
      {/* <Log log={gameState.log} />
      <Rankings rankings={gameState.rankings} /> */}
    </div>
  );
};

export default GameComponent;
