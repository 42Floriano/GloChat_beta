const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  text: String,
  language: String,
  lastActiveAt: Date,
  username: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
