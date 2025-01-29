import React, { useState } from "react";
import ProfilePicture from "./ProfilePicture";
import "./ProfilePictureEditor.css";
import { post } from "../../../utilities";

const MAX_VALUES = {
  Accessory: 24, // 25 accessories (4 types × 6 variants + None)
  Hair: 23,      // 24 hairstyles (4 types × 6 variants)
  Eyes: 5,       // 6 eye types
  Face: 5,       // 6 face types
  Shirt: 23,     // 24 shirts (4 types × 6 variants)
};

const ProfilePictureEditor = ({ initialPfp, userId, onClose, onUpdate }) => {
  const [currentPfp, setCurrentPfp] = useState(initialPfp);

  const handleChange = (component, delta) => {
    setCurrentPfp((prev) => ({
      ...prev,
      [component]: (prev[component] + delta + MAX_VALUES[component] + 1) % (MAX_VALUES[component] + 1),
    }));
  };

  const handleSave = () => {
    post("/api/setPfp", { userId, pfp: currentPfp }).then((updatedPfp) => {
      onUpdate(updatedPfp);
      onClose();
    });
  };

  const PfpControl = ({ label, component }) => (
    <div className="pfp-control">
      <button onClick={() => handleChange(component, -1)} className="arrow-btn">
        ←
      </button>
      <span className="component-label">{label}</span>
      <button onClick={() => handleChange(component, 1)} className="arrow-btn">
        →
      </button>
    </div>
  );

  return (
    <div className="pfp-editor-overlay">
      <div className="pfp-editor-content">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="pfp-editor-main">
          <div className="pfp-editor-layout">
            <div className="pfp-preview">
              <ProfilePicture pfp={currentPfp} className="large-preview" />
            </div>
            <div className="pfp-controls">
              <PfpControl label="Hairstyle" component="Hair" />
              <PfpControl label="Eyes" component="Eyes" />
              <PfpControl label="Face" component="Face" />
              <PfpControl label="Shirt" component="Shirt" />
              <PfpControl label="Accessory" component="Accessory" />
            </div>
          </div>
          <div className="update-button-container">
            <button className="update-button" onClick={handleSave}>
              Update Profile Picture
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureEditor;
