/*
|--------------------------------------------------------------------------
| Constants and Game Configuration
|--------------------------------------------------------------------------
*/

// Scrabble-like letter distribution (100 tiles total)
const letterDistribution = {
    'E': 12, 'A': 9, 'I': 9, 'O': 8, 'N': 6, 'R': 6, 'T': 6,
    'L': 4, 'S': 4, 'U': 4, 'D': 4, 'G': 3,
    'B': 2, 'C': 2, 'M': 2, 'P': 2, 'F': 2, 'H': 2, 'V': 2, 'W': 2, 'Y': 2,
    'K': 1, 'J': 1, 'X': 1, 'Q': 1, 'Z': 1
};

// Point values for each letter
const letterValues = {
    'E': 1, 'A': 1, 'I': 1, 'O': 1, 'N': 1, 'R': 1, 'T': 1, 'L': 1, 'S': 1, 'U': 1,
    'D': 2, 'G': 2,
    'B': 3, 'C': 3, 'M': 3, 'P': 3,
    'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,
    'K': 5,
    'J': 8, 'X': 8,
    'Q': 10, 'Z': 10
};

// Point values for crop items
const cropValues = {
    'carrot': 2,
    'tomato': 5,
    'blueberry': 10,
    'pumpkin': 20
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
    const letters = Object.entries(letterDistribution).flatMap(([letter, count]) => 
        Array(count).fill(letter)
    );
    return letters[Math.floor(Math.random() * letters.length)];
};

/**
 * Creates a function that generates random board positions with weighted distribution
 * Higher row/column numbers have higher probability of being selected
 * @param {number} ARRAY_SIZE - Size of the game board
 * @returns {Function} Function that returns [row, col] when called
 */
const createRandomPositionGenerator = (ARRAY_SIZE) => {
    // Generate weighted rows array
    const rows = [];
    for (let i = 0; i < ARRAY_SIZE; i++) {
        const weight = i + 2 * ARRAY_SIZE;
        rows.push(...Array(weight).fill(i));
    }

    // Generate weighted columns array
    const cols = [];
    for (let i = 0; i < ARRAY_SIZE; i++) {
        const weight = i + 2 * ARRAY_SIZE;
        cols.push(...Array(weight).fill(i));
    }

    return () => {
        const row = rows[Math.floor(Math.random() * rows.length)];
        const col = cols[Math.floor(Math.random() * cols.length)];
        return [row, col];
    };
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
        [-1, 0], [1, 0], [0, -1], [0, 1],
    ];
    
    for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < ARRAY_SIZE && 
            newCol >= 0 && newCol < ARRAY_SIZE && 
            board[newRow][newCol].letter !== '') {
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
    const DIFFICULTY = props.difficulty;
    const LETTER_COUNT = null;
    const POWERUP_COUNT = null;
    const CROPS = ['carrots', 'tomatoes', 'blueberries', 'pumpkins'];
    const POWERUPS = ['spade', 'water', 'shovel'];
    const CROP_COUNTS = {
        carrots: null,
        tomatoes: null,
        blueberries: null,
        pumpkins: null
    };
    const POWERUP_COUNTS = {
        spade: null,
        water: null,
        shovel: null
    };
    const ARRAY_SIZE = 15;
    if (DIFFICULTY === 'easy') {
        LETTER_COUNT = 15;
        CROP_COUNTS = {
            carrots: 5,
            tomatoes: 5,
            blueberries: 5,
            pumpkins: 5
        }
        POWERUP_COUNTS = {
            spade: 1,
            water: 1,
            shovel: 1
        }
    } else if (DIFFICULTY === 'medium') {
        LETTER_COUNT = 25;
        CROP_COUNTS = {
            carrots: 1,
            tomatoes: 1,
            blueberries: 1,
            pumpkins: 1
        }
        POWERUP_COUNTS = {
            spade: 1,
            water: 1,
            shovel: 1
        }
    } else if (DIFFICULTY === 'hard') {
        LETTER_COUNT = 35;
        CROP_COUNTS = {
            carrots: 1,
            tomatoes: 1,
            blueberries: 1,
            pumpkins: 1
        }
        POWERUP_COUNTS = {
            spade: 1,
            water: 1,
            shovel: 1
        }
    }
    
    // Initialize empty board
    const board = Array(ARRAY_SIZE).fill().map(() => Array(ARRAY_SIZE).fill({
        letter: '',
        powerup: null,
        crop: null,
        default: false,
        value: 0,
        visited: false,
    }));

    // Place first letter in top-left corner
    board[0][0].letter = generateRandomLetter();
    board[0][0].default = true;
    board[0][0].value = letterValues[board[0][0].letter];
    board[0][0].visited = true;

    // Place remaining letters
    let remainingLetters = LETTER_COUNT - 1;
    const generatePosition = createRandomPositionGenerator(ARRAY_SIZE);
    
    while (remainingLetters > 0) {
        const [row, col] = generatePosition();
        
        if (board[row][col].letter === '' && !hasAdjacentLetter(row, col, board, ARRAY_SIZE)) {
            const letter = generateRandomLetter();
            board[row][col] = {
                letter: letter,
                powerup: null,
                crop: null,
                default: true,
                value: letterValues[letter],
                visited: false
            };
            remainingLetters--;
        }
    }

    for (let crop in CROPS) {
        let remainingCrop = CROP_COUNTS[crop];
        while (remainingCrop > 0) {
            const [row, col] = generatePosition();
            if (board[row][col].letter === '' && board[row][col].crop === null) {
                board[row][col].crop = crop;
                board[row][col].value = cropValues[crop];
                remainingCrop--;
            }
        }
    }

    for (let powerup in POWERUPS) {
        let remainingPowerUp = POWERUP_COUNTS[powerup];
        while (remainingPowerUp > 0) {
            const [row, col] = generatePosition();
            if (board[row][col].letter === '' && board[row][col].crop === null && board[row][col].powerup === null) {
                board[row][col].powerup = powerup;
                remainingPowerUp--;
            }
        }
    }
    
    return board;
};

module.exports = {
    randomlyGenerateBoard,
    letterValues,
    cropValues
};