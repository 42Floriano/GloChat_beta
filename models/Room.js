const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: String,
  users: [],
  messages: []
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
