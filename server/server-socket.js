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
const lobbyAndUserToSocketMap = {}; // maps game ID and user ID to socket object
const socketToLobbyMap = {};

// Helper functions for user-socket management
const getAllConnectedUsers = () => Object.values(socketToUserMap);
const getSocketFromUserID = (userid) => userToSocketMap[userid];
const getUserFromSocketID = (socketid) => socketToUserMap[socketid];
const getSocketFromSocketID = (socketid) => io.sockets.sockets.get(socketid);

// Socket operations
const getSocketFromLobbyCodeAndUserID = (lobbyCode, userid) => {
  return lobbyAndUserToSocketMap[lobbyCode][userid];
};
const getLobbyCodeFromSocketID = (socketid) => {
  return socketToLobbyMap[socketid];
};

const getGameFromSocketID = (socketid) => socketToLobbyMap[socketid];

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
  // console.log("sending user initial game");
  // console.log(gameLogic.games[lobbyCode]);
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
  const socket = getSocketFromLobbyCodeAndUserID(lobbyCode, userId);
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
  const minWordLength = gameInfo.minWordLength;

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
      grape: 3,
      orange: 5,
      crate: 10,
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
      { x: 0, y: 0, letter: "L", crop: "", powerUp: "", visited: true },
      { x: 1, y: 0, letter: "E", crop: "", powerUp: "", visited: false },
      { x: 2, y: 0, letter: "T", crop: "", powerUp: "", visited: false },
      { x: 3, y: 0, letter: "", crop: "cherry", powerUp: "", visited: false },
      { x: 4, y: 0, letter: "E", crop: "", powerUp: "", visited: false },
      { x: 5, y: 0, letter: "", crop: "grape", powerUp: "", visited: false },

      { x: 5, y: 1, letter: "", crop: "crate", powerUp: "", visited: false },
      { x: 5, y: 2, letter: "", crop: "orange", powerUp: "", visited: false },

      { x: 4, y: 4, letter: "", crop: "", powerUp: "", visited: false },
      { x: 3, y: 5, letter: "M", crop: "", powerUp: "", visited: false },
      { x: 2, y: 6, letter: "E", crop: "", powerUp: "", visited: false },

      { x: 5, y: 3, letter: "G", crop: "", powerUp: "", visited: false },
      { x: 6, y: 4, letter: "", crop: "", powerUp: "twoTimes", visited: false },
      { x: 7, y: 5, letter: "O", crop: "", powerUp: "", visited: false },
      { x: 8, y: 6, letter: "", crop: "", powerUp: "wateringCan", visited: false },
      { x: 9, y: 7, letter: "E", crop: "", powerUp: "", visited: false },
      { x: 10, y: 7, letter: "", crop: "", powerUp: "", visited: false },

      { x: 11, y: 7, letter: "D", crop: "", powerUp: "", visited: false },

      { x: 14, y: 12, letter: "", crop: null, powerUp: null, visited: false },
      { x: 13, y: 11, letter: "", crop: null, powerUp: null, visited: false },
      { x: 9, y: 2, letter: "", crop: null, powerUp: null, visited: false },
    ];

    tutorialLetters.forEach(({ x, y, letter, crop, powerUp, visited }) => {
      board[y][x] = {
        letter: letter,
        crop: crop,
        powerUp: powerUp,
        visited: visited,
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
    // console.log("Same board mode");
    game = {
      minWordLength: minWordLength,
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
    // console.log("Different board mode");
    game = {
      minWordLength: minWordLength,
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
    // console.log("game:", game);
  }

  let startingEndpoints;
  // console.log("players length");
  // console.log(numPlayers);

  if (sameBoard) {
    if (numPlayers === 1) {
      startingEndpoints = [[0, 0]];
    } else if (numPlayers === 2) {
      startingEndpoints = [
        [0, 0],
        [14, 14],
      ];
    } else if (numPlayers === 3) {
      startingEndpoints = [
        [0, 0],
        [0, 14],
        [14, 14],
      ];
    } else if (numPlayers === 4) {
      startingEndpoints = [
        [0, 0],
        [0, 14],
        [14, 14],
        [14, 0],
      ];
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
  // console.log("game:", game);
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
      const socket = getSocketFromLobbyCodeAndUserID(lobbyCode, userId);
      if (socket) {
        socket.emit("time update", {
          secondsRemaining: gameInfo.steps,
        });
      }
    }
  }
  if (mode === "Words") {
    // console.log("Players", Object.keys(players));
    for (const userId of Object.keys(players)) {
      // console.log("user ID", userId);
      const socket = getSocketFromLobbyCodeAndUserID(lobbyCode, userId);
      if (socket) {
        socket.emit("words update", {
          wordsRemaining: gameInfo.steps,
          wordLimit: gameInfo.steps,
        });
      }
    }
  }
  if (mode === "Points") {
    for (const userId of Object.keys(players)) {
      const socket = getSocketFromLobbyCodeAndUserID(lobbyCode, userId);
      if (socket) {
        socket.emit("points update", {
          pointsToWin: gameInfo.steps,
        });
      }
    }
  }
  startTimer({
    lobbyCode: lobbyCode,
    secondsRemaining: game.secondsRemaining,
  });

  if (sameBoard) {
    for (const userId of Object.keys(players)) {
      const socket = getSocketFromLobbyCodeAndUserID(lobbyCode, userId);
      if (socket) {
        // console.log("Turn update emitted");

        socket.emit("turn update", {
          userId: game.turn,
          username: players[game.turn],
        });
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

  // console.log("Starting game timer for lobby:", lobbyCode);
  // console.log("Initial steps remaining:", game.secondsRemaining);

  game.timerInterval = setInterval(() => {
    game.secondsElapsed++;
    game.secondsRemaining--;

    if (game.mode === "Time") {
      // console.log("Time remaining:", game.secondsRemaining);
      for (const userId of Object.keys(game.players)) {
        const socket = getSocketFromLobbyCodeAndUserID(lobbyCode, userId);
        if (socket) {
          socket.emit("time update", { secondsRemaining: game.secondsRemaining });
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
  let endpoints = {};
  for (const userId in game.players) {
    endpoints[userId] = game.userGameStates[userId].endpoints;
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
      endpoints: endpoints,
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
    const socket = getSocketFromLobbyCodeAndUserID(lobbyCode, userId);
    if (socket) {
      socket.emit("game over", {
        results: gameResults,
        reason: props.reason,
      });
    }
  }
  delete gameLogic.games[lobbyCode];
  delete openLobbies[lobbyCode];
  delete lobbyAndUserToSocketMap[lobbyCode];
};

/**
 * Disconnects a socket and cleans up all its references
 * @param {Object} socket - Socket.io socket instance to disconnect
 * @param {string} userId - ID of the user whose socket to disconnect
 */
const disconnectSocket = (socket, userId) => {
  if (!socket) return;

  // Clean up socket from lobby mappings if it exists
  if (socketToLobbyMap[socket.id]) {
    const lobbyCode = socketToLobbyMap[socket.id];
    if (lobbyAndUserToSocketMap[lobbyCode] && lobbyAndUserToSocketMap[lobbyCode][userId]) {
      console.log("deleting socket from lobby", socket.id);
      delete lobbyAndUserToSocketMap[lobbyCode][userId];
    }
    delete socketToLobbyMap[socket.id];
  }

  // Clean up user-socket mappings
  const user = getUserFromSocketID(socket.id);
  if (user) {
    delete userToSocketMap[user._id];
  }
  delete socketToUserMap[socket.id];
};

/**
 * Adds a user to a game room (socket.io room)
 * Verifies user is authorized to join the specified lobby
 * @param {Object} props - Contains lobbyCode, socketid, and userId
 */

const joinSocket = (props) => {
  const lobbyCode = props.lobbyCode;
  const userId = props.userId;
  if (!lobbyAndUserToSocketMap[lobbyCode]) {
    lobbyAndUserToSocketMap[lobbyCode] = {};
  }
  // console.log(
  //   "as of right now, Object.keys(lobbyAndUserToSocketMap[lobbyCode]) = ",
  //   Object.keys(lobbyAndUserToSocketMap[lobbyCode])
  // );
  if (!lobbyAndUserToSocketMap[lobbyCode][userId]) {
    lobbyAndUserToSocketMap[lobbyCode][userId] = props.socket;
  }
  if (lobbyAndUserToSocketMap[lobbyCode][userId].id !== props.socket.id) {
    // Disconnect the old socket
    lobbyAndUserToSocketMap[lobbyCode][userId].emit("you have been disconnected");
    console.log("disconnecting old socket");
    lobbyAndUserToSocketMap[lobbyCode][userId].disconnect(true);
  }
  lobbyAndUserToSocketMap[lobbyCode][userId] = props.socket;
  socketToLobbyMap[props.socket.id] = props.lobbyCode;
  if (openLobbies[lobbyCode] && !openLobbies[lobbyCode].gameStarted) {
    updateLobbyUserList({
      lobbyCode: props.lobbyCode,
      userId: props.userId,
      socket: props.socket,
    });
  }
  props.socket.emit("socket joined game");
  setTimeout(() => {
    if (openLobbies[props.lobbyCode] && !openLobbies[props.lobbyCode].gameStarted) {
      updateLobbyUserList({
        lobbyCode: props.lobbyCode,
        userId: props.userId,
        socket: props.socket,
      });
    }
    props.socket.emit("socket joined game");
  }, 50);
  setTimeout(() => {
    if (openLobbies[props.lobbyCode] && !openLobbies[props.lobbyCode].gameStarted) {
      updateLobbyUserList({
        lobbyCode: props.lobbyCode,
        userId: props.userId,
        socket: props.socket,
      });
    }
    props.socket.emit("socket joined game");
  }, 250);
  setTimeout(() => {
    if (openLobbies[props.lobbyCode] && !openLobbies[props.lobbyCode].gameStarted) {
      updateLobbyUserList({
        lobbyCode: props.lobbyCode,
        userId: props.userId,
        socket: props.socket,
      });
    }
    props.socket.emit("socket joined game");
  }, 500);
};

/**
 * Notifies all players in a lobby that the game is transitioning from lobby to active state
 * @param {Object} props - Contains lobbyCode
 */
const lobbyToGameTransition = (props) => {
  for (const userId of Object.keys(openLobbies[props.lobbyCode].players)) {
    const socket = getSocketFromLobbyCodeAndUserID(props.lobbyCode, userId);
    if (socket) {
      socket.emit("lobby to game transition");
    }
  }
  // console.log("lobby game transition emitted");
};

/**
 * Updates all players in a lobby with the current list of players
 * Used when players join or leave the lobby
 * @param {Object} props - Contains lobbyCode
 */
const updateLobbyUserList = (props) => {
  for (const userId of Object.keys(lobbyAndUserToSocketMap[props.lobbyCode] || {})) {
    const socket = getSocketFromLobbyCodeAndUserID(props.lobbyCode, userId);
    if (socket) {
      // console.log(openLobbies[props.lobbyCode].players);
      // console.log(userId);
      // console.log("keys: " + Object.keys(lobbyAndUserToSocketMap[props.lobbyCode]));
      // console.log(
      //   "emitting update lobby user list to ",
      //   openLobbies[props.lobbyCode].players[userId]
      // );
      socket.emit("update lobby user list", openLobbies[props.lobbyCode].players);
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
  const socket = getSocketFromLobbyCodeAndUserID(lobbyCode, userId);
  if (socket) {
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
    const socket = getSocketFromLobbyCodeAndUserID(lobbyCode, userId);
    if (socket) {
      // console.log("Turn update emitted");

      socket.emit("turn update", {
        userId: game.turn,
        username: game.players[game.turn],
      });
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
        console.log(`socket has disconnected ${socket.id}`);
        const user = getUserFromSocketID(socket.id);
        if (!user) return;
        removeUser(user, socket);
        disconnectSocket(socket, user._id);
      });
      socket.on("join socket", (props) => {
        console.log("join socket");
        joinSocket({
          lobbyCode: props.lobbyCode,
          socket: socket,
          userId: props.userId,
          location: props.location,
        });
      });
      socket.on("enter word", (props) => {
        if (!(props.lobbyCode in gameLogic.games)) {
          console.log("Lobby not open");
          return;
        }
        const user = getUserFromSocketID(socket.id);
        const game = gameLogic.games[props.lobbyCode];

        // check that game is still going on
        if (!game || game.gameStatus !== "active") {
          return;
        }

        // Fix the player check
        if (user && game.players[user._id]) {
          suggestions = gameLogic.enterWord(user._id, props);
          const socket = getSocketFromLobbyCodeAndUserID(props.lobbyCode, user._id);
          if (socket) {
            socket.emit("suggestions", suggestions);
          }
        } else {
          console.log(user);
          console.log(game.players[user._id]);
          console.log("User validation failed");
        }
      });
      socket.on("confirm word", (props) => {
        // deleteDuplicateJoins(props.lobbyCode);
        if (!(props.lobbyCode in gameLogic.games)) {
          console.log("Lobby not open");
          return;
        }
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
            const socket = getSocketFromLobbyCodeAndUserID(props.lobbyCode, user._id);
            if (socket) {
              socket.emit("invalid word", { error: output.error });
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
          const socket = getSocketFromLobbyCodeAndUserID(props.lobbyCode, user._id);
          if (socket) {
            socket.emit("user update", output.localUpdate);
          }
          if (game.mode === "Words") {
            const socket = getSocketFromLobbyCodeAndUserID(props.lobbyCode, user._id);
            if (socket) {
              socket.emit("words update", {
                wordsRemaining: output.localUpdate.wordsRemaining,
                wordLimit: game.userGameStates[user._id].wordLimit,
              });
            }
          }
          if (game.mode === "Points") {
            const socket = getSocketFromLobbyCodeAndUserID(props.lobbyCode, user._id);
            if (socket) {
              socket.emit("points update", { pointsToWin: game.pointsToWin });
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
            const socket = getSocketFromLobbyCodeAndUserID(props.lobbyCode, userId);
            if (socket) {
              socket.emit("global update", output.globalUpdate);
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
  disconnectSocket: disconnectSocket,
  passTurn: passTurn,
  sendBoardState: sendBoardState,
  lobbyToGameTransition: lobbyToGameTransition,
};
