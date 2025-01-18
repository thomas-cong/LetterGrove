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

/* send game state to specific client */
const sendUserGame = (userId, lobbyCode) => {
  const socket = userToSocketMap[userId];
  game = {
    username: gameLogic.games[lobbyCode].userGameStates[userId].username,
    board: gameLogic.games[lobbyCode].userGameStates[userId].board,
    points: gameLogic.games[lobbyCode].userGameStates[userId].points,
    powerUps: gameLogic.games[lobbyCode].userGameStates[userId].powerUps,
    counter: gameLogic.games[lobbyCode].counter,
    rankings: gameLogic.games[lobbyCode].rankings,
    log: gameLogic.games[lobbyCode].log
  }
  socket.emit("update", game);
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
    counter: 0,
    rankings: [],
    log: [],
  };
  for (const userId in players) {
    const username = players[userId]
    game.userGameStates[userId] = {
      username: username,
      board: gameLogic.deepCopyBoard(board),
      points: 0,
      powerUps: {
        spade: 0,
        water: 0,
        shovel: 0
      },
      endpoints: [[0, 0]]
    }
  }
  gameLogic.games[lobbyCode] = game;
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
      socket.on("enter word", (props) => {
        const user = getUserFromSocketID(socket.id);
        if (user && user._id in gameLogic.games[props.lobbyCode].players) {
          gameLogic.enterWord(user._id, props);
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
