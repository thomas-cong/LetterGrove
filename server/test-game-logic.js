const gameLogic = require("./game-logic");

// Test 1: Board Generation
console.log("\n=== Test 1: Board Generation ===");
const testBoard = gameLogic.randomlyGenerateBoard({
    difficulty: "easy"
});

// Verify board dimensions
console.log("Board dimensions correct:", 
    testBoard.length === 15 && 
    testBoard[0].length === 15
);

// Count letters, powerups, and crops
let letterCount = 0;
let powerupCount = 0;
let cropCount = 0;

testBoard.forEach(row => {
    row.forEach(tile => {
        if (tile.letter) letterCount++;
        if (tile.powerup) powerupCount++;
        if (tile.crop) cropCount++;
    });
});

console.log("Letter count:", letterCount);
console.log("Powerup count:", powerupCount);
console.log("Crop count:", cropCount);

// Test 2: Adjacent Letters Check
console.log("\n=== Test 2: Adjacent Letters Check ===");
let hasAdjacentLetters = false;
for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
        if (testBoard[i][j].letter) {
            // Check adjacent cells
            const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
            for (const [dx, dy] of directions) {
                const newI = i + dx;
                const newJ = j + dy;
                if (newI >= 0 && newI < 15 && newJ >= 0 && newJ < 15) {
                    if (testBoard[newI][newJ].letter) {
                        hasAdjacentLetters = true;
                        console.log(`Found adjacent letters at (${i},${j}) and (${newI},${newJ})`);
                    }
                }
            }
        }
    }
}
console.log("No adjacent letters:", !hasAdjacentLetters);

// Test 3: Deep Copy Function
console.log("\n=== Test 3: Deep Copy Test ===");
const copiedBoard = gameLogic.deepCopyBoard(testBoard);
console.log("Deep copy successful:", 
    JSON.stringify(copiedBoard) === JSON.stringify(testBoard)
);

// Modify copy and verify original unchanged
copiedBoard[0][0].letter = 'Z';
console.log("Original unchanged after modifying copy:", 
    testBoard[0][0].letter !== copiedBoard[0][0].letter
);

// Test 4: Letter Distribution
console.log("\n=== Test 4: Letter Distribution ===");
const letterDistribution = {};
testBoard.forEach(row => {
    row.forEach(tile => {
        if (tile.letter) {
            letterDistribution[tile.letter] = (letterDistribution[tile.letter] || 0) + 1;
        }
    });
});
console.log("Letter distribution:", letterDistribution);

// Print a visual representation of the board
console.log("\n=== Board Visualization ===");
console.log(testBoard.map(row => 
    row.map(tile => 
        tile.letter || tile.powerup || tile.crop || '.'
    ).join(' ')
).join('\n'));
