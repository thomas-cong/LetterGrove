import React, { useEffect, useRef } from "react";
import "./Log.css";

/**
 * Log component displays game events in a scrollable container
 *
 * @param {Object} props
 * @param {Array} props.log - Array of log messages
 */
const Log = ({ log = [] }) => {
  const logContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [log]);

  return (
    <div className="log-container">
      <h3>Game Log</h3>
      <div className="log-messages" ref={logContainerRef}>
        {log.map((message, index) => (
          <div key={index} className="log-message">
            {message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Log;
