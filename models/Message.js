const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    text: String,
    language: String,
    lastActiveAt: Date,
    username: String
  },
  {
    timestamps: {
      createdAt: "created_at"
    }
  }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
