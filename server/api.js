/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const LobbyCode = require("./models/lobby-code");
const CompletedGame = require("./models/completed-game");
// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");
const { openLobbies } = require("./shared-state");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
router.get("/generateLobbyCode", async (req, res) => {
  //Generate an initial code and find similar
  let lobbyCodeGenerated = Array.from({ length: 5 }, () =>
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(
      Math.floor(Math.random() * 62)
    )
  ).join("");
  let sharedCodes = await LobbyCode.find({ lobbyCode: lobbyCodeGenerated });

  // Check if there are any shared Codes
  while (sharedCodes.length >= 1) {
    lobbyCodeGenerated = Array.from({ length: 5 }, () =>
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(
        Math.floor(Math.random() * 62)
      )
    ).join("");
    sharedCodes = await LobbyCode.find({ lobbyCode: lobbyCodeGenerated });
  }
  const newLobbyCode = new LobbyCode({ lobbyCode: lobbyCodeGenerated });
  newLobbyCode.save().then((code) => {
    console.log("Lobby with ID " + code.lobbyCode + " created");
  });
  res.send({ lobbyCodeGenerated });
});

router.post("/openLobby", (req, res) => {
  const gameSettings = req.body.gameSettings;
  const lobbyCode = req.body.lobbyCode;
  const username = req.body.username;

  // Debug session state
  console.log("Session debug:", {
    hasSession: !!req.session,
    sessionUser: req.session?.user,
    reqUser: req.user,
    sessionID: req.sessionID,
  });

  // Check if user is authenticated
  if (!req.user) {
    console.log("User not authenticated");
    return res.status(401).send({ error: "Not authenticated" });
  }

  console.log("Auth state:", {
    hasUser: !!req.user,
    userId: req.user._id,
    username: req.body.username,
  });
  console.log("Username:", username);

  // map lobbyCode to lobby information
  openLobbies[lobbyCode] = {
    minWordLength: gameSettings.minWordLength,
    pointsModifier: gameSettings.pointsModifier,
    mode: gameSettings.mode,
    steps: gameSettings.steps,
    defaultLetters: gameSettings.defaultLetters,
    powerups: gameSettings.powerups,
    players: {
      [req.user._id]: username,
    },
    lobbyOwner: req.user._id,
  };

  console.log("Lobby with ID " + lobbyCode + " opened");
  console.log("Current lobbies:", openLobbies);
  socketManager.joinSocket({ lobbyCode: lobbyCode, socketid: req.user._id });
  res.send({ message: "Lobby Created" });
});

router.post("/joinLobby", (req, res) => {
  const lobbyCode = req.body.lobbyCode;
  const username = req.body.username;

  // Debug session state
  console.log("Session debug:", {
    hasSession: !!req.session,
    sessionUser: req.session?.user,
    reqUser: req.user,
    sessionID: req.sessionID,
  });

  // Check if user is authenticated
  if (!req.user) {
    console.log("User not authenticated");
    return res.status(401).send({ error: "Not authenticated" });
  }

  console.log("Auth state:", {
    hasUser: !!req.user,
    userId: req.user._id,
    username: req.body.username,
  });

  if (lobbyCode in openLobbies) {
    openLobbies[lobbyCode].players[req.user._id] = username;
    socketManager.joinSocket({ lobbyCode: lobbyCode });
    res.send({ message: "Lobby Joined" });
  } else {
    console.log("Lobby with ID " + lobbyCode + " not found");
    res.status(404).send({ error: "Lobby not found" });
  }
});

router.get("/isLobbyOwner", (req, res) => {
  const lobbyCode = req.query.lobbyCode;
  if (!lobbyCode || !openLobbies[lobbyCode]) {
    return res.status(404).send(false);
  }
  if (!req.user) {
    return res.status(401).send(false);
  }
  if (openLobbies[lobbyCode].lobbyOwner == req.user._id) {
    res.send(true);
  } else {
    res.send(false);
  }
});

router.post("/lobbyToGameTransition", (req, res) => {
  const gameInfo = openLobbies[req.body.lobbyCode];
  console.log(req.body.lobbyCode);
  console.log(openLobbies);
  if (gameInfo.lobbyOwner != req.user._id) {
    return res.status(401).send({ error: "Not authorized" });
  }
  if (!gameInfo) {
    return res.status(404).send({ error: "Lobby not found" });
  }
  console.log("MADE IT HERE!");
  socketManager.lobbyToGameTransition({
    lobbyCode: req.body.lobbyCode,
  });
});

router.post("/startGame", (req, res) => {
  const gameInfo = openLobbies[req.body.lobbyCode];
  if (!gameInfo) {
    return res.status(404).send({ error: "Lobby not found" });
  }
  console.log(req.body.lobbyCode);
  console.log(openLobbies);
  if (gameInfo.lobbyOwner != req.user._id) {
    return res.status(401).send({ error: "Not authorized" });
  }
  socketManager.initiateGame({
    gameInfo: gameInfo,
    lobbyCode: req.body.lobbyCode,
  });
});
router.post("/deleteLobby", (req, res) => {
  const lobbyCode = req.body.lobbyCode;
  if (openLobbies[lobbyCode].lobbyOwner != req.user._id) {
    return res.status(401).send({ error: "Not authorized" });
  }
  delete openLobbies[lobbyCode];
  res.send({ message: "Lobby Deleted" });
});

// @params: lobbyCode- lobby code of the game
// returns an array of the player ids
router.get("/players", (req, res) => {
  const lobbyCode = req.query.lobbyCode;
  console.log(openLobbies[lobbyCode].players);
  res.send(Object.values(Object.keys(openLobbies[lobbyCode].players)));
});

// @params: lobbyCode- lobby code of the game
// returns true if the lobby exists, false otherwise
router.get("/lobbyCheck", (req, res) => {
  const lobbyCode = req.query.lobbyCode;
  if (openLobbies[lobbyCode]) {
    res.send(true);
  } else {
    res.status(404);
    res.send(false);
  }
});
router.get("/gameSettings", (req, res) => {
  const lobbyCode = req.query.lobbyCode;
  const lobby = openLobbies[lobbyCode];
  const gameSettings = {
    minWordLength: lobby.minWordLength,
    pointsModifier: lobby.pointsModifier,
    mode: lobby.mode,
    steps: lobby.steps,
    defaultLetters: lobby.defaultLetters,
    powerups: lobby.powerups,
  };
  console.log(gameSettings);
  res.send(gameSettings);
});

router.get("/usernames", (req, res) => {
  const lobbyCode = req.query.lobbyCode;
  res.send(Object.values(openLobbies[lobbyCode].players));
});

router.get("/playerStats", (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: "Not logged in" });
  }

  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      res.send({
        name: user.name,
        gamesPlayed: user.games_played,
        wins: user.wins,
        letters: user.letters,
        powerups: user.powerups,
        words: user.words,
        points: user.points,
        score: user.score,
        rank: user.rank,
      });
    })
    .catch((err) => {
      console.log(`Failed to get user stats: ${err}`);
      res.status(500).send({ error: "Failed to get user stats" });
    });
});

router.get("/completedGames", (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: "Not logged in" });
  }

  const CompletedGame = require("./models/completed-game");
  // Find games where the player's ID exists in the players object
  CompletedGame.find({ [`players.${req.user._id}`]: { $exists: true } })
    .sort({ _id: -1 }) // Sort by newest first (assuming ObjectId contains timestamp)
    .then((games) => {
      res.send(games);
    })
    .catch((err) => {
      console.log(`Failed to get completed games: ${err}`);
      res.status(500).send({ error: "Failed to get completed games" });
    });
});

// anything else falls to this "not found" case

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

// Export the router directly for Express to use
module.exports = router;
