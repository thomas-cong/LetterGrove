import React, { useState, useEffect } from "react";
import { socket } from "../../../client-socket";
import { get, post } from "../../../utilities";

// Define the "Board" component
// props.board is the game board as expressed by a 2D array
const Board = (props) => {
  const renderBoard = () => {
    return props.board.map((row, rowIndex) => {
      return (
        <div key={rowIndex} className="board-row">
          {row.map((cell, cellIndex) => {
            return (
              <div key={cellIndex} className="board-cell">
                {cell}
              </div>
            );
          })}
        </div>
      );
    });
  };

  return <div>{renderBoard()}</div>;
};
export default Board;
