import React, { useState, useEffect } from "react";
import { get, post } from "../../../utilities";
import blueberrys from "../../../assets/tiles/blueberrys.png";
import carrots from "../../../assets/tiles/carrots.png";
import pumpkin from "../../../assets/tiles/pumpkin.png";
import tomato from "../../../assets/tiles/tomato.png";
import grassTile from "../../../assets/tiles/Grass_Tile_01.png";
import nullTile from "../../../assets/tiles/nulltile.png";
import "./Tile.css";

// Import all letter tiles
import letterA from "../../../assets/tiles/Letter_Tile_01.png";
import letterB from "../../../assets/tiles/Letter_Tile_02.png";
import letterC from "../../../assets/tiles/Letter_Tile_03.png";
import letterD from "../../../assets/tiles/Letter_Tile_04.png";
import letterE from "../../../assets/tiles/Letter_Tile_05.png";
import letterF from "../../../assets/tiles/Letter_Tile_06.png";
import letterG from "../../../assets/tiles/Letter_Tile_07.png";
import letterH from "../../../assets/tiles/Letter_Tile_08.png";
import letterI from "../../../assets/tiles/Letter_Tile_09.png";
import letterJ from "../../../assets/tiles/Letter_Tile_10.png";
import letterK from "../../../assets/tiles/Letter_Tile_11.png";
import letterL from "../../../assets/tiles/Letter_Tile_12.png";
import letterM from "../../../assets/tiles/Letter_Tile_13.png";
import letterN from "../../../assets/tiles/Letter_Tile_14.png";
import letterO from "../../../assets/tiles/Letter_Tile_15.png";
import letterP from "../../../assets/tiles/Letter_Tile_16.png";
import letterQ from "../../../assets/tiles/Letter_Tile_17.png";
import letterR from "../../../assets/tiles/Letter_Tile_18.png";
import letterS from "../../../assets/tiles/Letter_Tile_19.png";
import letterT from "../../../assets/tiles/Letter_Tile_20.png";
import letterU from "../../../assets/tiles/Letter_Tile_21.png";
import letterV from "../../../assets/tiles/Letter_Tile_22.png";
import letterW from "../../../assets/tiles/Letter_Tile_23.png";
import letterX from "../../../assets/tiles/Letter_Tile_24.png";
import letterY from "../../../assets/tiles/Letter_Tile_25.png";
import letterZ from "../../../assets/tiles/Letter_Tile_26.png";

// Import all default letter tiles
import defaultA from "../../../assets/tiles/Default_Letter_Tile_1.png";
import defaultB from "../../../assets/tiles/Default_Letter_Tile_2.png";
import defaultC from "../../../assets/tiles/Default_Letter_Tile_3.png";
import defaultD from "../../../assets/tiles/Default_Letter_Tile_4.png";
import defaultE from "../../../assets/tiles/Default_Letter_Tile_5.png";
import defaultF from "../../../assets/tiles/Default_Letter_Tile_6.png";
import defaultG from "../../../assets/tiles/Default_Letter_Tile_7.png";
import defaultH from "../../../assets/tiles/Default_Letter_Tile_8.png";
import defaultI from "../../../assets/tiles/Default_Letter_Tile_9.png";
import defaultJ from "../../../assets/tiles/Default_Letter_Tile_10.png";
import defaultK from "../../../assets/tiles/Default_Letter_Tile_11.png";
import defaultL from "../../../assets/tiles/Default_Letter_Tile_12.png";
import defaultM from "../../../assets/tiles/Default_Letter_Tile_13.png";
import defaultN from "../../../assets/tiles/Default_Letter_Tile_14.png";
import defaultO from "../../../assets/tiles/Default_Letter_Tile_15.png";
import defaultP from "../../../assets/tiles/Default_Letter_Tile_16.png";
import defaultQ from "../../../assets/tiles/Default_Letter_Tile_17.png";
import defaultR from "../../../assets/tiles/Default_Letter_Tile_18.png";
import defaultS from "../../../assets/tiles/Default_Letter_Tile_19.png";
import defaultT from "../../../assets/tiles/Default_Letter_Tile_20.png";
import defaultU from "../../../assets/tiles/Default_Letter_Tile_21.png";
import defaultV from "../../../assets/tiles/Default_Letter_Tile_22.png";
import defaultW from "../../../assets/tiles/Default_Letter_Tile_23.png";
import defaultX from "../../../assets/tiles/Default_Letter_Tile_24.png";
import defaultY from "../../../assets/tiles/Default_Letter_Tile_25.png";
import defaultZ from "../../../assets/tiles/Default_Letter_Tile_26.png";

const letterTiles = {
  A: letterA,
  B: letterB,
  C: letterC,
  D: letterD,
  E: letterE,
  F: letterF,
  G: letterG,
  H: letterH,
  I: letterI,
  J: letterJ,
  K: letterK,
  L: letterL,
  M: letterM,
  N: letterN,
  O: letterO,
  P: letterP,
  Q: letterQ,
  R: letterR,
  S: letterS,
  T: letterT,
  U: letterU,
  V: letterV,
  W: letterW,
  X: letterX,
  Y: letterY,
  Z: letterZ,
};

const defaultLetterTiles = {
  A: defaultA,
  B: defaultB,
  C: defaultC,
  D: defaultD,
  E: defaultE,
  F: defaultF,
  G: defaultG,
  H: defaultH,
  I: defaultI,
  J: defaultJ,
  K: defaultK,
  L: defaultL,
  M: defaultM,
  N: defaultN,
  O: defaultO,
  P: defaultP,
  Q: defaultQ,
  R: defaultR,
  S: defaultS,
  T: defaultT,
  U: defaultU,
  V: defaultV,
  W: defaultW,
  X: defaultX,
  Y: defaultY,
  Z: defaultZ,
};

const getLetterTile = (letter, isDefault) => {
  return isDefault ? defaultLetterTiles[letter] : letterTiles[letter];
};

const getCropImage = (cropType) => {
  console.log("Crop type:", cropType);
  switch (cropType.toLowerCase()) {
    case "blueberries":
      return blueberrys;
    case "carrots":
      return carrots;
    case "pumpkins":
      return pumpkin;
    case "tomatoes":
      return tomato;
    default:
      console.log("No matching crop found for:", cropType);
      return null;
  }
};

const Tile = (props) => {
  const [isAnimating, setIsAnimating] = useState(true);

  const checkEndpoint = (params) => {
    console.log("Checking endpoint:", params);
    if (params.isEndpoint) {
      console.log("Endpoint found at:", params.x, params.y);
    } else {
      console.log("No endpoint found at:", params.x, params.y);
    }
  };

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [props.cell.letter]);

  return (
    <div 
      className={`tile ${props.cell.visited ? "visited" : ""}`}
      
    >
      <img src={grassTile} alt="grass" className="grass-background" />
      {!props.cell.letter && <img src={nullTile} alt="null" className="tile-background" />}
      {props.cell.letter && (
        <img
          src={getLetterTile(props.cell.letter, props.cell.default)}
          alt={props.cell.letter}
          className={`letter-tile ${isAnimating ? "falling" : ""}`}
          onClick={() => checkEndpoint({ isEndpoint: props.isEndpoint, x: props.x, y: props.y }
        />
      )}
      {props.cell.crop && (
        <img src={getCropImage(props.cell.crop)} alt={props.cell.crop} className="crop-image" />
      )}
    </div>
  );
};

export default Tile;
