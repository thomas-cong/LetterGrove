import React from "react";
import { useState, useEffect } from "react";
import Closebutton from "../../../assets/Closebutton.png";
import "./ProfilePopup.css";

const ProfilePopup = (props) => {
  return (
    <div className="profilemainboard">
      <img src={Closebutton} onClick={() => props.hideProfile()} className="createdcloseButton" />
      <div className="profile">
        <h3>
          <span style={{ color: "var(--primary--dim)" }}>CREATED BY: </span>
          <span style={{ color: "var(--primary--dim)" }}>Thomas Cong, Leon Chen, Steve Zhang</span>

          <div style={{ color: "var(--primary--dim)" }}>
            In order to preserve the authenticity of our game, we have chosen to use only original
            artwork and music. Artistically, we hope that the game is not only fun, but also
            visually attractive and cohesive.
          </div>
          <h3>
            <div style={{ color: "var(--primary--dim)" }}>
              All artwork, including the logo and game pieces, was handdrawn by Thomas Cong over the
              course of Weblab 2025. All music was composed by Thomas Cong.
            </div>
          </h3>
          <div style={{ color: "var(--primary--dim)" }}>
            Game logic was implemented by Steve Zhang, and frontend development was completed by
            Leon Chen and Thomas Cong.
          </div>

          <div style={{ color: "var(--primary--dim)" }}>We hope you enjoy playing LetterGrove!</div>
        </h3>
      </div>
    </div>
  );
};

export default ProfilePopup;
