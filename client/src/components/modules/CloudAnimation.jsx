import React, { useEffect, useState } from "react";
import "./CloudAnimation.css";

const CloudAnimation = ({ isActive, cloudImages, reverse }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isActive) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }, [isActive]);

  if (reverse) {
    console.log("reverse");
    return (
      <div className={`cloud-animation-reverse-container ${isActive ? "active" : ""}`}>
        {cloudImages.map((pair, index) => (
          <React.Fragment key={index}>
            <img
              src={pair.bottom}
              alt={`Cloud Layer ${index + 1} Bottom Left`}
              className={`cloud-layer-reverse bottom-left ${animate ? "animate" : ""}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            />
            <img
              src={pair.top}
              alt={`Cloud Layer ${index + 1} Top Right`}
              className={`cloud-layer-reverse top-right ${animate ? "animate" : ""}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          </React.Fragment>
        ))}
      </div>
    );
  } else {
    return (
      <div className={`cloud-animation-container ${isActive ? "active" : ""}`}>
        {cloudImages.map((pair, index) => (
          <React.Fragment key={index}>
            <img
              src={pair.bottom}
              alt={`Cloud Layer ${index + 1} Bottom Left`}
              className={`cloud-layer bottom-left ${animate ? "animate" : ""}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            />
            <img
              src={pair.top}
              alt={`Cloud Layer ${index + 1} Top Right`}
              className={`cloud-layer top-right ${animate ? "animate" : ""}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          </React.Fragment>
        ))}
      </div>
    );
  }
};

export default CloudAnimation;
