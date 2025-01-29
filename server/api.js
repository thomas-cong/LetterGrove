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
const gameLogic = require("./game-logic");
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

router.get("/userInMatch", (req, res) => {
  if (!req.user) {
    return res.send({ isInMatch: false });
  }
  for (const lobbyCode of Object.keys(gameLogic.games)) {
    if (gameLogic.games[lobbyCode].players[req.user._id]) {
      return res.send({ isInMatch: true, lobbyCode: lobbyCode });
    }
  }
  res.send({ isInMatch: false, lobbyCode: null });
});

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
  if (req.query.isTutorial) {
    newLobbyCode.lobbyCode = "tutorial" + lobbyCodeGenerated;
  }
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
  // console.log("Session debug:", {
  //   hasSession: !!req.session,
  //   sessionUser: req.session?.user,
  //   reqUser: req.user,
  //   sessionID: req.sessionID,
  // });

  // Check if user is authenticated
  if (!req.user) {
    console.log("User not authenticated");
    return res.status(401).send({ error: "Not authenticated" });
  }

  // console.log("Auth state:", {
  //   hasUser: !!req.user,
  //   userId: req.user._id,
  //   username: req.body.username,
  // });
  // console.log("Username:", username);

  // map lobbyCode to lobby information
  openLobbies[lobbyCode] = {
    minWordLength: gameSettings.minWordLength,
    pointsModifier: gameSettings.pointsModifier,
    mode: gameSettings.mode,
    steps: gameSettings.steps,
    powerups: gameSettings.powerups,
    sameBoard: gameSettings.sameBoard,
    difficulty: gameSettings.difficulty,
    gameStarted: false,
    players: {
      [req.user._id]: username,
    },
    lobbyOwner: req.user._id,
  };

  console.log("Lobby with ID " + lobbyCode + " opened");
  console.log("Current lobbies:", openLobbies);
  // socketManager.joinSocket({ lobbyCode: lobbyCode, socket: socket, userId: req.user._id });
  res.send({ message: "Lobby Created" });
});

router.get("/isGameStarted", (req, res) => {
  if (!openLobbies[req.query.lobbyCode]) {
    res.status(404).send({ error: "Lobby not found" });
    return;
  }
  res.send({ gameStarted: openLobbies[req.query.lobbyCode].gameStarted });
});

router.post("/joinLobby", (req, res) => {
  const lobbyCode = req.body.lobbyCode;
  const username = req.body.username;

  // Debug session state
  // console.log("Session debug:", {
  //   hasSession: !!req.session,
  //   sessionUser: req.session?.user,
  //   reqUser: req.user,
  //   sessionID: req.sessionID,
  // });

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
    console.log("Lobby Joined");
    // socketManager.joinSocket({ lobbyCode: lobbyCode });
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
  // console.log(req.body.lobbyCode);
  // console.log(openLobbies);
  if (gameInfo.lobbyOwner != req.user._id) {
    return res.status(401).send({ error: "Not authorized" });
  }
  if (!gameInfo) {
    return res.status(404).send({ error: "Lobby not found" });
  }
  socketManager.lobbyToGameTransition({
    lobbyCode: req.body.lobbyCode,
  });
  res.send({ message: "Lobby Transitioned" });
});

router.post("/startGame", (req, res) => {
  const gameInfo = openLobbies[req.body.lobbyCode];
  if (!gameInfo) {
    return res.status(404).send({ error: "Lobby not found" });
  }
  // console.log(req.body.lobbyCode);
  // console.log(openLobbies);
  if (gameInfo.lobbyOwner != req.user._id) {
    return res.status(401).send({ error: "Not authorized" });
  }
  openLobbies[req.body.lobbyCode].gameStarted = true;
  socketManager.initiateGame({
    gameInfo: gameInfo,
    lobbyCode: req.body.lobbyCode,
  });
  res.send({ message: "Game Started" });
});

router.post("/startTutorial", (req, res) => {
  const gameInfo = openLobbies[req.body.lobbyCode];
  if (!gameInfo) {
    return res.status(404).send({ error: "Lobby not found" });
  }
  // console.log(gameInfo);
  socketManager.initiateGame({
    gameInfo: gameInfo,
    lobbyCode: req.body.lobbyCode,
    isTutorial: true,
  });
  res.send({ message: "Game Started" });
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
  if (!openLobbies[lobbyCode]) {
    res.status(404);
    res.send({ error: "Lobby not found" });
  }
  // console.log(openLobbies[lobbyCode].players);
  res.send(Object.values(Object.keys(openLobbies[lobbyCode].players)));
});

router.get("/currentGame", (req, res) => {
  // console.log("currentGame notification");
  // console.log("CurrentGame Request Body", req.query);
  socketManager.sendUserInitialGame(req.user._id, req.query.lobbyCode);
  res.send({});
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
  if (!lobby) {
    res.status(404);
    res.send({ error: "Lobby not found" });
    return;
  }
  const gameSettings = {
    minWordLength: lobby.minWordLength,
    pointsModifier: lobby.pointsModifier,
    mode: lobby.mode,
    steps: lobby.steps,
    powerups: lobby.powerups,
    sameBoard: lobby.sameBoard,
    difficulty: lobby.difficulty,
  };
  // console.log(gameSettings);
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
  const CompletedGame = require("./models/completed-game");
  console.log("Getting completed games for user:", req.query.userId);

  // Find games where the player's ID exists in the players object
  CompletedGame.find({ [`players.${req.query.userId}`]: { $exists: true } })
    .sort({ date: -1 }) // Sort by date, newest first
    .then((completedGames) => {
      console.log("Found completed games:", completedGames.length);
      if (completedGames.length > 0) {
        console.log("First game boards:", completedGames[0].boards);
        console.log("First game endpoints:", completedGames[0].endpoints);
      }

      let matches = [];
      for (const game of completedGames) {
        // Find player's rank and score
        const playerRank = game.finalRankings.find((r) => r.playerId === req.query.userId);
        const topScore = Math.max(...game.finalRankings.map((r) => r.score));

        const match = {
          date: game.date,
          score: playerRank.score,
          duration: game.secondsElapsed,
          difficulty: game.difficulty,
          words: game.words?.[req.query.userId] ?? [],
          won: playerRank.score === topScore,
          mode: game.mode,
          boards: game.boards ?? {}, // Send the entire boards object
          endpoints: game.endpoints ?? {}, // Send the entire endpoints object
          finalRankings: game.finalRankings,
        };
        console.log("Processing match:", {
          date: match.date,
          hasBoards: !!game.boards,
          boardKeys: game.boards ? Object.keys(game.boards) : [],
          hasEndpoints: !!game.endpoints,
          endpointKeys: game.endpoints ? Object.keys(game.endpoints) : [],
          finalRankings: match.finalRankings,
        });
        matches.push(match);
      }
      res.send(matches);
    })
    .catch((err) => {
      console.log(`Failed to get completed games: ${err}`);
      res.status(500).send({ error: "Failed to get completed games" });
    });
});

/**
 * Get user data
 */
router.get("/userProfilePicture", (req, res) => {
  User.findById(req.query.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ error: "User not found" });
        return;
      }
      res.send(user.pfp || {
        Accessory: 0,
        Hair: 0,
        Eyes: 0,
        Face: 0,
        Shirt: 0,
      });
    })
    .catch((err) => {
      console.log(`Error getting user data: ${err}`);
      res.status(500).send({ error: "Error getting user data" });
    });
})

router.get("/user", (req, res) => {
  User.findById(req.query.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ error: "User not found" });
        return;
      }
      res.send({
        name: user.name,
        games_played: user.games_played || 0,
        wins: user.wins || 0,
        letters: user.letters || 0,
        powerups: user.powerups || 0,
        words: user.words || 0,
        points: user.points || 0,
        timePlayed: user.timePlayed || 0,
      });
    })
    .catch((err) => {
      console.log(`Error getting user data: ${err}`);
      res.status(500).send({ error: "Error getting user data" });
    });
});

/**
 * Get user match history
 */
router.get("/matches", (req, res) => {
  // For now, return mock data. You'll need to implement the actual match history storage
  const mockMatches = [
    {
      date: new Date(),
      won: true,
      score: 150,
      words: 12,
      duration: 180, // 3 minutes
    },
    {
      date: new Date(Date.now() - 86400000), // yesterday
      won: false,
      score: 120,
      words: 8,
      duration: 240,
    },
  ];
  res.send(mockMatches);
});

router.get("/pfp", (req, res) => {
  const userId = req.query.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      res.send(user.pfp);
    })
    .catch((err) => {
      console.log(`Failed to get user profile picture: ${err}`);
      res.status(500).send({ error: "Failed to get user profile picture" });
    });
});

router.post("/setPfp", (req, res) => {
  const userId = req.body.userId;
  const pfp = req.body.pfp;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      user.pfp = pfp;
      return user.save();
    })
    .then((user) => {
      res.send(user.pfp);
    })
    .catch((err) => {
      console.log(`Failed to set user profile picture: ${err}`);
      res.status(500).send({ error: "Failed to set user profile picture" });
    });
})
// anything else falls to this "not found" case

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

// Export the router directly for Express to use
module.exports = router;
