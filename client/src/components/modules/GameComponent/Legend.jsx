import React from "react";
import legend from "../../../assets/Legend.png";
import "./Legend.css";

// Import fruit tiles
import cherry from "../../../assets/Tiles/cherry.png";
import grape from "../../../assets/Tiles/grape.png";
import orange from "../../../assets/Tiles/orange.png";
import fruitcrate from "../../../assets/Tiles/fruitcrate.png";
import wateringCan from "../../../assets/Tiles/wateringCan.png";
import twoTimes from "../../../assets/Tiles/twoTimes.png";

const Legend = () => {
  const fruits = [
    { img: cherry, name: "+2pts" },
    { img: grape, name: "+3pts" },
    { img: orange, name: "+5pts" },
    { img: fruitcrate, name: "+10pts" },
    { img: wateringCan, name: "Spawns 3 fruits" },
    { img: twoTimes, name: "Doubles points from placed word" },
  ];

  return (
    <div className="legend-container">
      <img src={legend} alt="Legend" className="legend-background" />
      <div className="crops-column">
        {fruits.map((fruit) => (
          <div key={fruit.name} className="crop-item">
            <img src={fruit.img} alt={fruit.name} className="crop-image" />
            <span className="crop-name">{fruit.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;
