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
      <h2 className="createdtitle">Select Board Type</h2>
      <div className="board-options">
        <div
          className="board-option"
          onClick={() => onSelect(true)}
        >
          <h2>Same Board</h2>
          <p>All players compete on one shared board to find the most words. Perfect for competitive play!</p>
        </div>
        <div
          className="board-option"
          onClick={() => onSelect(false)}
        >
          <h2>Different Boards</h2>
          <p>Each player gets their own unique board. Great for casual play and practicing!</p>
        </div>
      </div>
    </div>
  );
};

export default BoardSelection;
