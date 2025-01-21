import React, { useState, useEffect } from "react";
import { socket } from "../../../client-socket";
import { post } from "../../../utilities";
import Board from "./Board";
import WordInput from "./WordInput";

const GameComponent = (props) => {
  post("/api/startGame", { lobbyCode: props.lobbyCode });
  const [word, setWord] = useState("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  // Should be an array of pairs
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

  useEffect(() => {
    // Listen for initial game state
    socket.on("initial game", (game) => {
      setGameState(game);
    });

    // Cleanup socket listener and animation when component unmounts
    return () => {
      socket.off("initial game");
    };
  }, []);

  useEffect(() => {
    // Listen for updated game state
    //Update the letter placement, and the points
    socket.on("user update", (info) => {
      setGameState((prevState) => ({
        ...prevState,
        points: info.totalPoints,
      }));
      setLettersUpdated(info.lettersUpdated);
      setEndpoints(info.endpoints);
      console.log(info.endpoints);
    });
    socket.on("global update", (info) => {});
  }, []);

  return (
    <div>
      <Board
        board={gameState.board}
        points={gameState.points}
        username={gameState.username}
        endpoints={endpoints}
      />
      <WordInput word={word} setWord={setWord} x={x} y={y} setX={setX} setY={setY} />

      {/* <Counter counter={gameState.counter} />
      <Log log={gameState.log} />
      
      <Rankings rankings={gameState.rankings} /> */}
    </div>
  );
};

export default GameComponent;
