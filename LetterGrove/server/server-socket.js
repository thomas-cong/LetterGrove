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
const sendUserGameState = (userId, lobbyCode) => {
  const socket = userToSocketMap[userId];
  gameState = {
    board: gameLogic.gameStates[lobbyCode].boards[userId],
    points: gameLogic.gameStates[lobbyCode].points[userId],
    powerUps: gameLogic.gameStates[lobbyCode].powerUps[userId],
    counter: gameLogic.gameStates[lobbyCode].counter[userId],
    rankings: gameLogic.gameStates[lobbyCode].rankings,
    log: gameLogic.gameStates[lobbyCode].log
  }
  socket.emit("update", gameState);
};

const initiateGame = (props) => {
  const lobbyCode = props.lobbyCode;
  const gameInfo = props.gameInfo;
  const players = gameInfo.players;
  
  gameState = {}
  for (let player in players) {
    let player_id = player.userId;
    let username = player.username;
    gameState[player_id] = {
      username: username,
      board: null,
      points: 0,
      powerUps: {
        spade: 0,
        water: 0,
        shovel: 0
      },
      counter: 0,
      rankings: [],
      log: []
    }
  }
  board = gameLogic.randomlyGenerateBoard({
    difficulty: gameInfo.difficulty,
  });

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
    });
  },

  addUser: addUser,
  removeUser: removeUser,

  getSocketFromUserID: getSocketFromUserID,
  getUserFromSocketID: getUserFromSocketID,
  getSocketFromSocketID: getSocketFromSocketID,
  getIo: () => io,
};
