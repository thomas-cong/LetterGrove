import React from "react";
import "./DisconnectModal.css";

/**
 * A modal component that appears when the user is disconnected
 * Dims the background and shows a centered message
 * 
 * @param {Object} props
 * @param {boolean} props.show - Whether to show the modal
 * @param {string} props.message - Message to display in the modal
 */
const DisconnectModal = (props) => {
  if (!props.show) return null;

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="disconnect-modal-overlay">
      <div className="disconnect-modal-content">
        <p className="disconnect-modal-message">{props.message}</p>
        <button className="disconnect-modal-button" onClick={handleRefresh}>
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default DisconnectModal;
