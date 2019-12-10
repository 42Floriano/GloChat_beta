const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    text: String,
    translations: [
      {
        text: String,
        user: {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
      }
    ],
    username: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: {
      createdAt: "created_at"
    }
  }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
