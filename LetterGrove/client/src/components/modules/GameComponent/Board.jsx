import React, { useState, useEffect } from "react";
import { socket } from "../../../client-socket";
import { get, post } from "../../../utilities";
import Tile from "./Tile";
import "./Board.css";

const renderBoard = (params) => {
  let list_of_rows = [];
  for (let i = 0; i < params.board.length; i++) {
    let rowcomponents = [];
    for (let j = 0; j < params.board.length; j++) {
      let cell = params.board[i][j];

      const coords = [j, i];
      const isEndpoint = params.endpoints.some(([a, b]) => a === coords[0] && b === coords[1]);

      rowcomponents.push(
        <Tile cell={cell} x={j} y={i} key={`${i}-${j}`} isEndpoint={isEndpoint} />
      );
    }
    list_of_rows.push(
      <div className="board-row" key={`row-${i}`}>
        {rowcomponents}
      </div>
    );
  }
  return list_of_rows;
};

// Define the "Board" component
// props.board is the game board as expressed by a 2D array
// props.endpoints is an array of pairs of [x, y] coordinates
const Board = (props) => {
  const [display, setDisplay] = useState(
    renderBoard({ board: props.board, endpoints: props.endpoints })
  );
  useEffect(() => {
    setDisplay(renderBoard({ board: props.board, endpoints: props.endpoints }));
  }, [props.board]);
  return <div className="board-container">{display}</div>;
};

export default Board;
