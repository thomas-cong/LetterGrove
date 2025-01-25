import React, { useState, useEffect } from "react";
import ScoreBox from "../../../assets/ScoreBox.png";
import "./PointsCounter.css";

const COLORS = ["#75c44c", "#194bb7", "#ea2f2f"];

const PointsCounter = (params) => {
  const [digitColors, setDigitColors] = useState([COLORS[0], COLORS[0], COLORS[0]]);
  const [isAnimating, setIsAnimating] = useState(false);
  const formattedPoints = params.points.toString().padStart(3, "0");

  useEffect(() => {
    setDigitColors(
      Array(3)
        .fill()
        .map(() => COLORS[Math.floor(Math.random() * COLORS.length)])
    );
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [params.points]);

  return (
    <div className="points-counter">
      <img src={ScoreBox} alt="ScoreBox" />
      <span>
        {formattedPoints.split("").map((digit, index) => (
          <span
            key={index}
            style={{ color: digitColors[index] }}
            className={isAnimating ? "score-change" : ""}
          >
            {digit}
          </span>
        ))}
      </span>
    </div>
  );
};

export default PointsCounter;
