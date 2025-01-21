const mongoose = require("mongoose");

const CompletedGameSchema = new mongoose.Schema({
  boards: Object,
  players: Object,
  finalRankings: Array,
});

module.exports = mongoose.model("completedGame", CompletedGameSchema);