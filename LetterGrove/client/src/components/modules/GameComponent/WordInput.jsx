import React from "react";
import { useState } from "react";
import { socket } from "../../../client-socket";
import { post } from "../../../utilities";
import ConfirmImage from "../../../assets/confirm.png";

// Params
// @param {word} the word that the player has entered
// @param {setWord} setter for the word
// @param {x} the x coordinate of the word
// @param {y} the y coordinate of the word

const WordInput = (props) => {
  const handleEnter = () => {
    socket.emit("enter word", {
      lobbyCode: props.lobbyCode,
      x: props.x,
      y: props.y,
      word: props.word,
    });
    props.setWord("");
  };
  return (
    <span>
      <input
        type="text"
        placeholder="Enter a word"
        value={props.word}
        onChange={(e) => {
          props.setWord(e.target.value);
        }}
      />
      <img src={ConfirmImage} onClick={handleEnter} />
    </span>
  );
};
export default WordInput;
