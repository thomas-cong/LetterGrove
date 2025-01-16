const mongoose = require("mongoose");

const LobbySchema = new mongoose.Schema({
  lobbyCode: String,
  minWordLength: Number, // int
  pointsModifier: Number, // int
  mode: String, // string
  steps: Number, // int
  defaultLetters: Boolean, // checkbox
  powerUps: Array, // array
});
module.exports = mongoose.model("lobby", LobbySchema);
