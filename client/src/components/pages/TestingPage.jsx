import React from "react";
import ProfilePictureGenerator from "../modules/Profile/ProfilePictureGenerator/ProfilePictureGenerator";
import "./TestingPage.css";

const TestingPage = () => {
  return (
    <div className="testing-page">
      <div className="testing-container">
        <ProfilePictureGenerator />
      </div>
    </div>
  );
};

export default TestingPage;
