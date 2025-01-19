const gameLogic = require("./game-logic");
const { openLobbies } = require("./shared-state");

let io;

const userToSocketMap = {}; // maps user ID to socket object
const socketToUserMap = {}; // maps socket ID to user object

const getAllConnectedUsers = () => Object.values(socketToUserMap);
const getSocketFromUserID = (userid) => userToSocketMap[userid];
const getUserFromSocketID = (socketid) => socketToUserMap[socketid];
const getSocketFromSocketID = (socketid) => io.sockets.sockets.get(socketid);

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

const removeUser = (user, socket) => {
  if (user) delete userToSocketMap[user._id];
  delete socketToUserMap[socket.id];
};

/**
 * Sends initial game state to a specific user in a lobby
 * @param {string} userId - ID of the user to send game state to
 * @param {string} lobbyCode - Code of the lobby to get game state from
 * @returns {void}
 *
 */
const sendUserInitialGame = (userId, lobbyCode) => {
  const socket = userToSocketMap[userId];
  game = {
    lobbyCode: lobbyCode,
    username: gameLogic.games[lobbyCode].userGameStates[userId].username,
    board: gameLogic.games[lobbyCode].userGameStates[userId].board,
    points: gameLogic.games[lobbyCode].userGameStates[userId].points,
    powerups: gameLogic.games[lobbyCode].userGameStates[userId].powerups,
    counter: gameLogic.games[lobbyCode].counter,
    rankings: gameLogic.games[lobbyCode].rankings,
    log: gameLogic.games[lobbyCode].log,
  };
  socket.emit("initial game", game);
};

const initiateGame = (props) => {
  const lobbyCode = props.lobbyCode;
  const gameInfo = props.gameInfo;
  const players = gameInfo.players;

  board = gameLogic.randomlyGenerateBoard({
    difficulty: gameInfo.difficulty,
  });
  game = {
    userGameStates: {},
    players: players,
    gameStatus: "waiting",
    timeRemaining: 0,
    rankings: [],
    log: [],
    pointsToWin: 100,
  };
  for (const userId in Object.keys(players)) {
    const username = players[userId];
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
    };
  }
  for (const userId in Object.keys(players)) {
    game.rankings.push({
      playerId: userId,
      username: players[userId],
      score: 0,
    });
  }
  gameLogic.games[lobbyCode] = game;
  gameLogic.games[lobbyCode].gameStatus = "active";
  for (const userId in Object.keys(players)) {
    sendUserInitialGame(userId, lobbyCode);
  }
};

const startRunningGame = (props) => {
  const lobbyCode = props.lobbyCode;
  const game = gameLogic.games[lobbyCode];
  game.timeRemaining = props.time;

  game.timerInterval = setInterval(() => {
    game.timeRemaining--;

    if (game.timeRemaining === 0) {
      game.gameStatus = "ended";
      handleEndGame({ lobbyCode: lobbyCode, reason: "Time's up" });
      clearInterval(game.timerInterval);
      return;
    }

    io.in(lobbyCode).emit("time update", { timeRemaining: game.timeRemaining });
  }, 1000);
};

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
  io.to(props.lobbyCode).emit("game over", {
    results: gameResults,
    reason: props.reason,
  });
};

const joinSocket = (props) => {
  const lobbyCode = props.lobbyCode;
  const user = getUserFromSocketID(props.socketid);
  console.log(openLobbies);
  if (user && user._id in Object.values(Object.keys(openLobbies[props.lobbyCode].players))) {
    userToSocketMap[user._id].join(lobbyCode);
  }
};

module.exports = {
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
        if (!game || game.gameStatus !== "active") return;

        let suggestions;
        if (
          user &&
          user._id in Object.values(Object.keys(gameLogic.games[props.lobbyCode].players))
        ) {
          suggestions = gameLogic.enterWord(user._id, props);
          /**
           * Emits word suggestions based on current board state
           * @param {Object} suggestions
           * @param {Array<string>} suggestions.validWords - List of valid words that can be formed
           * @param {Array<{x: number, y: number}>} suggestions.path - Coordinates showing path for each word
           * @param {number} suggestions.points - Potential points for suggested word
           */
          socket.emit("suggestions", suggestions);
        }
      });
      socket.on("confirm word", (props) => {
        const user = getUserFromSocketID(socket.id);
        const game = gameLogic.games[props.lobbyCode];

        // check that game is still going on
        if (!game || game.gameStatus !== "active") return;

        let output;
        if (
          user &&
          user._id in Object.values(Object.keys(gameLogic.games[props.lobbyCode].players))
        ) {
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
           */
          socket.emit("user update", output.localUpdate);
          /**
           * Emits updates that affect all players in the game
           * @param {Object} globalUpdate
           * @param {string} globalUpdate.logMessage - Message to display in game log
           * @param {Array<{playerId: string, username: string, score: number}>} globalUpdate.updatedRankings - Current rankings sorted by score
           */
          io.to(props.lobbyCode).emit("global update", output.globalUpdate);
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
  startRunningGame: startRunningGame,
  joinSocket: joinSocket,
};
