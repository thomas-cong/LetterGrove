import React from "react";
import "./DifficultySlider.css";

import easyShiba from "../../../assets/difficultyicons/difficulty_easy.png";
import mediumShiba from "../../../assets/difficultyicons/difficulty_medium.png";
import hardShiba from "../../../assets/difficultyicons/difficulty_hard.png";

const DifficultySlider = (props) => {
  const [value, setValue] = React.useState(0);
  const difficulties = [
    {
      label: "Easy",
      icon: easyShiba,
      description: "More fruits, fewer default letters for a smoother experience"
    },
    {
      label: "Medium",
      icon: mediumShiba,
      description: "Fewer fruits, moderate default letters for balanced gameplay"
    },
    {
      label: "Hard",
      icon: hardShiba,
      description: "Fewest fruits, most default letters for a real challenge"
    }
  ];

  const handleDifficultyClick = (index) => {
    setValue(index);
    props.setGameSettings({
      ...props.gameSettings,
      difficulty: difficulties[index].label,
    });
  };

  return (
    <div className="slider-container">
      <div className="shiba-icons">
        {difficulties.map((difficulty, index) => (
          <div
            key={index}
            className={`difficulty-option ${parseInt(value) === index ? "active" : ""}`}
            onClick={() => handleDifficultyClick(index)}
          >
            <img
              src={difficulty.icon}
              alt={difficulty.label}
              className={parseInt(value) === index ? "active" : ""}
            />
            <span className={parseInt(value) === index ? "active" : ""}>
              {difficulty.label}
            </span>
            <div className="tooltip">{difficulty.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DifficultySlider;
