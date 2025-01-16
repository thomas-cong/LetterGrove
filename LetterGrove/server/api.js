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
const Lobby = require("./models/lobby");
// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

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
router.get("/generateLobbyCode", (req, res) => {
  //Generate an initial code and find similar
  let lobbyCodeGenerated = Array.from({ length: 5 }, () =>
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(
      Math.floor(Math.random() * 62)
    )
  ).join("");
  let sharedCodes = Lobby.find({ lobbyCode: lobbyCodeGenerated });

  // Check if there are any shared Codes
  while (sharedCodes.length >= 1) {
    let lobbyCodeGenerated = Array.from({ length: 5 }, () =>
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(
        Math.floor(Math.random() * 62)
      )
    ).join("");
    let sharedCodes = Lobby.find({ lobbyCode: lobbyCodeGenerated });
  }
  res.send({ lobbyCodeGenerated });
});
router.post("/openLobby", (req, res) => {
  const gameSettings = req.body.gameSettings;
  const newLobby = new Lobby({
    lobbyCode: req.body.lobbyCode,
    minWordLength: gameSettings.minWordLength,
    pointsModifier: gameSettings.pointsModifier,
    mode: gameSettings.mode,
    steps: gameSettings.steps,
    defaultLetters: gameSettings.defaultLetters,
    powerUps: gameSettings.powerUps,
  });

  let sharedCodes = Lobby.find({ lobbyCode: req.body.lobbyCode }).then((shared) => {
    if (shared.length >= 1) {
      res.send({ message: "Lobby already exists" });
    } else {
      newLobby.save().then((lobby) => {
        res.send({ message: "Lobby Created" });
      });
    }
  });
});
// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
