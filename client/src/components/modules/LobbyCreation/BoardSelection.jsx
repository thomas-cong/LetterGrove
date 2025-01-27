import React from "react";
import "./BoardSelection.css";
import BoardSelectionSign from "../../../assets/BoardSelectionSign.png";
import closeButton from "../../../assets/Closebutton.png";

const BoardSelection = ({ onClose, onSelect }) => {
  return (
    <div className="selectionmainboard">
      <img src={closeButton} alt="Close" className="createdcloseButton" onClick={onClose} />
      <div className="createdtitle">Select Board Type</div>
      <div className="board-options">
        <div className="board-option" onClick={() => onSelect(true)}>
          <div className="selectheader">Same Board</div>
          <p>
          All players will share the same board and race to collect fruits!
          </p>
          <p style={{ fontWeight: "bold", fontSize: "28px", color: "pink"}}>Modes:</p>
          <p style={{ textAlign: "start" }}>
            {" "}
            <strong>Points: </strong>First to hit the target score wins!
            <br />
            <strong>Turns: </strong>Outscore your friends before you run out of turns!
          </p>
        </div>
        <div className="board-option" onClick={() => onSelect(false)}>
          <div className="selectheader">Different Boards</div>
          <p>
          Everyone gets their own separate but identical board.
          </p>
          <p style={{ fontWeight: "bold", fontSize: "28px", color: "pink" }}>Modes:</p>
          <p style={{ textAlign: "start" }}>
            <strong>Points: </strong>First to hit the target score wins!<br />
            <strong>Turns: </strong>Outscore your friends before you run out of turns!
            <br />
            <strong>Time: </strong>Collect as many points as you can before time's up!
          </p>
        </div>
      </div>
    </div>
  );
};

export default BoardSelection;
