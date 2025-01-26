import React from "react";
import { useState, useEffect } from "react";
import Closebutton from "../../../assets/Closebutton.png";
import "./CreditsPopup.css";

const CreditsPopup = (props) => {
  return (
    <div className="creditsmainboard">
      <img src={Closebutton} onClick={() => props.hideCredits()} className="createdcloseButton" />
      <div className="credits">
        <h3>
          <span style={{ color: "rgb(94, 129, 255)" }}>CREATED BY: </span>
          <span style={{ color: "rgb(94, 129, 255)" }}>Thomas Cong, Leon Chen, Steve Zhang</span>
        </h3>
          <div style={{ color: "rgb(94, 129, 255)" }}>
            In order to preserve the authenticity of our game, we have chosen to use only original
            artwork and music. Artistically, we hope that the game is not only fun, but also
            visually attractive and cohesive.
          </div>
          <h3>
            <div style={{ color: "rgb(94, 129, 255)" }}>
              All artwork, including the logo and game pieces, was handdrawn by Thomas Cong over the
              course of Weblab 2025. All music was composed by Thomas Cong.
            </div>
          </h3>
          <div style={{ color: "rgb(94, 129, 255)" }}>
            Game logic was implemented by Steve Zhang, and frontend development was completed by
            Leon Chen and Thomas Cong.
          </div>
          <h3>
          <div style={{ color: "rgb(94, 129, 255)" }}>We hope you enjoy playing LetterGrove!</div>
          </h3>
      </div>
    </div>
  );
};

export default CreditsPopup;
