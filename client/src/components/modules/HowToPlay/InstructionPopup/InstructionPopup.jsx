import React from "react";
import "./InstructionPopup.css";
import tutorialLeft from "../../../../assets/TutorialLeft.png";
import tutorialRight from "../../../../assets/TutorialRight.png";

// Define positions for each step
const LOCATION_POSITIONS = {
  1: { top: "30%", left: "1%" },
  2: { top: "15%", left: "28%" },
  3: { top: "25%", left: "69%" },
  4: { top: "15%", left: "40%" },
  5: { bottom: "18%", left: "10%" },
};

/**
 * A reusable instruction popup component
 * @param {Object} props
 * @param {string} props.title - Title of the instruction popup
 * @param {string} props.message - Message to display in the popup
 * @param {number} props.location - Location number to determine popup position (1-5)
 * @param {Function} props.setInstructionStep - Function to set the instruction step
 * @param {number} props.instructionStep - Current instruction step
 */
const InstructionPopup = ({
  title = "Welcome to LetterGrove!",
  message = "",
  location = 1,
  setInstructionStep,
  instructionStep,
}) => {
  const position = LOCATION_POSITIONS[location] || LOCATION_POSITIONS[1];

  const handlePrevious = () => {
    setInstructionStep((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    // add the handling to not go over the steps
    setInstructionStep((prev) => prev + 1);
  };

  return (
    <div className="instruction-popup" style={position}>
      <div className="instruction-content">
        <h3 className="instruction-title">{title}</h3>
        <div className="instruction-step1">{message}</div>
        <div className="tutorial-nav">
          <img
            src={tutorialLeft}
            alt="Previous"
            onClick={handlePrevious}
            style={{
              visibility: instructionStep === 0 ? "hidden" : "visible",
            }}
          />
          <img
            src={tutorialRight}
            alt="Next"
            onClick={handleNext}
            style={{
              visibility: instructionStep === 9 ? "hidden" : "visible",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InstructionPopup;
