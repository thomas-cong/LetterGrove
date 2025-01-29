import React from "react";
import "./ProfilePicture.css";

// Import all PFP images
// Accessories
import NoAccessory from "../../../assets/PFP/Accessories/Empty32.png"

import Bandana1 from "../../../assets/PFP/Accessories/Bandana1.png";
import Bandana2 from "../../../assets/PFP/Accessories/Bandana2.png";
import Bandana3 from "../../../assets/PFP/Accessories/Bandana3.png";
import Bandana4 from "../../../assets/PFP/Accessories/Bandana4.png";
import Bandana5 from "../../../assets/PFP/Accessories/Bandana5.png";
import Bandana6 from "../../../assets/PFP/Accessories/Bandana6.png";

import Bow1 from "../../../assets/PFP/Accessories/Bow1.png";
import Bow2 from "../../../assets/PFP/Accessories/Bow2.png";
import Bow3 from "../../../assets/PFP/Accessories/Bow3.png";
import Bow4 from "../../../assets/PFP/Accessories/Bow4.png";
import Bow5 from "../../../assets/PFP/Accessories/Bow5.png";
import Bow6 from "../../../assets/PFP/Accessories/Bow6.png";

import Glasses1 from "../../../assets/PFP/Accessories/Glasses1.png";
import Glasses2 from "../../../assets/PFP/Accessories/Glasses2.png";
import Glasses3 from "../../../assets/PFP/Accessories/Glasses3.png";
import Glasses4 from "../../../assets/PFP/Accessories/Glasses4.png";
import Glasses5 from "../../../assets/PFP/Accessories/Glasses5.png";
import Glasses6 from "../../../assets/PFP/Accessories/Glasses6.png";

import Misc1 from "../../../assets/PFP/Accessories/Misc1.png";
import Misc2 from "../../../assets/PFP/Accessories/Misc2.png";
import Misc3 from "../../../assets/PFP/Accessories/Misc3.png";
import Misc4 from "../../../assets/PFP/Accessories/Misc4.png";
import Misc5 from "../../../assets/PFP/Accessories/Misc5.png";
import Misc6 from "../../../assets/PFP/Accessories/Misc6.png";

// Eyes
import Eye1 from "../../../assets/PFP/Eyes/Eye1.png";
import Eye2 from "../../../assets/PFP/Eyes/Eye2.png";
import Eye3 from "../../../assets/PFP/Eyes/Eye3.png";
import Eye4 from "../../../assets/PFP/Eyes/Eye4.png";
import Eye5 from "../../../assets/PFP/Eyes/Eye5.png";
import Eye6 from "../../../assets/PFP/Eyes/Eye6.png";

// Faces
import Face1 from "../../../assets/PFP/Faces/Face1.png";
import Face2 from "../../../assets/PFP/Faces/Face2.png";
import Face3 from "../../../assets/PFP/Faces/Face3.png";
import Face4 from "../../../assets/PFP/Faces/Face4.png";
import Face5 from "../../../assets/PFP/Faces/Face5.png";
import Face6 from "../../../assets/PFP/Faces/Face6.png";

// Hairs
import Bangs1 from "../../../assets/PFP/Hairs/Bangs1.png";
import Bangs2 from "../../../assets/PFP/Hairs/Bangs2.png";
import Bangs3 from "../../../assets/PFP/Hairs/Bangs3.png";
import Bangs4 from "../../../assets/PFP/Hairs/Bangs4.png";
import Bangs5 from "../../../assets/PFP/Hairs/Bangs5.png";
import Bangs6 from "../../../assets/PFP/Hairs/Bangs6.png";

import ManLongHair1 from "../../../assets/PFP/Hairs/ManLongHair1.png";
import ManLongHair2 from "../../../assets/PFP/Hairs/ManLongHair2.png";
import ManLongHair3 from "../../../assets/PFP/Hairs/ManLongHair3.png";
import ManLongHair4 from "../../../assets/PFP/Hairs/ManLongHair4.png";
import ManLongHair5 from "../../../assets/PFP/Hairs/ManLongHair5.png";
import ManLongHair6 from "../../../assets/PFP/Hairs/ManLongHair6.png";

import MiddlePart1 from "../../../assets/PFP/Hairs/MiddlePart1.png";
import MiddlePart2 from "../../../assets/PFP/Hairs/MiddlePart2.png";
import MiddlePart3 from "../../../assets/PFP/Hairs/MiddlePart3.png";
import MiddlePart4 from "../../../assets/PFP/Hairs/MiddlePart4.png";
import MiddlePart5 from "../../../assets/PFP/Hairs/MiddlePart5.png";
import MiddlePart6 from "../../../assets/PFP/Hairs/MiddlePart6.png";

import WomanLongHair1 from "../../../assets/PFP/Hairs/WomanLongHair1.png";
import WomanLongHair2 from "../../../assets/PFP/Hairs/WomanLongHair2.png";
import WomanLongHair3 from "../../../assets/PFP/Hairs/WomanLongHair3.png";
import WomanLongHair4 from "../../../assets/PFP/Hairs/WomanLongHair4.png";
import WomanLongHair5 from "../../../assets/PFP/Hairs/WomanLongHair5.png";
import WomanLongHair6 from "../../../assets/PFP/Hairs/WomanLongHair6.png";

// Shirts
import PlainShirt1 from "../../../assets/PFP/Shirts/Plain_Shirt1.png";
import PlainShirt2 from "../../../assets/PFP/Shirts/Plain_Shirt2.png";
import PlainShirt3 from "../../../assets/PFP/Shirts/Plain_Shirt3.png";
import PlainShirt4 from "../../../assets/PFP/Shirts/Plain_Shirt4.png";
import PlainShirt5 from "../../../assets/PFP/Shirts/Plain_Shirt5.png";
import PlainShirt6 from "../../../assets/PFP/Shirts/Plain_Shirt6.png";

import PastelShirt1 from "../../../assets/PFP/Shirts/PastelShirt1.png";
import PastelShirt2 from "../../../assets/PFP/Shirts/PastelShirt2.png";
import PastelShirt3 from "../../../assets/PFP/Shirts/PastelShirt3.png";
import PastelShirt4 from "../../../assets/PFP/Shirts/PastelShirt4.png";
import PastelShirt5 from "../../../assets/PFP/Shirts/PastelShirt5.png";
import PastelShirt6 from "../../../assets/PFP/Shirts/PastelShirt6.png";

import Sweater1 from "../../../assets/PFP/Shirts/Sweater1.png";
import Sweater2 from "../../../assets/PFP/Shirts/Sweater2.png";
import Sweater3 from "../../../assets/PFP/Shirts/Sweater3.png";
import Sweater4 from "../../../assets/PFP/Shirts/Sweater4.png";
import Sweater5 from "../../../assets/PFP/Shirts/Sweater5.png";
import Sweater6 from "../../../assets/PFP/Shirts/Sweater6.png";

import MiscTop1 from "../../../assets/PFP/Shirts/MiscTop1.png";
import MiscTop2 from "../../../assets/PFP/Shirts/MiscTop2.png";
import MiscTop3 from "../../../assets/PFP/Shirts/MiscTop3.png";
import MiscTop4 from "../../../assets/PFP/Shirts/MiscTop4.png";
import MiscTop5 from "../../../assets/PFP/Shirts/MiscTop5.png";
import MiscTop6 from "../../../assets/PFP/Shirts/MiscTop6.png";

// Image arrays (0-5 indexed)
const accessories = [NoAccessory, Bandana1, Bandana2, Bandana3, Bandana4, Bandana5, Bandana6,
   Bow1, Bow2, Bow3, Bow4, Bow5, Bow6, 
   Glasses1, Glasses2, Glasses3, Glasses4, Glasses5, Glasses6, 
   Misc1, Misc2, Misc3, Misc4, Misc5, Misc6];
const eyes = [Eye1, Eye2, Eye3, Eye4, Eye5, Eye6];
const faces = [Face1, Face2, Face3, Face4, Face5, Face6];
const hairs = [Bangs1, Bangs2, Bangs3, Bangs4, Bangs5, Bangs6, 
  ManLongHair1, ManLongHair2, ManLongHair3, ManLongHair4, ManLongHair5, ManLongHair6, 
  MiddlePart1, MiddlePart2, MiddlePart3, MiddlePart4, MiddlePart5, MiddlePart6,
  WomanLongHair1, WomanLongHair2, WomanLongHair3, WomanLongHair4, WomanLongHair5, WomanLongHair6];
const shirts = [
  PlainShirt1, PlainShirt2, PlainShirt3, PlainShirt4, PlainShirt5, PlainShirt6,
  PastelShirt1, PastelShirt2, PastelShirt3, PastelShirt4, PastelShirt5, PastelShirt6,
  Sweater1, Sweater2, Sweater3, Sweater4, Sweater5, Sweater6,
  MiscTop1, MiscTop2, MiscTop3, MiscTop4, MiscTop5, MiscTop6
];

const ProfilePicture = ({ pfp, className }) => {
  console.log("ProfilePicture render:", { pfp, className });
  
  // Default profile picture if none is provided
  const defaultPicture = {
    Accessory: 0,
    Hair: 19,
    Eyes: 3,
    Face: 1,
    Shirt: 0,
  };

  // Use default picture if pfp is null or empty
  let picture;
  if (pfp.default) {
    picture = defaultPicture;
  } else {
    picture = pfp;
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
      <img src={shirts[picture.Shirt]} style={imageStyle} alt="shirt" />
      <img src={faces[picture.Face]} style={imageStyle} alt="face" />
      <img src={eyes[picture.Eyes]} style={imageStyle} alt="eyes" />
      <img src={hairs[picture.Hair]} style={imageStyle} alt="hair" />
      <img src={accessories[picture.Accessory]} style={imageStyle} alt="accessory" />
    </div>
  );
};

export default ProfilePicture;
