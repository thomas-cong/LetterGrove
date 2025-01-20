import React, { useState, useEffect } from "react";
import { socket } from "../../../client-socket";
import { post } from "../../../utilities";

const GameComponent = (props) => {
  post("/api/startGame", { lobbyCode: props.lobbyCode });
  const [word, setWord] = useState("");
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
      console.log("Received initial game state:", game);
      setGameState(game);
    });

    // Cleanup socket listener and animation when component unmounts
    return () => {
      socket.off("initial game");
    };
  }, []);

  return (
    <div>
      <Board board={gameState.board} points={gameState.points} username={gameState.username} />
      {/* <Counter counter={gameState.counter} />
      <Log log={gameState.log} />
      <WordInput word={word} setWord={setWord} />
      <Rankings rankings={gameState.rankings} /> */}
    </div>
  );
};

export default GameComponent;
