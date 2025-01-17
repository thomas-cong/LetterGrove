/* Game State */

const gameStates = {};


const randomlyGenerateBoard = (props) => {
    /* Randomly generatges a starting board depending on:
    - default letter density
    - powerups
    */
    const LETTER_COUNT = 50;
    const POWERUP_COUNT = 10;
    const FOOD_COUNT = 10;
    const ARRAY_SIZE = 15;
    // Create empty 15x15 board
    const board = Array(ARRAY_SIZE).fill().map(() => Array(ARRAY_SIZE).fill({
        letter: '',
        powerup: null,
        food: null,
        default: false,
        value: 0,
    }));

    board[0][0].letter = generateRandomLetter();
    board[0][0].default = true;
    board[0][0].value = letterValues[board[0][0].letter];
    // Generate remaining letters
    let remainingLetters = LETTER_COUNT - 1;
    
    // Calculate position weights
    const positionWeights = Array(ARRAY_SIZE).fill().map(() => Array(ARRAY_SIZE).fill(0))
    for (let i = 0; i < ARRAY_SIZE; i++) {
        for (let j = 0; j < ARRAY_SIZE; j++) {
            positionWeights[i][j] = i + j + 4 * ARRAY_SIZE;
        }
    }
    
    const hasAdjacentLetter = (row, col) => {
        const directions = [
            [-1,-1], [-1,0], [-1,1],
            [0,-1],          [0,1],
            [1,-1],  [1,0],  [1,1]
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
    
}

const letterDistribution = {
    'E': 12,
    'A': 9,
    'I': 9,
    'O': 8,
    'N': 6,
    'R': 6,
    'T': 6,
    'L': 4,
    'S': 4,
    'U': 4,
    'D': 4,
    'G': 3,
    'B': 2,
    'C': 2,
    'M': 2,
    'P': 2,
    'F': 2,
    'H': 2,
    'V': 2,
    'W': 2,
    'Y': 2,
    'K': 1,
    'J': 1,
    'X': 1,
    'Q': 1,
    'Z': 1
};

const letterValues = {
    'E': 1,
    'A': 1,
    'I': 1,
    'O': 1,
    'N': 1,
    'R': 1,
    'T': 1,
    'L': 1,
    'S': 1,
    'U': 1,
    'D': 2,
    'G': 2,
    'B': 3,
    'C': 3,
    'M': 3,
    'P': 3,
    'F': 4,
    'H': 4,
    'V': 4,
    'W': 4,
    'Y': 4,
    'K': 5,
    'J': 8,
    'X': 8,
    'Q': 10,
    'Z': 10
}

const foodValues = {
    'carrot': 2,
    'tomato': 5,
    'blueberry': 10,
    'pumpkin': 20
}

const generateRandomLetter = () => {
    // Create array of letters with repetition based on distribution
    const letters = Object.entries(letterDistribution).flatMap(([letter, count]) => 
        Array(count).fill(letter)
    );
    
    // Pick random letter from weighted array
    return letters[Math.floor(Math.random() * letters.length)];
};

const generateRandomPosition = (ARRAY_SIZE) => {
    
}