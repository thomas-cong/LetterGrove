import React from "react";
import { get } from "../../../utilities";

// Import all PFP images
import Bow1 from "../../../assets/PFP/Accessories/Bow1.png";
import Bow2 from "../../../assets/PFP/Accessories/Bow2.png";
import Bow3 from "../../../assets/PFP/Accessories/Bow3.png";
import Bow4 from "../../../assets/PFP/Accessories/Bow4.png";
import Bow5 from "../../../assets/PFP/Accessories/Bow5.png";
import Bow6 from "../../../assets/PFP/Accessories/Bow6.png";

import Eye1 from "../../../assets/PFP/Eyes/Eye1.png";
import Eye2 from "../../../assets/PFP/Eyes/Eye2.png";
import Eye3 from "../../../assets/PFP/Eyes/Eye3.png";
import Eye4 from "../../../assets/PFP/Eyes/Eye4.png";
import Eye5 from "../../../assets/PFP/Eyes/Eye5.png";
import Eye6 from "../../../assets/PFP/Eyes/Eye6.png";

import Face1 from "../../../assets/PFP/Faces/Face1.png";
import Face2 from "../../../assets/PFP/Faces/Face2.png";
import Face3 from "../../../assets/PFP/Faces/Face3.png";
import Face4 from "../../../assets/PFP/Faces/Face4.png";
import Face5 from "../../../assets/PFP/Faces/Face5.png";
import Face6 from "../../../assets/PFP/Faces/Face6.png";

import Bangs1 from "../../../assets/PFP/Hairs/Bangs1.png";
import Bangs2 from "../../../assets/PFP/Hairs/Bangs2.png";
import Bangs3 from "../../../assets/PFP/Hairs/Bangs3.png";
import Bangs4 from "../../../assets/PFP/Hairs/Bangs4.png";
import Bangs5 from "../../../assets/PFP/Hairs/Bangs5.png";
import Bangs6 from "../../../assets/PFP/Hairs/Bangs6.png";

import Shirt1 from "../../../assets/PFP/Shirts/Plain_Shirt1.png";
import Shirt2 from "../../../assets/PFP/Shirts/Plain_Shirt2.png";
import Shirt3 from "../../../assets/PFP/Shirts/Plain_Shirt3.png";
import Shirt4 from "../../../assets/PFP/Shirts/Plain_Shirt4.png";
import Shirt5 from "../../../assets/PFP/Shirts/Plain_Shirt5.png";
import Shirt6 from "../../../assets/PFP/Shirts/Plain_Shirt6.png";

// Image arrays (0-5 indexed)
const accessories = [Bow1, Bow2, Bow3, Bow4, Bow5, Bow6];
const eyes = [Eye1, Eye2, Eye3, Eye4, Eye5, Eye6];
const faces = [Face1, Face2, Face3, Face4, Face5, Face6];
const hairs = [Bangs1, Bangs2, Bangs3, Bangs4, Bangs5, Bangs6];
const shirts = [Shirt1, Shirt2, Shirt3, Shirt4, Shirt5, Shirt6];

const ProfilePicture = ({ profilePicture, className }) => {
  if (!profilePicture) {
    return null; // or a loading spinner
  }

  const imageStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "contain",
  };

  return (
    <div className={`${className} profile-picture-container`}>
      <img src={shirts[profilePicture.Shirt]} style={imageStyle} alt="shirt" />
      <img src={faces[profilePicture.Face]} style={imageStyle} alt="face" />
      <img src={eyes[profilePicture.Eyes]} style={imageStyle} alt="eyes" />
      <img src={hairs[profilePicture.Hair]} style={imageStyle} alt="hair" />
      <img src={accessories[profilePicture.Accessory]} style={imageStyle} alt="accessory" />
    </div>
  );
};

export default ProfilePicture;
