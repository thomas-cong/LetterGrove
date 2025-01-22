import React, { useState, useEffect } from "react";
import { socket } from "../../../client-socket";

/**
 * Counter Component
 * 
 * A component that displays the remaining steps/time in the game.
 * Listens for socket events to update the counter value in real-time.
 * 
 * State:
 * - steps: The current number of steps remaining
 * - mode: The type of counter being displayed (e.g., "Time")
 * 
 * Socket Events:
 * - "time update": Receives updates for the remaining steps/time
 *   - params.stepsRemaining: Number of steps remaining in the game
 */
const Counter = () => {
  const [steps, setSteps] = useState("");
  const [mode, setMode] = useState("");

  useEffect(() => {
    console.log("Counter mounted");
    const handleTimeUpdate = (params) => {
      setSteps(params.stepsRemaining);
      setMode("Time");
    };

    socket.on("time update", handleTimeUpdate);

    return () => {
      socket.off("time update", handleTimeUpdate);
    };
  }, []);

  return (
    <div className="counter">
      <span className="counter-label">{mode} Remaining:</span>
      <span className="counter-value">{steps}</span>
    </div>
  );
};

export default Counter;
