import React, { useState, useEffect } from "react";
import { socket } from "../../../client-socket";
import { get, post } from "../../../utilities";
import Tile from "./Tile";
import "./Board.css";

/**
 * Renders a game board as a grid of Tile components
 *
 * The board is rendered as a series of rows, each containing tile components.
 * Each tile can be:
 * - Empty (showing a null tile)
 * - Contain a letter (showing a letter tile)
 * - Be part of a suggestion (showing suggested letters)
 * - Be visited (showing visited styling)
 * - Be an endpoint (allowing word formation to start from it)
 *
 * @param {Object} params - Parameters for board rendering
 * @param {Array<Array<Object>>} params.board - 2D array representing the game board
 * @param {Array<Array<number>>} params.endpoints - Array of [x, y] coordinates for valid endpoints
 * @param {boolean} params.endPointSelected - Whether an endpoint is currently selected
 * @param {Function} params.setEndPointSelected - Updates endpoint selection state
 * @param {Function} params.setSelectedX - Updates selected X coordinate
 * @param {Function} params.setSelectedY - Updates selected Y coordinate
 * @param {String} params.suggestedWord - Currently inputted word
 * @param {Function} params.setSuggestions - Function to update suggestions state
 * @returns {Array<JSX.Element>} Array of row elements containing tiles
 */
const renderBoard = (params) => {
  let list_of_rows = [];
  for (let i = 0; i < params.board.length; i++) {
    let rowcomponents = [];
    for (let j = 0; j < params.board[i].length; j++) {
      let cell = params.board[i][j];

      const coords = [j, i];
      const isEndpoint = params.endpoints.some(([a, b]) => a === coords[0] && b === coords[1]);

      rowcomponents.push(
        <Tile
          cell={cell}
          tileX={j}
          tileY={i}
          key={`${i}-${j}`}
          isEndpoint={isEndpoint}
          endPointSelected={params.endPointSelected}
          setEndPointSelected={params.setEndPointSelected}
          selectedX={params.selectedX}
          selectedY={params.selectedY}
          setSelectedX={params.setSelectedX}
          setSelectedY={params.setSelectedY}
          suggestedWord={params.suggestedWord}
          setSuggestions={params.setSuggestions}
        />
      );
    }
    list_of_rows.push(
      <div className="board-row" key={`row-${i}`}>
        {rowcomponents}
      </div>
    );
  }
  return list_of_rows;
};

/**
 * Board Component - Manages the game board state and interactions
 *
 * The Board component is responsible for:
 * 1. Maintaining and displaying the game board state
 * 2. Handling socket events for suggestions
 * 3. Managing the display of suggested words on the board
 * 4. Coordinating tile interactions for word formation
 *
 * The board state includes:
 * - The current state of each tile (letters, crops, visited status)
 * - Valid endpoints for word formation
 * - Suggested words and their positions
 * - Selected tile coordinates
 *
 * @param {Object} props
 * @param {Array<Array<Object>>} props.board - 2D array representing current board state
 * @param {Array<Array<number>>} props.endpoints - Valid endpoints for word formation
 * @param {boolean} props.endPointSelected - Whether an endpoint is currently selected
 * @param {Function} props.setEndPointSelected - Updates endpoint selection state
 * @param {number} props.selectedX - Currently selected X coordinate
 * @param {number} props.selectedY - Currently selected Y coordinate
 * @param {Function} props.setSelectedX - Updates selected X coordinate
 * @param {Function} props.setSelectedY - Updates selected Y coordinate
 * @param {String} props.suggestedWord - Currently inputted word
 * @param {Function} props.setSuggestions - Function to update suggestions state
 * @param {Array<Object>} props.suggestions - Array of word suggestions
 */
const Board = (props) => {
  // State for word suggestions and board display
  const [display, setDisplay] = useState(
    renderBoard({
      board: props.board,
      endpoints: props.endpoints,
      endPointSelected: props.endPointSelected,
      setEndPointSelected: props.setEndPointSelected,
      selectedX: props.selectedX,
      selectedY: props.selectedY,
      setSelectedX: props.setSelectedX,
      setSelectedY: props.setSelectedY,
      suggestedWord: "",
      setSuggestions: props.setSuggestions,
    })
  );
  const [validWord, setValidWord] = useState(false);

  // Set up socket listener for suggestions
  useEffect(() => {
    const suggestionModifier = (info) => {
      console.log("Suggestions:", info.suggestions);
      props.setSuggestions(info.suggestions);
      setValidWord(info.validWord);
    };

    socket.on("suggestions", suggestionModifier);

    // Update board using letters updated

    // params.lettersUpdated

    return () => {
      socket.off("suggestions", suggestionModifier);
    };
  }, []);

  // Update display when board changes
  useEffect(() => {
    setDisplay(
      renderBoard({
        board: props.board,
        endpoints: props.endpoints,
        endPointSelected: props.endPointSelected,
        setEndPointSelected: props.setEndPointSelected,
        selectedX: props.selectedX,
        selectedY: props.selectedY,
        setSelectedX: props.setSelectedX,
        setSelectedY: props.setSelectedY,
        suggestedWord: "",
        setSuggestions: props.setSuggestions,
      })
    );
  }, [props.board]);

  // Handle suggestion display
  useEffect(() => {
    if (props.suggestions.length > 0) {
      // Create a deep copy of the board to modify
      const boardCopy = JSON.parse(JSON.stringify(props.board));

      // Get the suggested word
      const suggestedWord = props.suggestions[0]
        ? props.suggestions[0].map(([x, y, letter]) => letter).join("")
        : "";

      // Update board with suggested letters
      props.suggestions.forEach((suggestion) => {
        suggestion.forEach(([x, y, letter], index) => {
          // If it's an empty tile or matches the suggested letter
          if (boardCopy[y][x].letter === "" || boardCopy[y][x].letter === letter) {
            if (boardCopy[y][x].letter === "") {
              boardCopy[y][x].letter = letter;
            }
            boardCopy[y][x].isSuggestion = true;
            boardCopy[y][x].isSuggestionEnd = index === suggestion.length - 1;
          }
        });
      });

      // Update display with the modified board
      setDisplay(
        renderBoard({
          board: boardCopy,
          endpoints: props.endpoints,
          endPointSelected: props.endPointSelected,
          setEndPointSelected: props.setEndPointSelected,
          selectedX: props.selectedX,
          selectedY: props.selectedY,
          setSelectedX: props.setSelectedX,
          setSelectedY: props.setSelectedY,
          suggestedWord: suggestedWord,
          setSuggestions: props.setSuggestions,
        })
      );
    } else {
      // Reset to original board when no suggestions
      setDisplay(
        renderBoard({
          board: props.board,
          endpoints: props.endpoints,
          endPointSelected: props.endPointSelected,
          setEndPointSelected: props.setEndPointSelected,
          selectedX: props.selectedX,
          selectedY: props.selectedY,
          setSelectedX: props.setSelectedX,
          setSelectedY: props.setSelectedY,
          suggestedWord: "",
          setSuggestions: props.setSuggestions,
        })
      );
    }
  }, [props.suggestions]);

  return <div className="board-container">{display}</div>;
};

export default Board;
