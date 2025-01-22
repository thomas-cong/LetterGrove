const mongoose = require("mongoose");


const LobbyCodeSchema = new mongoose.Schema({
 lobbyCode: String,
});
module.exports = mongoose.model("lobbyCode", LobbyCodeSchema);