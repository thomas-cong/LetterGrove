const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  pfp: {
    Accessory: { type: Number, default: 0 },
    Hair: { type: Number, default: 0 },
    Eyes: { type: Number, default: 0 },
    Face: { type: Number, default: 0 },
    Shirt: { type: Number, default: 0 },
  },
  games_played: {
    type: Number,
    default: 0
  },
  wins: {
    type: Number,
    default: 0
  },
  letters: {
    type: Number,
    default: 0
  },
  powerups: {
    type: Number,
    default: 0
  },
  words: {
    type: Number,
    default: 0
  },
  points: {
    type: Number,
    default: 0
  },
  timePlayed: {
    type: Number,
    default: 0
  }
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
