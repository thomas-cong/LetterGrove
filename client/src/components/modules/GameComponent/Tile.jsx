import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { get, post } from "../../../utilities";
import { socket } from "../../../client-socket";
import "./Tile.css";

// Import crop tile images
import cherry from "../../../assets/Tiles/cherry.png";
import crate from "../../../assets/Tiles/fruitcrate.png";
import orange from "../../../assets/Tiles/orange.png";
import grape from "../../../assets/Tiles/grape.png";
import grassTile from "../../../assets/Tiles/Grass_Tile_01.png";
import nullTile from "../../../assets/Tiles/NullTile.png";

// Import all letter and default letter tile images
import letterA from "../../../assets/Tiles/Letter_Tile_01.png";
import letterB from "../../../assets/Tiles/Letter_Tile_02.png";
import letterC from "../../../assets/Tiles/Letter_Tile_03.png";
import letterD from "../../../assets/Tiles/Letter_Tile_04.png";
import letterE from "../../../assets/Tiles/Letter_Tile_05.png";
import letterF from "../../../assets/Tiles/Letter_Tile_06.png";
import letterG from "../../../assets/Tiles/Letter_Tile_07.png";
import letterH from "../../../assets/Tiles/Letter_Tile_08.png";
import letterI from "../../../assets/Tiles/Letter_Tile_09.png";
import letterJ from "../../../assets/Tiles/Letter_Tile_10.png";
import letterK from "../../../assets/Tiles/Letter_Tile_11.png";
import letterL from "../../../assets/Tiles/Letter_Tile_12.png";
import letterM from "../../../assets/Tiles/Letter_Tile_13.png";
import letterN from "../../../assets/Tiles/Letter_Tile_14.png";
import letterO from "../../../assets/Tiles/Letter_Tile_15.png";
import letterP from "../../../assets/Tiles/Letter_Tile_16.png";
import letterQ from "../../../assets/Tiles/Letter_Tile_17.png";
import letterR from "../../../assets/Tiles/Letter_Tile_18.png";
import letterS from "../../../assets/Tiles/Letter_Tile_19.png";
import letterT from "../../../assets/Tiles/Letter_Tile_20.png";
import letterU from "../../../assets/Tiles/Letter_Tile_21.png";
import letterV from "../../../assets/Tiles/Letter_Tile_22.png";
import letterW from "../../../assets/Tiles/Letter_Tile_23.png";
import letterX from "../../../assets/Tiles/Letter_Tile_24.png";
import letterY from "../../../assets/Tiles/Letter_Tile_25.png";
import letterZ from "../../../assets/Tiles/Letter_Tile_26.png";

import defaultA from "../../../assets/Tiles/Default_Letter_Tile_1.png";
import defaultB from "../../../assets/Tiles/Default_Letter_Tile_2.png";
import defaultC from "../../../assets/Tiles/Default_Letter_Tile_3.png";
import defaultD from "../../../assets/Tiles/Default_Letter_Tile_4.png";
import defaultE from "../../../assets/Tiles/Default_Letter_Tile_5.png";
import defaultF from "../../../assets/Tiles/Default_Letter_Tile_6.png";
import defaultG from "../../../assets/Tiles/Default_Letter_Tile_7.png";
import defaultH from "../../../assets/Tiles/Default_Letter_Tile_8.png";
import defaultI from "../../../assets/Tiles/Default_Letter_Tile_9.png";
import defaultJ from "../../../assets/Tiles/Default_Letter_Tile_10.png";
import defaultK from "../../../assets/Tiles/Default_Letter_Tile_11.png";
import defaultL from "../../../assets/Tiles/Default_Letter_Tile_12.png";
import defaultM from "../../../assets/Tiles/Default_Letter_Tile_13.png";
import defaultN from "../../../assets/Tiles/Default_Letter_Tile_14.png";
import defaultO from "../../../assets/Tiles/Default_Letter_Tile_15.png";
import defaultP from "../../../assets/Tiles/Default_Letter_Tile_16.png";
import defaultQ from "../../../assets/Tiles/Default_Letter_Tile_17.png";
import defaultR from "../../../assets/Tiles/Default_Letter_Tile_18.png";
import defaultS from "../../../assets/Tiles/Default_Letter_Tile_19.png";
import defaultT from "../../../assets/Tiles/Default_Letter_Tile_20.png";
import defaultU from "../../../assets/Tiles/Default_Letter_Tile_21.png";
import defaultV from "../../../assets/Tiles/Default_Letter_Tile_22.png";
import defaultW from "../../../assets/Tiles/Default_Letter_Tile_23.png";
import defaultX from "../../../assets/Tiles/Default_Letter_Tile_24.png";
import defaultY from "../../../assets/Tiles/Default_Letter_Tile_25.png";
import defaultZ from "../../../assets/Tiles/Default_Letter_Tile_26.png";

/**
 * Maps letters to their corresponding tile images
 * Used for rendering the correct letter tile based on the cell's letter value
 */
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

/**
 * Maps letters to their corresponding default tile images
 * Used when a letter tile needs to be shown in its default state
 */
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

/**
 * Gets the appropriate letter tile image based on the letter and whether it should use default styling
 * @param {string} letter - The letter to display (A-Z)
 * @param {boolean} isDefault - If true, uses the default (grey) version of the letter tile
 * @returns {string} Path to the appropriate letter tile image
 */
const getLetterTile = (letter, isDefault) => {
  if (!letter) return null;
  letter = letter.toUpperCase();
  return isDefault ? defaultLetterTiles[letter] : letterTiles[letter];
};

/**
 * Gets the appropriate crop tile image based on the crop type
 * @param {string} cropType - The type of crop to display (blueberries, carrots, pumpkins, tomatoes)
 * @returns {string} Path to the crop image, or null if crop type is invalid
 */
const getCropImage = (cropType) => {
  switch (cropType.toLowerCase()) {
    case "cherry":
      return cherry;
    case "grape":
      return grape;
    case "orange":
      return orange;
    case "crate":
      return crate;
    default:
      return null;
  }
};

/**
 * Tile Component - Represents a single tile on the game board
 *
 * Each tile can contain:
 * - A background (grass)
 * - A letter (either placed or suggested)
 * - A crop (if planted)
 *
 * The tile can be:
 * - Empty (showing null tile)
 * - Contain a letter (showing letter tile)
 * - Be part of a suggestion (showing letter with suggestion styling)
 * - Be visited (showing visited styling)
 * - Be an endpoint (can be clicked to start word formation)
 *
 * @param {Object} props
 * @param {Object} props.cell - Contains tile state information
 * @param {string} props.cell.letter - The letter on this tile (if any)
 * @param {boolean} props.cell.visited - Whether this tile has been used in a word
 * @param {boolean} props.cell.default - Whether to use default styling for the letter
 * @param {boolean} props.cell.isSuggestion - Whether this tile is part of a suggestion
 * @param {boolean} props.cell.isSuggestionEnd - Whether this tile is the end of a suggestion
 * @param {string} props.cell.crop - The type of crop on this tile (if any)
 * @param {number} props.tileX - X coordinate of the tile on the board
 * @param {number} props.tileY - Y coordinate of the tile on the board
 * @param {number} props.selectedX - Currently selected X coordinate
 * @param {number} props.selectedY - Currently selected Y coordinate
 * @param {boolean} props.isEndpoint - Whether this tile can be used as a word endpoint
 * @param {boolean} props.endPointSelected - Whether any endpoint is currently selected
 * @param {Function} props.setEndPointSelected - Updates endpoint selection state
 * @param {Function} props.setSelectedX - Updates selected X coordinate
 * @param {Function} props.setSelectedY - Updates selected Y coordinate
 * @param {string} props.suggestedWord - Currently inputted words
 * @param {Function} props.setSuggestions - Function to update suggestions state
 */
const Tile = (props) => {
  const isSelected =
    props.tileX === props.selectedX && props.tileY === props.selectedY && props.isEndpoint;
  let { lobbyId } = useParams();
  // Animation state for letter appearance
  const [isAnimating, setIsAnimating] = useState(true);

  // Add keyboard event listener for selected tile
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isSelected && props.suggestedWord.length > 0) {
        props.setSuggestions([]);
        props.setEndPointSelected(false);
      }
    };

    if (isSelected) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isSelected, props.suggestedWord, props.setSuggestions, props.setEndPointSelected]);

  const cancelSuggestions = () => {
    if (!isSelected || props.suggestedWord.length === 0) {
      return;
    } else {
      props.setSuggestions([]);
      props.setEndPointSelected(false);
    }
  };

  /**
   * Handles tile clicks to check if it's a valid endpoint
   * Updates game state with selected coordinates if valid
   * @param {Object} params Parameters for endpoint checking
   * @param {boolean} params.isEndpoint Whether this tile is a valid endpoint
   * @param {number} params.tileX X coordinate of clicked tile
   * @param {number} params.tileY Y coordinate of clicked tile
   * @param {boolean} params.isSuggestionEnd Whether this tile is the end of a suggestion
   */

  const checkEndpoint = (params) => {
    cancelSuggestions();
    console.log(!props.cell.letter || (props.cell.letter && props.cell.default));
    console.log("tile info:", params);
    if (params.isEndpoint) {
      console.log("Endpoint found at:", params.tileX, params.tileY);
      props.setEndPointSelected(true);
      props.setSelectedX(params.tileX);
      props.setSelectedY(params.tileY);
    } else {
      console.log("No endpoint found at:", params.tileX, params.tileY);
      props.setEndPointSelected(false);
    }
    if (params.isSuggestionEnd) {
      // Calculate the difference between the clicked tile and the selected tile to get direction
      let x_diff = Math.sign(params.tileX - props.selectedX);
      let y_diff = Math.sign(params.tileY - props.selectedY);
      console.log(x_diff, y_diff);

      // Emit console signal to confirm word.
      socket.emit("confirm word", {
        lobbyCode: lobbyId,
        x: props.selectedX,
        y: props.selectedY,
        x_one_step: x_diff,
        y_one_step: y_diff,
        word: props.suggestedWord,
      });
    } else {
      return;
    }
  };

  // Reset animation when letter changes
  useEffect(() => {
    // If the tile is a suggestion, don't animate

    if (props.cell.isSuggestion) {
      setIsAnimating(false);
    } else {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [props.cell.letter]);

  // Use dynamic class names for styling tiles
  return (
    <div
      className={`tile ${props.cell.visited ? "visited" : ""} ${
        props.cell.isSuggestion ? "suggestion" : ""
      } ${props.cell.isSuggestionEnd ? "suggestion-end" : ""}`}
    >
      <img src={grassTile} alt="grass" className="grass-background" />
      {(!props.cell.letter || (props.cell.letter && props.cell.default)) && (
        <img src={nullTile} alt="null" className="tile-background" />
      )}
      {props.cell.letter && (
        <img
          src={getLetterTile(props.cell.letter, !props.cell.isSuggestion && props.cell.default)}
          alt={props.cell.letter}
          className={`letter-tile ${isAnimating ? "falling" : ""} ${
            props.cell.isSuggestion ? "suggestion-letter" : ""
          } ${props.cell.isSuggestionEnd ? "suggestion-end-letter" : ""}`}
          onClick={() =>
            checkEndpoint({
              isEndpoint: props.isEndpoint,
              isSuggestionEnd: props.cell.isSuggestionEnd,
              tileX: props.tileX,
              tileY: props.tileY,
            })
          }
        />
      )}
      {/* Crop image overlay shown when a crop is planted (z-index: 4) */}
      {props.cell.crop && (
        <img
          src={getCropImage(props.cell.crop)}
          alt={props.cell.crop}
          className={`crop-tile ${props.cell.isSuggestion ? "suggestion-letter" : ""} ${
            props.cell.isSuggestionEnd ? "suggestion-end-letter" : ""
          }`}
          onClick={() =>
            checkEndpoint({
              isEndpoint: props.isEndpoint,
              isSuggestionEnd: props.cell.isSuggestionEnd,
              tileX: props.tileX,
              tileY: props.tileY,
            })
          }
        />
      )}
    </div>
  );
};

export default Tile;
