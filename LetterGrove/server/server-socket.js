const gameLogic = require("./game-logic");

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

const confirmWordUpdate = (userId, lobbyCode, change) => {
  const socket = userToSocketMap[userId];
  /*
  Change can be represented by the following:
  An array of letters that have been placed down
  Fruits collected
  Powerups collected
  Points gained
  Total points
  (everything that changes on the front end)
  */
}

/**
 * Updates game rankings and notifies client of changes
 * @param {string} userId - ID of the user to send update to
 * @param {string} lobbyCode - Code of the lobby where the update occurred
 * @param {Object} rankingUpdate - Object containing ranking update information
 * @param {string} rankingUpdate.logMessage - Message to be displayed in game log
 * @param {Array<{playerId: string, username: string, score: number}>} [rankingUpdate.updatedRankings] - New player rankings (if changed)
 */
const updateRankings = (userId, lobbyCode, rankingUpdate) => {
  const socket = userToSocketMap[userId];
  socket.emit("rankings update", {
    rankingUpdate: rankingUpdate,
    lobbyCode: lobbyCode
  });
}

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
    log: gameLogic.games[lobbyCode].log
  }
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
    timeRemaining: 0,
    rankings: [],
    log: [],
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
        shovel: 0
      },
      endpoints: [[0, 0]]
    }
  }
  for (const userId in Object.keys(players)) {
    game.rankings.push({
      playerId: userId,
      username: players[userId],
      score: 0
    });
  }
  gameLogic.games[lobbyCode] = game;
  for (const userId in Object.keys(players)) {
    sendUserInitialGame(userId, lobbyCode);
  }
};

const startRunningGame = (props) => {
  const lobbyCode = props.lobbyCode;
  let timeRemaining = props.time;
  setInterval (() => {
    timeRemaining--;
    io.emit("time update", {lobbyCode: lobbyCode, timeRemaining: timeRemaining});
  }, 1000)
}

module.exports = {
  init: (http) => {
    io = require("socket.io")(http);

    io.on("connection", (socket) => {
      console.log(`socket has connected ${socket.id}`);
      socket.on("disconnect", (reason) => {
        const user = getUserFromSocketID(socket.id);
        removeUser(user, socket);
      });
      socket.on("enter word", (props) => {
        const user = getUserFromSocketID(socket.id);
        let suggestions;
        if (user && user._id in Object.values(Object.keys(gameLogic.games[props.lobbyCode].players))) {
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
        let output;
        if (user && user._id in Object.values(Object.keys(gameLogic.games[props.lobbyCode].players))) {
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
          socket.emit("global update", output.globalUpdate);
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
  initiateGame: initiateGame
};
