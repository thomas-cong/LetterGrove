import React, { useEffect, useRef } from "react";
import "./../../../utilities.css";
import "./Log.css";

/**
 * Log component displays game events in a scrollable container
 *
 * @param {Object} props
 * @param {Array} props.log - Array of log messages
 */
const Log = ({ log = [], userId }) => {
  const logContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [log]);

  return (
    <div className="log-container">
      <h3 className="log-title">Game Log</h3>
      <div className="log-messages-container">
        <div className="log-messages" ref={logContainerRef}>
          {log.map((message, index) => (
            <div key={index} className="log-message">
              {(message.userId === userId) ? (
                <div style={{ color: "#d6d6d6" }}>
                  <span style={{ color: "var(--primary--dim)" }}>{message.username}</span> collected <span style={{ color: "rgb(220,20,60)"}}>{message.pointsGained}</span> {message.pointsGained === 1 ? "point" : "points"}
                </div>
              ) : (
                <div style={{ color: "#d6d6d6" }}>
                  <span style={{ color: "black" }}>{message.username}</span> collected <span style={{ color: "rgb(220,20,60)"}}>{message.pointsGained}</span> {message.pointsGained === 1 ? "point" : "points"}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Log;
