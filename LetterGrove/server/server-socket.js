const gameLogic = require("./game-logic");
const { openLobbies } = require("./shared-state");
const CompletedGame = require("./models/completed-game");
const User = require("./models/user");

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
    counter: gameLogic.games[lobbyCode].counter,
    rankings: gameLogic.games[lobbyCode].rankings,
    log: gameLogic.games[lobbyCode].log,
  };
  console.log("POOP " + game.board);
  socket.emit("initial game", game);
};

const initiateGame = (props) => {
  const lobbyCode = props.lobbyCode;
  const gameInfo = props.gameInfo;
  const players = gameInfo.players;
  console.log(gameInfo);

  board = gameLogic.randomlyGenerateBoard({
    difficulty: gameInfo.difficulty,
  });
  game = {
    userGameStates: {},
    players: players,
    gameStatus: "waiting",
    stepsRemaining: gameInfo.steps,
    rankings: [],
    log: [],
    pointsToWin: 100,
  };
  for (const userId in players) {
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
      letters_collected: 0,
      words_formed: 0,
      powerups_used: 0,
    };
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
  console.log(players);
  startRunningGame({
    lobbyCode: lobbyCode,
    stepsLeft: game.stepsRemaining,
  });
  for (const userId in players) {
    console.log(userId);
    sendUserInitialGame(userId, lobbyCode);
  }
};

const startRunningGame = (props) => {
  const lobbyCode = props.lobbyCode;
  const game = gameLogic.games[lobbyCode];
  game.stepsRemaining = props.stepsLeft;

  console.log("Starting game timer for lobby:", lobbyCode);
  console.log("Initial steps remaining:", game.stepsRemaining);

  game.timerInterval = setInterval(() => {
    game.stepsRemaining--;

    if (game.stepsRemaining === 0) {
      game.gameStatus = "ended";
      handleEndGame({ lobbyCode: lobbyCode, reason: "Time's up" });
      clearInterval(game.timerInterval);
      return;
    }

    console.log(`Emitting time update for lobby ${lobbyCode}:`, game.stepsRemaining);
    // Get sockets in the room
    const room = io.sockets.adapter.rooms.get(lobbyCode);
    console.log("Sockets in room:", room ? Array.from(room) : "No room found");

    io.in(lobbyCode).emit("time update", { stepsRemaining: game.stepsRemaining });
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

const lobbyToGameTransition = (props) => {
  io.to(props.lobbyCode).emit("lobby to game transition");
  console.log("lobby game transition emitted");
};

const updateLobbyUserList = (props) => {
  io.to(props.lobbyCode).emit("update lobby user list", openLobbies[props.lobbyCode].players);
  console.log("update lobby user list emitted");
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

        // check that game is still going on
        if (!game || game.gameStatus !== "active") return;

        let output;
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
  lobbyToGameTransition: lobbyToGameTransition,
  updateLobbyUserList: updateLobbyUserList,
};
