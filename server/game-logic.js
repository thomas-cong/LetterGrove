/*
|--------------------------------------------------------------------------
| Constants and Game Configuration
|--------------------------------------------------------------------------
|
| These constants define the core game mechanics and scoring system:
| - Letter frequencies and values based on Scrabble-like distribution
| - Crop and powerup spawn rates
| - Board dimensions and difficulty settings
*/

const ARRAY_SIZE = 15;

// Game state storage
const games = {};

// Scrabble-like letter distribution (100 tiles total)
const letterDistribution = {
  // Common consonants (heavily weighted)
  N: 7,
  R: 7,
  S: 7,
  T: 7,
  L: 6,
  D: 6,
  M: 6,

  // Medium consonants
  B: 3,
  C: 3,
  F: 3,
  G: 3,
  H: 3,
  P: 3,

  // Vowels (balanced)
  E: 6,
  A: 5,
  I: 4,
  O: 3,
  U: 2,

  // Less common consonants
  V: 3,
  W: 3,
  Y: 3,

  // Rare letters (minimal)
  K: 1,
  J: 1,
  X: 1,
  Q: 2,
  Z: 2,
};

// Point values for each letter
const letterValues = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 7,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 9,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 6,
  W: 4,
  X: 8,
  Y: 5,
  Z: 9,
};

// Point values for crop items
const cropValues = {
  cherry: 2,
  grape: 5,
  orange: 10,
  crate: 20,
};

/*
|--------------------------------------------------------------------------
| Helper Functions
|--------------------------------------------------------------------------
*/

/**
 * Generates a random letter based on Scrabble-like distribution
 * @returns {string} A randomly selected letter
 */
const generateRandomLetter = () => {
  // Create a pool of letters based on Scrabble-like distribution
  const letterPool = [];
  for (const [letter, weight] of Object.entries(letterDistribution)) {
    // More common letters should appear more often
    const frequency = weight;
    letterPool.push(...Array(frequency).fill(letter));
  }
  return letterPool[Math.floor(Math.random() * letterPool.length)];
};

/**
 * Creates a function that generates random board positions with weighted distribution
 * Higher row/column numbers have higher probability of being selected
 * @param {number} size - Size of the game board
 * @returns {Function} Function that returns [row, col] when called
 */
const createRandomPositionGenerator = (size) => {
  // Create a pool of all possible positions and shuffle them
  const positions = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      positions.push([i, j]);
    }
  }
  // Fisher-Yates shuffle
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  let currentIndex = 0;
  return () => positions[currentIndex++];
};

/**
 * Checks if a position has any adjacent letters in all 8 directions
 * @param {number} row - Row index to check
 * @param {number} col - Column index to check
 * @param {Array} board - Game board
 * @param {number} ARRAY_SIZE - Size of the game board
 * @returns {boolean} True if position has adjacent letters
 */
const hasAdjacentLetter = (row, col, board, ARRAY_SIZE) => {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;
    if (
      newRow >= 0 &&
      newRow < ARRAY_SIZE &&
      newCol >= 0 &&
      newCol < ARRAY_SIZE &&
      board[newRow][newCol].letter !== ""
    ) {
      return true;
    }
  }
  return false;
};

/**
 * Checks if a tile is empty (no letter, crop, or powerup)
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @param {Array} board - Game board
 * @param {number} ARRAY_SIZE - Board dimensions
 * @returns {boolean} True if tile is empty
 */
const isEmptyTile = (row, col, board, ARRAY_SIZE) => {
  return (
    board[row][col].letter === "" &&
    board[row][col].crop === null &&
    board[row][col].powerUp === null
  );
};

/*
|--------------------------------------------------------------------------
| Main Game Logic
|--------------------------------------------------------------------------
*/

/**
 * Generates a random game board based on difficulty settings
 * @param {Object} props - Game configuration including:
 *   - difficulty: Easy/Medium/Hard affects letter count and item spawns
 *   - playerCount: Number of players affects resource distribution
 *   - sameBoard: If true, all players see identical board
 * @returns {Object} Generated board and starting positions
 */
const randomlyGenerateBoard = (props) => {
  const DIFFICULTY = props.difficulty;
  const sameBoard = props.sameBoard;
  const playerCount = props.playerCount;
  let LETTER_COUNT;
  const CROPS = ["cherry", "grape", "orange", "crate"];
  const POWERUPS = ["wateringCan", "twoTimes"];
  let CROP_COUNTS;
  let POWERUP_COUNTS;
  const ARRAY_SIZE = 15;

  if (DIFFICULTY === "Easy") {
    LETTER_COUNT = 25;
    CROP_COUNTS = {
      cherry: 2,
      grape: 2,
      orange: 2,
      crate: 2,
    };
    POWERUP_COUNTS = {
      wateringCan: 1,
      twoTimes: 1,
    };
  } else if (DIFFICULTY === "Medium") {
    LETTER_COUNT = 25;
    CROP_COUNTS = {
      cherry: 1,
      grape: 1,
      orange: 1,
      crate: 1,
    };
    POWERUP_COUNTS = {
      wateringCan: 1,
      twoTimes: 1,
    };
  } else if (DIFFICULTY === "Hard") {
    LETTER_COUNT = 35;
    CROP_COUNTS = {
      cherry: 1,
      grape: 1,
      orange: 1,
      crate: 1,
    };
    POWERUP_COUNTS = {
      wateringCan: 1,
      twoTimes: 1,
    };
  }

  // Initialize empty board
  const board = Array(ARRAY_SIZE)
    .fill()
    .map(() =>
      Array(ARRAY_SIZE)
        .fill()
        .map(() => ({
          letter: "",
          powerUp: null,
          crop: null,
          default: false,
          value: 0,
          visited: false,
        }))
    );

  // Place first letter in top-left corner
  const generateStartingLetter = () => {
    while (true) {
      const letter = generateRandomLetter();
      if (letter !== "J" && letter !== "Q" && letter !== "X" && letter !== "Y" && letter !== "Z") {
        return letter;
      }
    }
  };

  const firstLetter = generateStartingLetter();
  board[0][0] = {
    letter: firstLetter,
    powerUp: null,
    crop: null,
    default: true,
    value: letterValues[firstLetter],
    visited: true,
  };

  if (playerCount > 1 && sameBoard) {
    const secondLetter = generateStartingLetter();
    board[14][14] = {
      letter: secondLetter,
      powerUp: null,
      crop: null,
      default: true,
      value: letterValues[secondLetter],
      visited: true,
    };
  }

  if (playerCount > 2 && sameBoard) {
    const thirdLetter = generateStartingLetter();
    board[14][0] = {
      letter: thirdLetter,
      powerUp: null,
      crop: null,
      default: true,
      value: letterValues[thirdLetter],
      visited: true,
    };
  }

  if (playerCount > 3 && sameBoard) {
    const fourthLetter = generateStartingLetter();
    board[0][14] = {
      letter: fourthLetter,
      powerUp: null,
      crop: null,
      default: true,
      value: letterValues[fourthLetter],
      visited: true,
    };
  }

  // Place remaining letters
  let remainingLetters;
  if (!sameBoard) {
    remainingLetters = LETTER_COUNT - 1;
  } else {
    remainingLetters = LETTER_COUNT - playerCount;
  }
  const generatePosition = createRandomPositionGenerator(ARRAY_SIZE);
  let attempts = 0;
  const MAX_ATTEMPTS = 1000;
  console.log("remainingLetters: " + remainingLetters);

  // Track available positions for crops and powerups
  const availablePositions = new Set();
  for (let i = 0; i < ARRAY_SIZE; i++) {
    for (let j = 0; j < ARRAY_SIZE; j++) {
      if (i !== 0 || j !== 0) {
        // Skip first position
        availablePositions.add(`${i},${j}`);
      }
    }
  }

  while (remainingLetters > 0 && attempts < MAX_ATTEMPTS) {
    const [row, col] = generatePosition();
    if (board[row][col].letter === "" && !hasAdjacentLetter(row, col, board, ARRAY_SIZE)) {
      const letter = generateRandomLetter();
      board[row][col] = {
        letter,
        powerUp: null,
        crop: null,
        default: true,
        value: letterValues[letter],
        visited: false,
      };
      availablePositions.delete(`${row},${col}`);
      remainingLetters--;
    }
    attempts++;
  }

  // Place crops in remaining spaces
  for (const crop of CROPS) {
    let remainingCrop = CROP_COUNTS[crop];
    const positions = Array.from(availablePositions);

    while (remainingCrop > 0 && positions.length > 0) {
      const randomIndex = Math.floor(Math.random() * positions.length);
      const [row, col] = positions[randomIndex].split(",").map(Number);

      board[row][col].crop = crop;
      board[row][col].value = cropValues[crop];

      positions.splice(randomIndex, 1);
      availablePositions.delete(`${row},${col}`);
      remainingCrop--;
    }
  }

  // Place powerups in remaining spaces
  for (const powerup of POWERUPS) {
    let remainingPowerUp = POWERUP_COUNTS[powerup];
    const positions = Array.from(availablePositions);

    while (remainingPowerUp > 0 && positions.length > 0) {
      const randomIndex = Math.floor(Math.random() * positions.length);
      const [row, col] = positions[randomIndex].split(",").map(Number);

      board[row][col].powerUp = powerup;

      positions.splice(randomIndex, 1);
      availablePositions.delete(`${row},${col}`);
      remainingPowerUp--;
    }
  }

  console.log("Current Board State:");
  console.log(board.map((row) => row.map((cell) => cell.letter || "_").join(" ")).join("\n"));

  return board;
};

const deepCopyBoard = (board) => {
  return JSON.parse(JSON.stringify(board));
};

/**
 * Finds all possible word suggestions from a given position
 * @param {string} word - Current word being formed
 * @param {number} x - Starting x coordinate
 * @param {number} y - Starting y coordinate
 * @param {Array} board - Game board
 * @returns {Array} List of valid word suggestions and their paths
 */
const enterWord = (userId, props) => {
  const x = props.x;
  const y = props.y;
  const word = props.word;
  const lobbyCode = props.lobbyCode;
  const board = games[lobbyCode].userGameStates[userId].board;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  const suggestions = [];

  // Check each direction
  direction: for (const [dx, dy] of directions) {
    let lastX = x + dx * (word.length - 1);
    let lastY = y + dy * (word.length - 1);
    if (lastX >= 0 && lastX < 15 && lastY >= 0 && lastY < 15) {
      let suggestion = [];
      let currentX = x;
      let currentY = y;
      for (let i = 0; i < word.length; i++) {
        console.log("Board Tile:", board[currentY][currentX].letter);
        console.log("Word Tile:", word[i]);

        // use the y first, since it is getting the row then getting the column
        if (
          board[currentY][currentX].letter !== "" &&
          board[currentY][currentX].letter !== word[i]
        ) {
          // If doesn't work out, go next direction
          continue direction;
        }
        // If works out, add to suggestion, move to next tile in same direction
        console.log("Letter matched:", currentX, currentY, "Letter:", word[i]);
        suggestion.push([currentX, currentY, word[i]]);
        currentX += dx;
        currentY += dy;
      }
      // Add word to suggestions
      suggestions.push(suggestion);
    }
  }
  if (validWord(word, games[lobbyCode].minWordLength)) {
    return {
      suggestions: suggestions,
      validWord: true,
    };
  } else {
    return {
      suggestions: suggestions,
      validWord: false,
    };
  }
};

const { isValidWord } = require("./dictionary");

const validWord = (word, minWordLength) => {
  if (word.length < minWordLength) {
    return false;
  }
  return isValidWord(word);
};

/**
 * Processes a completed word and updates game state
 * @param {string} userId - ID of player completing the word
 * @param {Object} props - Contains:
 *   - word: Completed word
 *   - letterUpdates: Path of letters used
 *   - game: Current game state
 * @returns {Object} Updated game state including:
 *   - Points gained
 *   - Crops/powerups collected
 *   - Board updates
 *   - New rankings
 */
const confirmWord = (userId, props) => {
  const lobbyCode = props.lobbyCode;
  const x = props.x;
  const y = props.y;
  const x_one_step = props.x_one_step;
  const y_one_step = props.y_one_step;
  const word = props.word;
  const game = games[lobbyCode];
  const userGameState = game.userGameStates[userId];
  const board = userGameState.board;
  const mode = game.mode;
  const [dx, dy] = [x_one_step, y_one_step];
  if (!validWord(word, game.minWordLength)) {
    if (word.length < game.minWordLength) {
      return {
        error: "Word too short",
      };
    }
    return {
      error: "Not a valid word",
    };
  }
  let currentX = x;
  let currentY = y;
  let cropsCollected = {
    cherry: 0,
    grape: 0,
    orange: 0,
    crate: 0,
  };
  let powerupsCollected = {
    wateringCan: 0,
    twoTimes: 0,
  };
  let pointsGained = 0;
  let letterUpdates = [];
  console.log();
  for (let i = 0; i < word.length; i++) {
    console.log(
      "x: " + currentX + " y: " + currentY + " board: " + board[currentY][currentX].letter
    );
    if (i === 0) {
      currentX += dx;
      currentY += dy;
      continue;
    }
    letterUpdates.push({
      x: currentX,
      y: currentY,
      letter: word[i],
      default: board[currentY][currentX].default,
      visited: board[currentY][currentX].visited,
    });
    board[currentY][currentX].visited = true;
    board[currentY][currentX].letter = word[i];
    if (i === word.length - 1) {
      userGameState.endpoints.push([currentX, currentY]);
    }
    if (board[currentY][currentX].powerUp !== null) {
      powerup = board[currentY][currentX].powerUp;
      userGameState.powerups[powerup] += 1;
      board[currentY][currentX].powerUp = null;
      powerupsCollected[powerup] += 1;
    }
    if (board[currentY][currentX].crop !== null) {
      console.log("Crop Found: " + board[currentY][currentX].crop);
      crop = board[currentY][currentX].crop;
      board[currentY][currentX].crop = null;
      cropsCollected[crop] += 1;
    }
    if (board[currentY][currentX].value > 0) {
      pointsGained += board[currentY][currentX].value;
      board[currentY][currentX].value = 0;
    }
    currentX += dx;
    currentY += dy;
  }

  /*
    |--------------------------------------------------------------------------
    | Powerup Effects
    |--------------------------------------------------------------------------
    |
    | Two Times (⭐):
    | - Doubles the points gained from the current word
    | - Multiple Two Times powerups stack multiplicatively
    |
    | Watering Can (🌧):
    | - Plants 3 new crops randomly on empty tiles
    | - One of each crop type: cherry, grape, and orange
    | - Only places on tiles without letters, crops, or powerups
    */

  // Apply Two Times powerup effect
  for (i = 0; i < powerupsCollected.twoTimes; i++) {
    userGameState.powerupsUsed += 1;
    pointsGained *= 2;
  }
  userGameState.points += pointsGained;

  // Apply Watering Can powerup effect
  let cropUpdates = [];
  for (i = 0; i < powerupsCollected.wateringCan; i++) {
    userGameState.powerupsUsed += 1;
    let randomPositionGenerator = createRandomPositionGenerator(15);
    console.log("randomPositionGenerator: ", randomPositionGenerator());

    // Place each crop type once
    const cropTypes = ["cherry", "grape", "orange"];
    for (const cropType of cropTypes) {
      while (true) {
        let [randomX, randomY] = randomPositionGenerator();
        console.log("randomX: ", randomX, " randomY: ", randomY);
        if (isEmptyTile(randomY, randomX, board, 15)) {
          cropUpdates.push({
            x: randomX,
            y: randomY,
            crop: cropType,
          });
          // Apply the crop to the board immediately
          board[randomY][randomX].crop = cropType;
          board[randomY][randomX].value = cropValues[cropType];
          break;
        }
      }
    }
  }

  /*
    |--------------------------------------------------------------------------
    | Game State Updates
    |--------------------------------------------------------------------------
    |
    | After processing word and powerups:
    | 1. Update log with points and items collected
    | 2. Recalculate player rankings
    | 3. Update game mode specific counters (words/time remaining)
    */

  let logMessages = [];
  if (pointsGained > 0) {
    logMessages.push({
      userId: userId,
      username: userGameState.username,
      pointsGained: pointsGained,
    });
    // logMessages.push(userGameState.username + " collected " + pointsGained + " points");
  }

  /*
    Remake rankings
  */

  for (const rankInfo of game.rankings) {
    if (rankInfo.playerId === userId) {
      rankInfo.score = userGameState.points;
      break;
    }
  }
  game.rankings.sort((a, b) => b.score - a.score);
  if (game.mode === "Points") {
    if (userGameState.points >= game.pointsToWin) {
      game.gameStatus = "ended";
    }
  }
  userGameState.lettersCollected += word.length;
  userGameState.wordsFormed += 1;
  if (mode === "Words") userGameState.wordsRemaining -= 1;
  userGameState.endpoints.push([currentX - dx, currentY - dy]);
  game.log.push(...logMessages);

  // Log the board state after word confirmation
  console.log("\nBoard State after word confirmation:");
  console.log("Word:", word);
  console.log("Points gained:", pointsGained);
  let boardLog = "";
  for (let i = 0; i < ARRAY_SIZE; i++) {
    let row = "";
    for (let j = 0; j < ARRAY_SIZE; j++) {
      let cell = board[i][j];
      let symbol = ".";
      if (cell.letter) {
        symbol = cell.letter;
      } else if (cell.powerUp) {
        symbol = "*";
      } else if (cell.crop) {
        symbol = "/";
      }
      row += symbol.padEnd(3);
    }
    boardLog += row + "\n";
  }
  console.log(boardLog);

  return {
    localUpdate: {
      cropsCollected: cropsCollected,
      powerupsCollected: powerupsCollected,
      pointsGained: pointsGained,
      letterUpdates: letterUpdates,
      cropUpdates: cropUpdates,
      totalPoints: userGameState.points,
      endpoints: userGameState.endpoints,
      wordsRemaining: userGameState.wordsRemaining,
    },
    globalUpdate: {
      logMessages: logMessages,
      updatedRankings: game.rankings,
    },
  };
};

module.exports = {
  randomlyGenerateBoard,
  letterValues,
  cropValues,
  deepCopyBoard,
  games,
  enterWord,
  confirmWord,
};
