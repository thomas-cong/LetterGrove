const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  games_played: Number,
  wins: Number,
  letters: Number,
  powerups: Number,
  words: Number,
  points: Number,
  score: Number,
  rank: Number,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
