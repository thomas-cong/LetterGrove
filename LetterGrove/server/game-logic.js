/*
|--------------------------------------------------------------------------
| Constants and Game Configuration
|--------------------------------------------------------------------------
*/

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
  E: 1,
  A: 1,
  I: 1,
  O: 1,
  N: 1,
  R: 1,
  T: 1,
  L: 1,
  S: 1,
  U: 1,
  D: 2,
  G: 2,
  B: 3,
  C: 3,
  M: 3,
  P: 3,
  F: 4,
  H: 4,
  V: 4,
  W: 4,
  Y: 4,
  K: 5,
  J: 8,
  X: 8,
  Q: 10,
  Z: 10,
};

// Point values for crop items
const cropValues = {
  carrot: 2,
  tomato: 5,
  blueberry: 10,
  pumpkin: 20,
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

/*
|--------------------------------------------------------------------------
| Main Game Logic
|--------------------------------------------------------------------------
*/

/**
 * Generates a random game board with letters and other game elements
 * @param {Object} props - Game configuration properties
 * @returns {Array} Generated game board
 */
const randomlyGenerateBoard = (props) => {
  const DIFFICULTY = "easy";
  let LETTER_COUNT;
  const CROPS = ["carrot", "tomato", "blueberry", "pumpkin"];
  const POWERUPS = ["spade", "water", "shovel"];
  let CROP_COUNTS;
  let POWERUP_COUNTS;
  const ARRAY_SIZE = 15;

  if (DIFFICULTY === "easy") {
    LETTER_COUNT = 25;
    CROP_COUNTS = {
      carrot: 2,
      tomato: 2,
      blueberry: 2,
      pumpkin: 2,
    };
    POWERUP_COUNTS = {
      spade: 1,
      water: 1,
      shovel: 1,
    };
  } else if (DIFFICULTY === "medium") {
    LETTER_COUNT = 25;
    CROP_COUNTS = {
      carrot: 1,
      tomato: 1,
      blueberry: 1,
      pumpkin: 1,
    };
    POWERUP_COUNTS = {
      spade: 1,
      water: 1,
      shovel: 1,
    };
  } else if (DIFFICULTY === "hard") {
    LETTER_COUNT = 35;
    CROP_COUNTS = {
      carrot: 1,
      tomato: 1,
      blueberry: 1,
      pumpkin: 1,
    };
    POWERUP_COUNTS = {
      spade: 1,
      water: 1,
      shovel: 1,
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
          powerup: null,
          crop: null,
          default: false,
          value: 0,
          visited: false,
        }))
    );

  // Place first letter in top-left corner
  const firstLetter = generateRandomLetter();
  board[0][0] = {
    letter: firstLetter,
    powerup: null,
    crop: null,
    default: true,
    value: letterValues[firstLetter],
    visited: true,
  };

  // Place remaining letters
  let remainingLetters = LETTER_COUNT - 1;
  const generatePosition = createRandomPositionGenerator(ARRAY_SIZE);
  let attempts = 0;
  const MAX_ATTEMPTS = 1000;

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
        powerup: null,
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

      board[row][col].powerup = powerup;

      positions.splice(randomIndex, 1);
      availablePositions.delete(`${row},${col}`);
      remainingPowerUp--;
    }
  }

  console.log("Current Board State:");
  console.log(board.map(row => row.map(cell => cell.letter || "_").join(" ")).join("\n"));

  return board;
};

const deepCopyBoard = (board) => {
  return JSON.parse(JSON.stringify(board));
};

const enterWord = (userId, props) => {
  /*
    Returns list of potential word positions
    */
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
  return suggestions;
};

const confirmWord = (userId, props) => {
  /*
    Finalize selected word on board*/
  const lobbyCode = props.lobbyCode;
  const x = props.x;
  const y = props.y;
  const x_one_step = props.x_one_step;
  const y_one_step = props.y_one_step;
  const word = props.word;
  const game = games[lobbyCode];
  const userGameState = game.userGameStates[userId];
  const board = userGameState.board;
  const [dx, dy] = [x_one_step, y_one_step];
  let currentX = x;
  let currentY = y;
  let cropsCollected = {
    carrot: 0,
    tomato: 0,
    blueberry: 0,
    pumpkin: 0,
  };
  let powerupsCollected = {
    spade: 0,
    water: 0,
    shovel: 0,
  };
  let pointsGained = 0;
  let letterUpdates = [];
  console.log();
  for (let i = 0; i < word.length; i++) {
    console.log("x: " + currentX + " y: " + currentY + " board: " + board[currentY][currentX].letter);
    if (i === 0) {
      currentX += dx;
      currentY += dy;
      continue;
    }
    if (board[currentY][currentX].letter === "") {
      letterUpdates.push({
        x: currentX,
        y: currentY,
        letter: word[i],
        default: board[currentY][currentX].default,
        visited: board[currentY][currentX].visited,
      });
    }
    board[currentY][currentX].visited = true;
    board[currentY][currentX].letter = word[i];
    if (i === word.length - 1) {
      userGameState.endpoints.push([currentX, currentY]);
    }
    if (board[currentY][currentX].powerup !== null) {
      powerup = board[currentY][currentX].powerup;
      userGameState.powerups[powerup] += 1;
      board[currentY][currentX].powerup = null;
      powerupsCollected[powerup] += 1;
    }
    if (board[currentY][currentX].crop !== null) {
      crop = board[currentY][currentX].crop;
      board[currentY][currentX].crop = null;
      cropsCollected[crop] += 1;
    }
    if (board[currentY][currentX].value > 0) {
      userGameState.points += board[currentY][currentX].value;
      pointsGained += board[currentY][currentX].value;
      board[currentY][currentX].value = 0;
    }
    currentX += dx;
    currentY += dy;
  }
  let logMessage = userGameState.username + " collected " + pointsGained + " points";
  for (rankInfo in game.rankings) {
    if (rankInfo.playerId === userId) {
      rankInfo.score = userGameState.points;
      break;
    }
  }
  game.rankings.sort((a, b) => b.score - a.score);
  if (userGameState.points >= game.pointsToWin) {
    game.gameStatus = "ended";
  }
  userGameState.letters_collected += letterUpdates.length;
  userGameState.words_formed += 1;
  return {
    localUpdate: {
      cropsCollected: cropsCollected,
      powerupsCollected: powerupsCollected,
      pointsGained: pointsGained,
      letterUpdates: letterUpdates,
      totalPoints: userGameState.points,
      endpoints: userGameState.endpoints,
    },
    globalUpdate: {
      logMessage: logMessage,
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
