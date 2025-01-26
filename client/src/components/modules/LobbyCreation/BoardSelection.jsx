import React from "react";
import "./BoardSelection.css";
import closeButton from "../../../assets/Closebutton.png";

const BoardSelection = ({ onClose, onSelect }) => {
  return (
    <div className="selectionmainboard">
      <img
        src={closeButton}
        alt="Close"
        className="createdcloseButton"
        onClick={onClose}
      />
      <div className="createdtitle">Select Board Type</div>
      <div className="board-options">
        <div
          className="board-option"
          onClick={() => onSelect(true)}
        >
          <div className="selectheader">Same Board</div>
          <p>All players will share the same board and race to collect fruits before others do! But be careful—it’s a race to grab power-ups and crops, so you’ll need to think fast and maybe even sabotage your opponents! (Shiba doesn’t mind a little mischief.)</p>
          <p style={{ fontWeight: "bold", fontSize: "20px" }}>Two Pawsome Modes:</p>
          <p style={{ textAlign: "start" }}> <strong>Points: </strong>Be the first to gather enough points to win!<br/><strong>Turns: </strong>Everyone gets the same number of turns—whoever scores the most points by the end is the winner!</p>
        </div>
        <div
          className="board-option"
          onClick={() => onSelect(false)}
        >
          <div className="selectheader">Different Boards</div>
          <p>In this mode, everyone gets their own board, but don’t think it’s easy-peasy! The boards are identical, so it’s all about who can plan the smartest moves and collect the most fruits. No sneaky sabotages here—it’s just you and your letter path!</p>
          <p style={{ fontWeight: "bold", fontSize: "20px" }}>Three Berry Sweet Modes</p>
          <p style={{ textAlign: "start" }}><strong>Points: </strong>First to hit the target score wins! <br/><strong>Turns: </strong>Outscore your friends before you run out of turns!<br/><strong>Time: </strong>Collect as many points as you can before the clock runs out!</p>
        </div>
      </div>
    </div>
  );
};

export default BoardSelection;
