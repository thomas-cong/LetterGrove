import React from "react";
import "./DifficultySlider.css";
import sliderImage from "../../../assets/slider.png";

const DifficultySlider = (props) => {
  const [value, setValue] = React.useState(0);
  const difficultyLabels = ["easy", "medium", "hard"];
  const handleSliderChange = (event) => {
    const newValue = parseInt(event.target.value);
    setValue(newValue);
    console.log(difficultyLabels[newValue]);
    props.setGameSettings({
      ...props.gameSettings,
      ["difficulty"]: difficultyLabels[newValue],
    });
  };

  return (
    <div className="slider-container">
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
