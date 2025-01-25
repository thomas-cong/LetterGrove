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

// Helper functions for user-socket management
const getAllConnectedUsers = () => Object.values(socketToUserMap);
const getSocketFromUserID = (userid) => userToSocketMap[userid];
const getUserFromSocketID = (socketid) => socketToUserMap[socketid];
const getSocketFromSocketID = (socketid) => io.sockets.sockets.get(socketid);

/**
 * Associates a user with their socket connection
 * Handles cases where a user has multiple tabs open by forcing older connections to disconnect
 * @param {Object} user - User object containing _id and other user data
 * @param {Object} socket - Socket.io socket instance
 */
const addUser = (user, socket) => {
  const oldSocket = userToSocketMap[user._id];
  if (oldSocket && oldSocket.id !== socket.id) {
    // there was an old tab open for this user, force it to disconnect
    // FIXME: is this the behavior you want?
    oldSocket.disconnect();
    delete socketToUserMap[oldSocket.id];
  }

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
  const socket = userToSocketMap[userId];
  if (!socket) {
    console.log("No socket found for user " + userId);
    return;
  }
  game = {
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
  socket.emit("initial game", game);
};

/**
 * Initializes a new game instance with the specified settings
 * Handles both single-board and multi-board game modes
 * Sets up initial game state, player positions, and turn order
 * @param {Object} props - Contains lobbyCode and gameInfo
 * @param {string} props.lobbyCode - Unique identifier for the game
 * @param {Object} props.gameInfo - Game configuration including players, difficulty, and board settings
 */
const initiateGame = (props) => {
  const lobbyCode = props.lobbyCode;
  const gameInfo = props.gameInfo;
  const players = gameInfo.players;
  const sameBoard = gameInfo.sameBoard;
  const mode = gameInfo.mode; // 'words', 'points', or 'time'
  const numPlayers = Object.keys(players).length;

  board = gameLogic.randomlyGenerateBoard({
    difficulty: gameInfo.difficulty,
    sameBoard: sameBoard,
    playerCount: numPlayers,
  });
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
    };
  } else {
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
    };
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
          spade: 0,
          water: 0,
          shovel: 0,
        },
        endpoints: [startingEndpoints.pop()],
        letters_collected: 0,
        words_formed: 0,
        powerups_used: 0,
        wordsRemaining: mode === "Words" ? gameInfo.steps : null,
        wordLimit: mode === "Words" ? gameInfo.steps : null,
      };
    } else {
      game.userGameStates[userId] = {
        username: username,
        board: gameLogic.deepCopyBoard(board),
        points: 0,
        powerups: {
          spade: 0,
          water: 0,
          shovel: 0,
        },
        endpoints: [[0, 0]],
        letters_collected: 0,
        words_formed: 0,
        powerups_used: 0,
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
  gameLogic.games[lobbyCode] = game;
  gameLogic.games[lobbyCode].gameStatus = "active";
  console.log("Game started:", {
    lobbyCode,
    mode,
    sameBoard,
    numPlayers,
  });
  if (mode === "Time") {
    io.in(lobbyCode).emit("time update", {
      secondsRemaining: gameInfo.steps,
    });
  }
  if (mode === "Words") {
    io.in(lobbyCode).emit("words update", {
      wordsRemaining: gameInfo.steps,
      wordLimit: gameInfo.steps,
    });
  }
  if (mode === "Points") {
    io.in(lobbyCode).emit("points update", {
      pointsToWin: gameInfo.steps,
    });
  }
  startTimer({
    lobbyCode: lobbyCode,
    secondsRemaining: game.secondsRemaining,
  });
  for (const userId in players) {
    sendUserInitialGame(userId, lobbyCode);
  }
  io.in(lobbyCode).emit("turn update", {
    userId: game.turn,
    username: players[game.turn].username,
  });
};

/**
 * Starts the game timer and handles game progression
 * Decrements steps remaining and checks for game end conditions
 * @param {Object} props - Contains lobbyCode and initial steps
 */
const startTimer = (props) => {
  const lobbyCode = props.lobbyCode;
  const game = gameLogic.games[lobbyCode];
  game.stepsRemaining = props.stepsLeft;

  console.log("Starting game timer for lobby:", lobbyCode);
  console.log("Initial steps remaining:", game.stepsRemaining);

  game.timerInterval = setInterval(() => {
    game.stepsRemaining--;

    if (game.secondsRemaining === 0) {
      game.gameStatus = "ended";
      handleEndGame({ lobbyCode: lobbyCode, reason: "Time's up! " + game.rankings[0].username + " wins with " + game.rankings[0].score + " points!" });
      clearInterval(game.timerInterval);
      return;
    }

    if (game.mode === "Time") {
      console.log("Time remaining:", game.secondsRemaining);
      io.in(lobbyCode).emit("time update", { secondsRemaining: game.secondsRemaining });
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
    winner: game.rankings[0].playerId,
    winnerUsername: game.rankings[0].username,
    winnerScore: game.rankings[0].score,
    finalRankings: game.rankings,
  };
  clearInterval(game.timerInterval);
  let boards = {};
  for (const userId in game.players) {
    boards[userId] = game.userGameStates[userId].board;
  }
  const completedGame = new CompletedGame({
    boards: boards,
    players: game.players,
    finalRankings: game.rankings,
  });
  for (const userId in game.players) {
    const userGameState = game.userGameStates[userId];
    User.findByIdAndUpdate(
      userId,
      {
        $inc: {
          games_played: 1,
          wins: game.rankings[0].score === userGameState.points ? 1 : 0,
          letters: userGameState.letters_collected || 0,
          powerups: userGameState.powerups_used || 0,
          words: userGameState.words_formed || 0,
          points: userGameState.points || 0,
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
  io.to(props.lobbyCode).emit("game over", {
    results: gameResults,
    reason: props.reason,
  });
};

/**
 * Adds a user to a game room (socket.io room)
 * Verifies user is authorized to join the specified lobby
 * @param {Object} props - Contains lobbyCode and socketid
 */
const joinSocket = (props) => {
  const lobbyCode = props.lobbyCode;
  const user = getUserFromSocketID(props.socketid);
  console.log(openLobbies);
  if (user && openLobbies[props.lobbyCode] && openLobbies[props.lobbyCode].players[user._id]) {
    userToSocketMap[user._id].join(lobbyCode);
    console.log(`User ${user._id} joined room ${lobbyCode}`);
  }
  updateLobbyUserList({ lobbyCode: props.lobbyCode });
};

/**
 * Notifies all players in a lobby that the game is transitioning from lobby to active state
 * @param {Object} props - Contains lobbyCode
 */
const lobbyToGameTransition = (props) => {
  io.to(props.lobbyCode).emit("lobby to game transition");
  console.log("lobby game transition emitted");
};

/**
 * Updates all players in a lobby with the current list of players
 * Used when players join or leave the lobby
 * @param {Object} props - Contains lobbyCode
 */
const updateLobbyUserList = (props) => {
  io.to(props.lobbyCode).emit("update lobby user list", openLobbies[props.lobbyCode].players);
  console.log("update lobby user list emitted");
};

/**
 * Sends updated board state to a specific player
 * Used in same-board mode when any player makes a move
 * @param {string} userId - ID of user to update
 * @param {string} lobbyCode - Code of the game
 */
const sendBoardState = (userId, letterUpdates) => {
  const socket = getSocketFromUserID(userId);
  if (!socket) return;
  socket.emit("board update", letterUpdates);
};

/**
 * Advances the turn to the next player in turn order
 * Used in same-board mode after a player completes their move
 * @param {string} lobbyCode - Code of the game
 */
const passTurn = (lobbyCode) => {
  const game = gameLogic.games[lobbyCode];
  game.turn = game.turnOrder[(game.turnOrder.indexOf(game.turn) + 1) % game.turnOrder.length];
  io.in(lobbyCode).emit("turn update", {
    userId: game.turn,
    username: game.players[game.turn].username,
  });
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
        props.socketid = socket.id;
        joinSocket(props);
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
          socket.emit("suggestions", suggestions);
          console.log("Emitted suggestions:", suggestions);
        } else {
          console.log(user);
          console.log(game.players[user._id]);
          console.log("User validation failed");
        }
      });
      socket.on("confirm word", (props) => {
        console.log("confirm word");
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
          /**
           * Emits updates specific to the current user
           * @param {Object} localUpdate
           * @param {Object} localUpdate.fruitsCollected - Count of each fruit type collected
           * @param {Object} localUpdate.powerupsCollected - Count of each powerup type collected
           * @param {number} localUpdate.pointsGained - Points earned from this word
           * @param {Array} localUpdate.letterUpdates - Array of letter placements on board
           * @param {number} localUpdate.totalPoints - User's updated total score
           * @param {Array} localUpdate.endpoints - Updated valid endpoints for next word
           * @param {number} localUpdate.wordsRemaining - Updated number of words remaining
           */
          socket.emit("user update", output.localUpdate);
          if (game.mode === "Words") {
            socket.emit("words update", { wordsRemaining: output.localUpdate.wordsRemaining, wordLimit: game.userGameStates[user._id].wordLimit });
          }
          if (game.mode === "Points") {
            socket.emit("points update", { pointsToWin: game.pointsToWin });
          }
          if (game.sameBoard) {
            for (const userId in game.players) {
              if (userId !== user._id) {
                sendBoardState(userId, output.localUpdate.letterUpdates);
              }
            }
          }
          /**
           * Emits updates that affect all players in the game
           * @param {Object} globalUpdate
           * @param {string} globalUpdate.logMessage - Message to display in game log
           * @param {Array<{playerId: string, username: string, score: number}>} globalUpdate.updatedRankings - Current rankings sorted by score
           */
          io.to(props.lobbyCode).emit("global update", output.globalUpdate);
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
            handleEndGame({ lobbyCode: props.lobbyCode, reason: winnerMessage });
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
