const mongoose = require("mongoose");

const CompletedGameSchema = new mongoose.Schema({
  boards: Object,
  endpoints: Object,
  players: Object,
  finalRankings: Array,
  mode: String,
  words: Object,
  sameBoard: Boolean,
  difficulty: String,
  secondsElapsed: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("completedGame", CompletedGameSchema);