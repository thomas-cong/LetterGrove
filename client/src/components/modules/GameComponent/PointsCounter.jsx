import React, { useState, useEffect } from "react";
import ScoreBox from "../../../assets/ScoreBox.png";
import "./PointsCounter.css";

const PointsCounter = (params) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const formattedPoints = params.points.toString().padStart(3, "0");

  return (
    <div className="points-counter">
      <img src={ScoreBox} alt="ScoreBox" />
      <span>
        {formattedPoints.split("").map((digit, index) => (
          <span key={index} className={isAnimating ? "score-change" : ""}>
            {digit}
          </span>
        ))}
      </span>
    </div>
  );
};

export default PointsCounter;
