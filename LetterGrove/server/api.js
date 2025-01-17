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
// import authentication library
const auth = require("./auth");


// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();


//initialize socket
const socketManager = require("./server-socket");


const openLobbies = {};


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
  let sharedCodes =await LobbyCode.find({ lobbyCode: lobbyCodeGenerated });


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
  newLobbyCode.save().then((code) =>{
    console.log("Lobby with ID " + code.lobbyCode + " created")
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
    sessionID: req.sessionID
  });

  // Check if user is authenticated
  if (!req.user) {
    console.log("User not authenticated");
    return res.status(401).send({ error: "Not authenticated" });
  }

  console.log("Auth state:", {
    hasUser: !!req.user,
    userId: req.user._id,
    username: req.body.username
  });

  // map lobbyCode to lobby information
  openLobbies[lobbyCode] = {
    minWordLength: gameSettings.minWordLength,
    pointsModifier: gameSettings.pointsModifier,
    mode: gameSettings.mode,
    steps: gameSettings.steps,
    defaultLetters: gameSettings.defaultLetters,
    powerUps: gameSettings.powerUps,
    players: [{
      userId: req.user._id,
      username: username
    }]
  };

  console.log("Lobby with ID " + lobbyCode + " opened");
  console.log("Current lobbies:", openLobbies);
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
    sessionID: req.sessionID
  });

  // Check if user is authenticated
  if (!req.user) {
    console.log("User not authenticated");
    return res.status(401).send({ error: "Not authenticated" });
  }

  console.log("Auth state:", {
    hasUser: !!req.user,
    userId: req.user._id,
    username: req.body.username
  });

  if (openLobbies[lobbyCode]) {
    const player = {
      userId: req.user._id,
      username: username
    };
    openLobbies[lobbyCode].players.push(player);
    console.log("Lobby with ID " + lobbyCode + " joined");
    console.log("Current lobbies:", openLobbies);
    res.send({ message: "Lobby Joined" });
  } else {
    console.log("Lobby with ID " + lobbyCode + " not found");
    res.status(404).send({ error: "Lobby not found" });
  }
});

router.post("/startGame", (req, res) => {
  const gameInfo = openLobbies[req.body.lobbyCode];
  // remove lobbycode from open lobbies
  delete openLobbies[req.body.lobbyCode];
  socketManager.startRunningGame({
    gameInfo: gameInfo, 
    lobbyCode: req.body.lobbyCode
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});


module.exports = router;