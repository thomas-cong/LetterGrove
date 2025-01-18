import React from "react";
import animation404 from "../../assets/404animation.gif";

const NotFound = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${animation404})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: "20px", left: "20px" }}>
        <h1
          style={{
            color: "#1B4B7A",
            textShadow: "2px 2px 4px rgba(255,255,255,0.7)",
            margin: "0 0 10px 0",
          }}
        >
          404 Not Found
        </h1>
        <p style={{ color: "#1B4B7A", textShadow: "2px 2px 4px rgba(255,255,255,0.7)", margin: 0 }}>
          The page you requested couldn't be found.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
