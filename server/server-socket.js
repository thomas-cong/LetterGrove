/**
 * Server-side socket handling for the Letter Grove game
 * Manages real-time game state, player connections, and game events
 */

const gameLogic = require("./game-logic");
const { openLobbies } = require("./shared-state");
const CompletedGame = require("./models/completed-game");
const User = require("./models/user");

// Socket.io instance
let io;

// Bidirectional mappings for user-socket relationships
const userToSocketMap = {}; // maps user ID to socket object
const socketToUserMap = {}; // maps socket ID to user object
const gameToUserToSocketMap = {}; // maps game ID to user-socket object

// Helper functions for user-socket management
const getAllConnectedUsers = () => Object.values(socketToUserMap);
const getSocketFromUserID = (userid) => userToSocketMap[userid];
const getUserFromSocketID = (socketid) => socketToUserMap[socketid];
const getSocketFromSocketID = (socketid) => io.sockets.sockets.get(socketid);
const getSocketsFromLobbyCodeAndUserID = (lobbyCode, userid) =>
  gameToUserToSocketMap[lobbyCode][userid];

/**
 * Associates a user with their socket connection
 * Handles cases where a user has multiple tabs open by forcing older connections to disconnect
 * @param {Object} user - User object containing _id and other user data
 * @param {Object} socket - Socket.io socket instance
 */
const addUser = (user, socket) => {
  // const oldSocket = userToSocketMap[user._id];
  // if (oldSocket && oldSocket.id !== socket.id) {
  //   // there was an old tab open for this user, force it to disconnect
  //   // FIXME: is this the behavior you want?
  //   oldSocket.disconnect();
  //   delete socketToUserMap[oldSocket.id];
  // }

  userToSocketMap[user._id] = socket;
  socketToUserMap[socket.id] = user;
};

/**
 * Removes user-socket associations when a user disconnects
 * @param {Object} user - User object to remove
 * @param {Object} socket - Socket.io socket instance to remove
 */
const removeUser = (user, socket) => {
  if (user) delete userToSocketMap[user._id];
  delete socketToUserMap[socket.id];
};

/**
 * Sends the initial game state to a specific user when they join a game
 * Includes board state, points, powerups, and other game-specific information
 * @param {string} userId - ID of the user to send game state to
 * @param {string} lobbyCode - Code of the lobby/game to get state from
 */
const sendUserInitialGame = (userId, lobbyCode) => {
  let game = {
    sameBoard: gameLogic.games[lobbyCode].sameBoard,
    mode: gameLogic.games[lobbyCode].mode,
    lobbyCode: lobbyCode,
    username: gameLogic.games[lobbyCode].userGameStates[userId].username,
    board: gameLogic.games[lobbyCode].userGameStates[userId].board,
    points: gameLogic.games[lobbyCode].userGameStates[userId].points,
    powerups: gameLogic.games[lobbyCode].userGameStates[userId].powerups,
    endpoints: gameLogic.games[lobbyCode].userGameStates[userId].endpoints,
    counter: gameLogic.games[lobbyCode].counter,
    rankings: gameLogic.games[lobbyCode].rankings,
    turn: gameLogic.games[lobbyCode].turn,
    turnOrder: gameLogic.games[lobbyCode].turnOrder,
    log: gameLogic.games[lobbyCode].log,
  };
  for (const socket of getSocketsFromLobbyCodeAndUserID(lobbyCode, userId)) {
    if (socket) {
      socket.emit("initial game", game);
      if (game.sameBoard) {
        socket.emit("turn update", {
          userId: game.turn,
          username: gameLogic.games[lobbyCode].players[game.turn],
        });
      }
      if (game.mode === "Time") {
        if (socket) {
          socket.emit("time update", {
            secondsRemaining: gameLogic.games[lobbyCode].secondsRemaining,
          });
        }
      }
      if (game.mode === "Words") {
        if (socket) {
          socket.emit("words update", {
            wordsRemaining: gameLogic.games[lobbyCode].userGameStates[userId].wordsRemaining,
            wordLimit: gameLogic.games[lobbyCode].userGameStates[userId].wordLimit,
          });
        }
      }
      if (game.mode === "Points") {
        if (socket) {
          socket.emit("points update", {
            pointsToWin: gameLogic.games[lobbyCode].pointsToWin,
          });
        }
      }
    }
  }
};

/**
 * Initializes a new game instance with the specified settings
 * Handles both single-board and multi-board game modes
 * Sets up initial game state, player positions, and turn order
 * @param {Object} props - Contains lobbyCode and gameInfo
 * @param {string} props.lobbyCode - Unique identifier for the game
 * @param {Object} props.gameInfo - Game configuration including players, difficulty, and board settings
 * @param {boolean} props.isTutorial - Whether the game is a tutorial
 */
const initiateGame = (props) => {
  const lobbyCode = props.lobbyCode;
  const gameInfo = props.gameInfo;
  const players = gameInfo.players;
  const sameBoard = gameInfo.sameBoard;
  const mode = gameInfo.mode; // 'words', 'points', or 'time'
  const numPlayers = Object.keys(players).length;

  if (props.isTutorial) {
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
    const cropValues = {
      cherry: 2,
      grape: 5,
      orange: 10,
      crate: 20,
    };
    board = Array(15)
      .fill()
      .map(() =>
        Array(15).fill({
          letter: null,
          crop: null,
          powerUp: null,
          visited: false,
          default: false,
          isSuggestion: false,
          isSuggestionEnd: false,
          value: 0,
        })
      );

    // Place some letters to form simple words
    const tutorialLetters = [
      { x: 0, y: 0, letter: "L", crop: "", powerUp: "" },
      { x: 1, y: 0, letter: "E", crop: "", powerUp: "" },
      { x: 2, y: 0, letter: "T", crop: "", powerUp: "" },
      { x: 3, y: 0, letter: "", crop: "cherry", powerUp: "" },
      { x: 4, y: 0, letter: "", crop: "grape", powerUp: "" },
      { x: 5, y: 0, letter: "R", crop: "", powerUp: "" },

      { x: 5, y: 1, letter: "", crop: "crate", powerUp: "" },
      { x: 5, y: 2, letter: "", crop: "orange", powerUp: "" },

      { x: 4, y: 4, letter: "", crop: "", powerUp: "" },
      { x: 3, y: 5, letter: "M", crop: "", powerUp: "" },
      { x: 2, y: 6, letter: "E", crop: "", powerUp: "" },

      { x: 5, y: 3, letter: "G", crop: "", powerUp: "" },
      { x: 6, y: 4, letter: "", crop: "", powerUp: "twoTimes" },
      { x: 7, y: 5, letter: "O", crop: "", powerUp: "" },
      { x: 8, y: 6, letter: "", crop: "", powerUp: "wateringCan" },
      { x: 9, y: 7, letter: "E", crop: "", powerUp: "" },
      { x: 10, y: 7, letter: "", crop: "", powerUp: "" },

      { x: 11, y: 7, letter: "D", crop: "", powerUp: "" },

      { x: 14, y: 12, letter: "", crop: null, powerUp: null },
      { x: 13, y: 11, letter: "", crop: null, powerUp: null },
      { x: 9, y: 2, letter: "", crop: null, powerUp: null },
    ];

    tutorialLetters.forEach(({ x, y, letter, crop, powerUp }) => {
      board[y][x] = {
        letter: letter,
        crop: crop,
        powerUp: powerUp,
        visited: false,
        default: letter !== "" ? true : false,
        isSuggestion: false,
        isSuggestionEnd: false,
        value: letter ? letterValues[letter] || 0 : crop ? cropValues[crop] || 0 : 0,
      };
    });
  } else {
    board = gameLogic.randomlyGenerateBoard({
      difficulty: gameInfo.difficulty,
      sameBoard: sameBoard,
      playerCount: numPlayers,
    });
  }
  let turnOrder;
  let turn;
  if (sameBoard) {
    turnOrder = [];
    for (const userId in players) {
      turnOrder.push(userId);
    }
    turn = turnOrder[0];
  }
  if (sameBoard) {
    console.log("Same board mode");
    game = {
      mode: mode,
      sameBoard: sameBoard,
      userGameStates: {},
      players: players,
      gameStatus: "waiting",
      secondsRemaining: mode === "Time" ? gameInfo.steps : 36000, // default to 10 hours if mode isn't time
      pointsToWin: mode === "Points" ? gameInfo.steps : null,
      rankings: [],
      log: [],
      turnOrder: turnOrder,
      turn: turn,
      secondsElapsed: 0,
      difficulty: gameInfo.difficulty,
    };
  } else {
    console.log("Different board mode");
    game = {
      mode: mode,
      sameBoard: sameBoard,
      userGameStates: {},
      players: players,
      gameStatus: "waiting",
      secondsRemaining: mode === "Time" ? gameInfo.steps : 36000, // default to 10 hours if mode isn't time
      pointsToWin: mode === "Points" ? gameInfo.steps : null,
      rankings: [],
      log: [],
      secondsElapsed: 0,
      difficulty: gameInfo.difficulty,
    };
    console.log("game:", game);
  }

  let startingEndpoints;
  console.log("players length");
  console.log(numPlayers);

  if (sameBoard) {
    if (numPlayers === 1) {
      console.log("starting endpoints");
      startingEndpoints = [[0, 0]];
      console.log(startingEndpoints);
    } else if (numPlayers === 2) {
      console.log("starting endpoints");
      startingEndpoints = [
        [0, 0],
        [14, 14],
      ];
      console.log(startingEndpoints);
    } else if (numPlayers === 3) {
      console.log("starting endpoints");
      startingEndpoints = [
        [0, 0],
        [0, 14],
        [14, 14],
      ];
      console.log(startingEndpoints);
    } else if (numPlayers === 4) {
      console.log("starting endpoints");
      startingEndpoints = [
        [0, 0],
        [0, 14],
        [14, 14],
        [14, 0],
      ];
      console.log(startingEndpoints);
    }
  }

  for (const userId in players) {
    const username = players[userId];
    if (sameBoard) {
      game.userGameStates[userId] = {
        username: username,
        board: board,
        points: 0,
        powerups: {
          wateringCan: 0,
          twoTimes: 0,
        },
        endpoints: [startingEndpoints.pop()],
        lettersCollected: 0,
        wordsFormed: 0,
        powerupsUsed: 0,
        wordsRemaining: mode === "Words" ? gameInfo.steps : null,
        wordLimit: mode === "Words" ? gameInfo.steps : null,
      };
    } else {
      game.userGameStates[userId] = {
        username: username,
        board: gameLogic.deepCopyBoard(board),
        points: 0,
        powerups: {
          wateringCan: 0,
          twoTimes: 0,
        },
        endpoints: [[0, 0]],
        lettersCollected: 0,
        wordsFormed: 0,
        powerupsUsed: 0,
        wordsRemaining: mode === "Words" ? gameInfo.steps : null,
        wordLimit: mode === "Words" ? gameInfo.steps : null,
      };
    }
  }
  for (const userId in players) {
    game.rankings.push({
      playerId: userId,
      username: players[userId],
      score: 0,
    });
  }
  console.log("game:", game);
  gameLogic.games[lobbyCode] = game;
  gameLogic.games[lobbyCode].gameStatus = "active";
  console.log("Game started:", {
    lobbyCode,
    mode,
    sameBoard,
    numPlayers,
  });
  if (mode === "Time") {
    for (const userId of Object.keys(players)) {
      for (const socket of getSocketsFromLobbyCodeAndUserID(lobbyCode, userId)) {
        if (socket) {
          socket.emit("time update", {
            secondsRemaining: gameInfo.steps,
          });
        }
      }
    }
  }
  if (mode === "Words") {
    console.log(gameToUserToSocketMap);
    console.log("Players", Object.keys(players));
    for (const userId of Object.keys(players)) {
      console.log("user ID", userId);
      for (const socket of getSocketsFromLobbyCodeAndUserID(lobbyCode, userId)) {
        if (socket) {
          socket.emit("words update", {
            wordsRemaining: gameInfo.steps,
            wordLimit: gameInfo.steps,
          });
        }
      }
    }
  }
  if (mode === "Points") {
    for (const userId of Object.keys(players)) {
      for (const socket of getSocketsFromLobbyCodeAndUserID(lobbyCode, userId)) {
        if (socket) {
          socket.emit("points update", {
            pointsToWin: gameInfo.steps,
          });
        }
      }
    }
  }
  startTimer({
    lobbyCode: lobbyCode,
    secondsRemaining: game.secondsRemaining,
  });

  if (sameBoard) {
    for (const userId of Object.keys(players)) {
      for (const socket of getSocketsFromLobbyCodeAndUserID(lobbyCode, userId)) {
        if (socket) {
          console.log("Turn update emitted");

          socket.emit("turn update", {
            userId: game.turn,
            username: players[game.turn],
          });
        }
      }
    }
  }
};

/**
 * Starts the game timer and handles game progression
 * Decrements steps remaining and checks for game end conditions
 * @param {Object} props - Contains lobbyCode and initial steps
 */
const startTimer = (props) => {
  const lobbyCode = props.lobbyCode;
  const game = gameLogic.games[lobbyCode];
  game.secondsRemaining = props.secondsRemaining;

  console.log("Starting game timer for lobby:", lobbyCode);
  console.log("Initial steps remaining:", game.secondsRemaining);

  game.timerInterval = setInterval(() => {
    game.secondsElapsed++;
    game.secondsRemaining--;

    if (game.mode === "Time") {
      console.log("Time remaining:", game.secondsRemaining);
      for (const userId of Object.keys(game.players)) {
        for (const socket of getSocketsFromLobbyCodeAndUserID(lobbyCode, userId)) {
          if (socket) {
            socket.emit("time update", { secondsRemaining: game.secondsRemaining });
          }
        }
      }
    }

    if (game.secondsRemaining === 0) {
      game.gameStatus = "ended";
      handleEndGame({
        isTutorial: false,
        lobbyCode: lobbyCode,
        reason:
          "Time's up! " +
          game.rankings[0].username +
          " wins with " +
          game.rankings[0].score +
          " points!",
      });
      clearInterval(game.timerInterval);
      return;
    }
  }, 1000);
};

/**
 * Handles game end logic including:
 * - Saving game results to database
 * - Updating player statistics
 * - Notifying all players of game end
 * @param {Object} props - Contains lobbyCode and reason for game end
 */
const handleEndGame = (props) => {
  const lobbyCode = props.lobbyCode;
  const game = gameLogic.games[lobbyCode];
  gameResults = {
    finalRankings: game.rankings,
    timeElapsed: game.secondsElapsed,
    wordsFormed: {},
  };
  for (const userId in game.players) {
    gameResults.wordsFormed[userId] = game.userGameStates[userId].wordsFormed;
  }
  clearInterval(game.timerInterval);
  let boards = {};
  for (const userId in game.players) {
    boards[userId] = game.userGameStates[userId].board;
  }
  let words = {};
  for (const userId in game.players) {
    words[userId] = game.userGameStates[userId].wordsFormed;
  }
  if (!props.isTutorial) {
    const completedGame = new CompletedGame({
      boards: boards,
      players: game.players,
      words: words,
      finalRankings: game.rankings,
      mode: game.mode,
      sameBoard: game.sameBoard,
      difficulty: game.difficulty,
      secondsElapsed: game.secondsElapsed,
      date: new Date(),
    });
    for (const userId in game.players) {
      const userGameState = game.userGameStates[userId];
      User.findByIdAndUpdate(
        userId,
        {
          $inc: {
            games_played: 1,
            wins: game.rankings[0].score === userGameState.points ? 1 : 0,
            letters: userGameState.lettersCollected || 0,
            powerups: userGameState.powerupsUsed || 0,
            words: userGameState.wordsFormed || 0,
            points: userGameState.points || 0,
            timePlayed: game.secondsElapsed || 0,
          },
        },
        { new: true }
      )
        .then((user) => {
          console.log(`Updated stats for user ${user.name}`);
        })
        .catch((err) => {
          console.log(`Error updating user ${userId}:`, err);
        });
    }
    completedGame.save().then((game) => {
      console.log("Game saved:", game);
    });
  }
  for (const userId of Object.keys(game.players)) {
    for (const socket of getSocketsFromLobbyCodeAndUserID(lobbyCode, userId)) {
      if (socket) {
        socket.emit("game over", {
          results: gameResults,
          reason: props.reason,
        });
      }
    }
  }
  delete gameLogic.games[lobbyCode];
  delete openLobbies[lobbyCode];
  delete gameToUserToSocketMap[lobbyCode];
};

// const deleteDuplicateJoins = (lobbyCode) => {
//   for (const userId of Object.keys(gameToUserToSocketMap[lobbyCode])) {
//     for (const socket of gameToUserToSocketMap[lobbyCode][userId]) {
//       if (!gameToUserToSocketMap[lobbyCode] && !gameToUserToSocketMap[lobbyCode][userId]) {
//         sockets = gameToUserToSocketMap[lobbyCode][userId];
//         while (true) {
//           const socketIndex = sockets.findIndex((s) => s.id === socket.id);
//           if (socketIndex === -1) {
//             break;
//           } else {
//             sockets.splice(socketIndex, 1);
//           }
//         }
//       }
//     }
//   }
// };

/**
 * Adds a user to a game room (socket.io room)
 * Verifies user is authorized to join the specified lobby
 * @param {Object} props - Contains lobbyCode, socketid, and userId
 */
const joinSocket = (props) => {
  const lobbyCode = props.lobbyCode;
  const userId = props.userId;
  console.log("gameToUserToSocketMap: ", gameToUserToSocketMap);
  console.log("gameToUserToSocketMap[lobbyCode]: ", gameToUserToSocketMap[lobbyCode]);
  if (gameToUserToSocketMap[lobbyCode] && gameToUserToSocketMap[lobbyCode][userId]) {
    for (const otherSocket of gameToUserToSocketMap[lobbyCode][userId]) {
      if (otherSocket.id === props.socket.id) {
        props.socket.emit("socket joined");
        return;
      }
    }
  }
  for (let tempLobbyCode of Object.keys(gameToUserToSocketMap)) {
    for (let tempUserId of Object.keys(gameToUserToSocketMap[tempLobbyCode])) {
      for (let i = 0; i < gameToUserToSocketMap[tempLobbyCode][tempUserId].length; i++) {
        let tempSocket = gameToUserToSocketMap[tempLobbyCode][tempUserId][i];
        if (tempSocket.id === props.socket.id) {
          console.log("SOCKET REMOVED");
          gameToUserToSocketMap[tempLobbyCode][tempUserId].splice(i, 1);
          break;
        }
      }
    }
  }
  if (gameToUserToSocketMap[lobbyCode] && gameToUserToSocketMap[lobbyCode][userId]) {
    gameToUserToSocketMap[lobbyCode][userId].add(props.socket);
  } else {
    if (!gameToUserToSocketMap[lobbyCode]) {
      gameToUserToSocketMap[lobbyCode] = {};
    }
    if (!gameToUserToSocketMap[lobbyCode][userId]) {
      gameToUserToSocketMap[lobbyCode][userId] = new Set();
    }
    for (const otherSocket of gameToUserToSocketMap[lobbyCode][userId]) {
      if (otherSocket.id === props.socket.id) {
        props.socket.emit("socket joined");
        return;
      }
    }
    if (!(props.socket in gameToUserToSocketMap[lobbyCode][userId])) {
      gameToUserToSocketMap[lobbyCode][userId].add(props.socket);
    }
  }
  props.socket.emit("socket joined");
  setInterval(() => {
    if (openLobbies[props.lobbyCode] && !openLobbies[props.lobbyCode].gameStarted) {
      updateLobbyUserList({
        lobbyCode: props.lobbyCode,
        userId: props.userId,
        socket: props.socket,
      });
    }
  }, 100);
  //test
};

/**
 * Notifies all players in a lobby that the game is transitioning from lobby to active state
 * @param {Object} props - Contains lobbyCode
 */
const lobbyToGameTransition = (props) => {
  for (const userId of Object.keys(openLobbies[props.lobbyCode].players)) {
    for (const socket of getSocketsFromLobbyCodeAndUserID(props.lobbyCode, userId)) {
      if (socket) {
        socket.emit("lobby to game transition");
      }
    }
  }
  console.log("lobby game transition emitted");
};

/**
 * Updates all players in a lobby with the current list of players
 * Used when players join or leave the lobby
 * @param {Object} props - Contains lobbyCode
 */
const updateLobbyUserList = (props) => {
  for (const userId of Object.keys(gameToUserToSocketMap[props.lobbyCode])) {
    for (const socket of getSocketsFromLobbyCodeAndUserID(props.lobbyCode, userId)) {
      if (socket) {
        socket.emit("update lobby user list", openLobbies[props.lobbyCode].players);
      }
    }
  }
};

/**
 * Sends updated board state to a specific player
 * Used in same-board mode when any player makes a move
 * @param {string} userId - ID of user to update
 * @param {string} lobbyCode - Code of the game
 */
const sendBoardState = (lobbyCode, userId, letterUpdates, cropUpdates) => {
  for (const socket of getSocketsFromLobbyCodeAndUserID(lobbyCode, userId)) {
    if (socket)
      socket.emit("board update", { letterUpdates: letterUpdates, cropUpdates: cropUpdates });
  }
};

/**
 * Advances the turn to the next player in turn order
 * Used in same-board mode after a player completes their move
 * @param {string} lobbyCode - Code of the game
 */
const passTurn = (lobbyCode) => {
  const game = gameLogic.games[lobbyCode];
  game.turn = game.turnOrder[(game.turnOrder.indexOf(game.turn) + 1) % game.turnOrder.length];
  for (const userId of Object.keys(game.players)) {
    console.log("HIHIHI" + getSocketsFromLobbyCodeAndUserID(lobbyCode, userId));
    for (const socket of getSocketsFromLobbyCodeAndUserID(lobbyCode, userId)) {
      if (socket) {
        console.log("Turn update emitted");

        socket.emit("turn update", {
          userId: game.turn,
          username: game.players[game.turn],
        });
      }
    }
  }
};

module.exports = {
  /**
   * Initializes socket.io server and sets up event handlers
   * Handles connection, disconnection, and game-specific events
   * @param {Object} http - HTTP server instance
   */
  init: (http) => {
    io = require("socket.io")(http);
    io.on("connection", (socket) => {
      console.log(`socket has connected ${socket.id}`);
      socket.on("disconnect", (reason) => {
        const user = getUserFromSocketID(socket.id);
        removeUser(user, socket);
      });
      socket.on("join socket", (props) => {
        joinSocket({
          lobbyCode: props.lobbyCode,
          socket: socket,
          userId: props.userId,
        });
      });
      socket.on("enter word", (props) => {
        const user = getUserFromSocketID(socket.id);
        const game = gameLogic.games[props.lobbyCode];

        // check that game is still going on
        if (!game || game.gameStatus !== "active") {
          console.log("Game or status check failed:");
          console.log("games:", gameLogic.games);
          console.log("lobby code:", props.lobbyCode);
          console.log("game:", game);
          console.log("game status:", game?.gameStatus);
          return;
        }

        console.log("User check:");
        console.log("user:", user);
        console.log("user._id:", user._id);
        console.log("players:", game.players);
        console.log("player keys:", Object.keys(game.players));

        // Fix the player check
        if (user && game.players[user._id]) {
          console.log("User is a valid player, getting suggestions");
          suggestions = gameLogic.enterWord(user._id, props);
          for (const socket of getSocketsFromLobbyCodeAndUserID(props.lobbyCode, user._id)) {
            if (socket) {
              socket.emit("suggestions", suggestions);
            }
          }
          console.log("Emitted suggestions:", suggestions);
        } else {
          console.log(user);
          console.log(game.players[user._id]);
          console.log("User validation failed");
        }
      });
      socket.on("confirm word", (props) => {
        // deleteDuplicateJoins(props.lobbyCode);
        console.log("confirm word");
        console.log("Word:", props.word);
        if (props.isTutorial) {
          const tutorial_words = ["LETTER", "GROVE", "END", "GAME", "RANG", "RUNG"];
          if (!tutorial_words.includes(props.word)) {
            console.log("Word not in tutorial words list");
            return;
          }
        }
        const user = getUserFromSocketID(socket.id);
        const game = gameLogic.games[props.lobbyCode];
        // check if there are still words remaining
        if (game.mode === "Words" && game.userGameStates[user._id].wordsRemaining === 0) {
          console.log("No more words");
          return;
        }

        // check that game is still going on
        if (!game || game.gameStatus !== "active") return;

        let output;
        if (game.sameBoard) {
          if (game.turn !== user._id) {
            console.log("Wrong turn");
            return;
          }
        }
        if (user && game.players[user._id]) {
          output = gameLogic.confirmWord(user._id, props);
          if (output.error === "Word too short" || output.error === "Not a valid word") {
            console.log(output.error);
            for (const socket of getSocketsFromLobbyCodeAndUserID(props.lobbyCode, user._id)) {
              if (socket) {
                socket.emit("invalid word", { error: output.error });
              }
            }
            return;
          }
          /**
           * Emits updates specific to the current user
           * @param {Object} localUpdate
           * @param {Object} localUpdate.cropsCollected - Count of each fruit type collected
           * @param {Object} localUpdate.powerupsCollected - Count of each powerup type collected
           * @param {number} localUpdate.pointsGained - Points earned from this word
           * @param {Array} localUpdate.letterUpdates - Array of letter placements on board
           * @param {number} localUpdate.totalPoints - User's updated total score
           * @param {Array} localUpdate.endpoints - Updated valid endpoints for next word
           * @param {number} localUpdate.wordsRemaining - Updated number of words remaining
           */
          for (const socket of getSocketsFromLobbyCodeAndUserID(props.lobbyCode, user._id)) {
            if (socket) {
              socket.emit("user update", output.localUpdate);
            }
          }
          if (game.mode === "Words") {
            for (const socket of getSocketsFromLobbyCodeAndUserID(props.lobbyCode, user._id)) {
              if (socket) {
                socket.emit("words update", {
                  wordsRemaining: output.localUpdate.wordsRemaining,
                  wordLimit: game.userGameStates[user._id].wordLimit,
                });
              }
            }
          }
          if (game.mode === "Points") {
            for (const socket of getSocketsFromLobbyCodeAndUserID(props.lobbyCode, user._id)) {
              if (socket) {
                socket.emit("points update", { pointsToWin: game.pointsToWin });
              }
            }
          }
          if (game.sameBoard) {
            for (const userId in game.players) {
              if (userId !== user._id) {
                sendBoardState(
                  props.lobbyCode,
                  userId,
                  output.localUpdate.letterUpdates,
                  output.localUpdate.cropUpdates
                );
              }
            }
          }
          /**
           * Emits updates that affect all players in the game
           * @param {Object} globalUpdate
           * @param {string} globalUpdate.logMessage - Message to display in game log
           * @param {Array<{playerId: string, username: string, score: number}>} globalUpdate.updatedRankings - Current rankings sorted by score
           */
          for (const userId of Object.keys(game.players)) {
            for (const socket of getSocketsFromLobbyCodeAndUserID(props.lobbyCode, userId)) {
              console.log("socketid: " + socket.id);
              console.log("userid: " + userId);
              if (socket) {
                socket.emit("global update", output.globalUpdate);
              }
            }
          }
          if (game.sameBoard) {
            passTurn(props.lobbyCode);
          }
          if (game.mode === "Words") {
            let finished = true;
            console.log("Checking for finished game");
            for (const userId of Object.keys(game.players)) {
              console.log("HERE");
              if (game.userGameStates[userId].wordsRemaining > 0) {
                finished = false;
                break;
              }
            }
            if (finished) {
              game.gameStatus = "ended";
            }
          }
          // check if game is over
          if (gameLogic.games[props.lobbyCode].gameStatus === "ended") {
            let winnerMessage = output.globalUpdate.updatedRankings[0].username + " wins!";
            handleEndGame({
              lobbyCode: props.lobbyCode,
              reason: winnerMessage,
              isTutorial: props.isTutorial,
            });
          }
        }
      });
    });
  },

  addUser: addUser,
  removeUser: removeUser,

  getSocketFromUserID: getSocketFromUserID,
  getUserFromSocketID: getUserFromSocketID,
  getSocketFromSocketID: getSocketFromSocketID,
  getAllConnectedUsers: getAllConnectedUsers,
  getIo: () => io,
  sendUserInitialGame: sendUserInitialGame,
  initiateGame: initiateGame,
  handleEndGame: handleEndGame,
  startTimer: startTimer,
  joinSocket: joinSocket,
  lobbyToGameTransition: lobbyToGameTransition,
  updateLobbyUserList: updateLobbyUserList,
};
