import React from "react";
import "./DifficultySlider.css";

import easyShiba from "../../../assets/difficultyicons/difficulty_easy.png";
import mediumShiba from "../../../assets/difficultyicons/difficulty_medium.png";
import hardShiba from "../../../assets/difficultyicons/difficulty_hard.png";

const DifficultySlider = (props) => {
  const [value, setValue] = React.useState(0);
  const difficultyLabels = ["Easy", "Medium", "Hard"];
  const difficultyIcons = [easyShiba, mediumShiba, hardShiba];
  let newValue = 0;

  const handleSliderChange = (event) => {
    newValue = parseInt(event.target.value);
    setValue(newValue);
    console.log(difficultyLabels[newValue]);
    props.setGameSettings({
      ...props.gameSettings,
      ["difficulty"]: difficultyLabels[newValue],
    });
  };

  return (
    <div className="slider-container">
      <div className="shiba-icons">
        {difficultyIcons.map((icon, index) => (
          <img
            key={index}
            src={icon}
            alt={difficultyLabels[index]}
            className={parseInt(value) === index ? "active" : ""}
          />
        ))}
      </div>
      <input
        type="range"
        min="0"
        max="2"
        step="1"
        value={value}
        onChange={handleSliderChange}
        className="slider"
      />
      <div className="labels">
        <span className={parseInt(value) === 0 ? "active" : ""}>Easy</span>
        <span className={parseInt(value) === 1 ? "active" : ""}>Medium</span>
        <span className={parseInt(value) === 2 ? "active" : ""}>Hard</span>
      </div>
    </div>
  );
};

export default DifficultySlider;
