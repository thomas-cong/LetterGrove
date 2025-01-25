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
  const [leftMessage, setLeftMessage] = useState("");
  const [rightMessage, setRightMessage] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log("Counter mounted");
    const handleTimeUpdate = (params) => {
      setLeftMessage("Time remaining: ");
      setValue(params.secondsRemaining);
    };

    const handleWordsUpdate = (params) => {
      setLeftMessage("Words remaining: ");
      setValue(params.wordsRemaining);
      setRightMessage(" of " + params.wordLimit);
    }

    const handlePointsUpdate = (params) => {
      setLeftMessage("Points to win: ");
      setValue(params.pointsToWin);
    }

    socket.on("time update", handleTimeUpdate);
    socket.on("words update", handleWordsUpdate);
    socket.on("points update", handlePointsUpdate);

    return () => {
      socket.off("time update", handleTimeUpdate);
      socket.off("words update", handleWordsUpdate);
      socket.off("points update", handlePointsUpdate);
    };
  }, []);

  return (
    <div className="counter">
      <span className="counter-label">{leftMessage}</span>
      <span className="counter-label">{value}</span>
      <span className="counter-label">{rightMessage}</span>
    </div>
  );
};

export default Counter;
